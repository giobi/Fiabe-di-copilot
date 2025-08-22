#!/usr/bin/env node
/**
 * Script per generare immagini per le storie esistenti
 * Genera tre immagini per storia: inizio, metà, fine
 */

const fs = require('fs');
const path = require('path');

// Endpoint per la generazione delle immagini
const IMAGE_ENDPOINT = 'https://giobiflare-llm24.giobi.workers.dev/image?prompt=';

/**
 * Estrae il contenuto della storia dal file markdown
 */
function extractStoryContent(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Trova la sezione Storia
    const storyMatch = content.match(/## Storia\s*\n([\s\S]*?)(?=\n## |$)/);
    if (!storyMatch) {
        console.error(`Nessuna sezione "Storia" trovata in ${filePath}`);
        return null;
    }
    
    // Rimuove i tag HTML e i link markdown per ottenere testo pulito
    let storyText = storyMatch[1]
        .replace(/<[^>]*>/g, '') // Rimuove tag HTML
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Converte link markdown in testo
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Rimuove grassetto
        .replace(/\n+/g, ' ') // Sostituisce newline con spazi
        .trim();
    
    return storyText;
}

/**
 * Estrae metadata dalla storia
 */
function extractMetadata(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const titleMatch = content.match(/^# (.+)$/m);
    const genreMatch = content.match(/\*\*Genere\*\*:\s*(.+)$/m);
    const ambientazioneMatch = content.match(/\*\*Ambientazione\*\*:\s*(.+)$/m);
    
    return {
        title: titleMatch ? titleMatch[1] : path.basename(filePath, '.md'),
        genre: genreMatch ? genreMatch[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') : '',
        ambientazione: ambientazioneMatch ? ambientazioneMatch[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') : ''
    };
}

/**
 * Divide la storia in tre parti e genera prompt per le immagini
 */
function generateImagePrompts(storyText, metadata) {
    const words = storyText.split(' ');
    const totalWords = words.length;
    
    // Divide in tre parti
    const part1 = words.slice(0, Math.floor(totalWords / 3)).join(' ');
    const part2 = words.slice(Math.floor(totalWords / 3), Math.floor(2 * totalWords / 3)).join(' ');
    const part3 = words.slice(Math.floor(2 * totalWords / 3)).join(' ');
    
    const baseStyle = `Fantasy illustration, ${metadata.genre.toLowerCase()} style, ${metadata.ambientazione}, cinematic lighting, detailed digital art`;
    
    return {
        beginning: {
            prompt: `${baseStyle}. Opening scene: ${part1.substring(0, 200)}...`,
            alt: `Immagine iniziale - ${metadata.title}`
        },
        middle: {
            prompt: `${baseStyle}. Middle scene: ${part2.substring(0, 200)}...`,
            alt: `Immagine centrale - ${metadata.title}`
        },
        end: {
            prompt: `${baseStyle}. Final scene: ${part3.substring(0, 200)}...`,
            alt: `Immagine finale - ${metadata.title}`
        }
    };
}

/**
 * Genera l'HTML per le immagini
 */
function generateImageHTML(prompts, storyFileName) {
    const baseFileName = path.basename(storyFileName, '.md');
    
    return {
        beginning: `![${prompts.beginning.alt}](${IMAGE_ENDPOINT}${encodeURIComponent(prompts.beginning.prompt)} "${prompts.beginning.alt}")`,
        middle: `![${prompts.middle.alt}](${IMAGE_ENDPOINT}${encodeURIComponent(prompts.middle.prompt)} "${prompts.middle.alt}")`,
        end: `![${prompts.end.alt}](${IMAGE_ENDPOINT}${encodeURIComponent(prompts.end.prompt)} "${prompts.end.alt}")`
    };
}

/**
 * Aggiorna il file della storia con le immagini
 */
function updateStoryWithImages(filePath) {
    console.log(`Processando: ${filePath}`);
    
    const storyContent = extractStoryContent(filePath);
    if (!storyContent) return;
    
    const metadata = extractMetadata(filePath);
    const prompts = generateImagePrompts(storyContent, metadata);
    const images = generateImageHTML(prompts, filePath);
    
    // Legge il contenuto del file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verifica se le immagini sono già presenti
    if (content.includes('<!-- IMMAGINE INIZIALE -->')) {
        console.log(`Le immagini sono già presenti in ${filePath}`);
        return;
    }
    
    // Trova la posizione dove inserire le immagini
    const storyStartMatch = content.match(/(## Storia\s*\n)/);
    if (storyStartMatch) {
        const insertPos = storyStartMatch.index + storyStartMatch[1].length;
        
        const imageSection = `
<!-- IMMAGINE INIZIALE -->
${images.beginning}

`;
        
        content = content.slice(0, insertPos) + imageSection + content.slice(insertPos);
    }
    
    // Trova la metà della storia per inserire l'immagine centrale
    const storyMatch = content.match(/(## Storia\s*\n<!-- IMMAGINE INIZIALE -->[\s\S]*?\n\n)([\s\S]*?)(\n## Note dell'Autore AI|$)/);
    if (storyMatch) {
        const storyText = storyMatch[2];
        const storyParagraphs = storyText.split('\n\n').filter(p => p.trim());
        const middleIndex = Math.floor(storyParagraphs.length / 2);
        
        if (middleIndex > 0) {
            const beforeMiddle = storyParagraphs.slice(0, middleIndex).join('\n\n');
            const afterMiddle = storyParagraphs.slice(middleIndex).join('\n\n');
            
            const middleImageSection = `

<!-- IMMAGINE CENTRALE -->
${images.middle}

`;
            
            const newStorySection = storyMatch[1] + beforeMiddle + middleImageSection + afterMiddle;
            content = content.replace(storyMatch[0], newStorySection + storyMatch[3]);
        }
    }
    
    // Inserisce l'immagine finale prima delle note dell'autore
    const notesMatch = content.match(/(\n## Note dell'Autore AI)/);
    if (notesMatch) {
        const endImageSection = `

<!-- IMMAGINE FINALE -->
${images.end}
`;
        
        content = content.replace(notesMatch[1], endImageSection + notesMatch[1]);
    }
    
    // Scrive il file aggiornato
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Immagini aggiunte a ${filePath}`);
}

/**
 * Funzione principale
 */
function main() {
    const storiesDir = path.join(__dirname, '../stories');
    const storyFiles = [];
    
    // Raccoglie tutti i file .md nelle sottocartelle
    function collectStoryFiles(dir) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                collectStoryFiles(fullPath);
            } else if (item.endsWith('.md')) {
                storyFiles.push(fullPath);
            }
        }
    }
    
    collectStoryFiles(storiesDir);
    
    console.log(`Trovati ${storyFiles.length} file di storie da processare:`);
    storyFiles.forEach(file => console.log(` - ${path.relative(storiesDir, file)}`));
    
    // Processa ogni file
    storyFiles.forEach(updateStoryWithImages);
    
    console.log('\n🎨 Generazione immagini completata!');
}

// Esegue solo se chiamato direttamente
if (require.main === module) {
    main();
}

module.exports = {
    extractStoryContent,
    extractMetadata,
    generateImagePrompts,
    generateImageHTML,
    updateStoryWithImages
};