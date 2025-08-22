#!/usr/bin/env node
/**
 * Script per generare immagini per le storie esistenti
 * Genera tre immagini per storia: inizio, metà, fine
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Endpoint per la generazione delle immagini
const IMAGE_ENDPOINT = 'https://giobiflare-llm24.giobi.workers.dev/image?prompt=';
const IMAGE_PARAMS = '&width=1000&height=600&regen';
const SAVE_IMAGES_LOCALLY = process.env.SAVE_IMAGES_LOCALLY === 'true';
const IMAGES_DIR = path.join(__dirname, '../images/stories');

/**
 * Scarica e salva un'immagine localmente
 */
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https:') ? https : http;
        
        protocol.get(url, (response) => {
            if (response.statusCode === 200) {
                const filePath = path.join(IMAGES_DIR, filename);
                const fileStream = fs.createWriteStream(filePath);
                
                response.pipe(fileStream);
                
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(filePath);
                });
                
                fileStream.on('error', (err) => {
                    fs.unlink(filePath, () => {}); // Rimuove file parziale
                    reject(err);
                });
            } else {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

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
    
    // Limita a 50 parole per ogni parte della storia
    const getFirst50Words = (text) => {
        const textWords = text.split(' ');
        return textWords.slice(0, 50).join(' ');
    };
    
    return {
        beginning: {
            prompt: `${baseStyle}. Opening scene: ${getFirst50Words(part1)}`,
            alt: `Immagine iniziale - ${metadata.title}`
        },
        middle: {
            prompt: `${baseStyle}. Middle scene: ${getFirst50Words(part2)}`,
            alt: `Immagine centrale - ${metadata.title}`
        },
        end: {
            prompt: `${baseStyle}. Final scene: ${getFirst50Words(part3)}`,
            alt: `Immagine finale - ${metadata.title}`
        }
    };
}

/**
 * Genera l'HTML per le immagini
 */
async function generateImageHTML(prompts, storyFileName) {
    const baseFileName = path.basename(storyFileName, '.md');
    const results = {};
    
    for (const [position, promptData] of Object.entries(prompts)) {
        const imageUrl = `${IMAGE_ENDPOINT}${encodeURIComponent(promptData.prompt)}${IMAGE_PARAMS}`;
        
        if (SAVE_IMAGES_LOCALLY) {
            try {
                // Crea nome file per immagine locale
                const imageFileName = `${baseFileName}-${position}.jpg`;
                
                // Scarica e salva l'immagine
                console.log(`Scaricando immagine ${position} per ${baseFileName}...`);
                await downloadImage(imageUrl, imageFileName);
                
                // Usa percorso relativo per l'immagine locale
                const localPath = `../images/stories/${imageFileName}`;
                results[position] = `![${promptData.alt}](${localPath} "${promptData.alt}")`;
                
                console.log(`✅ Immagine ${position} salvata localmente: ${imageFileName}`);
            } catch (error) {
                console.warn(`⚠️  Errore scaricamento immagine ${position}: ${error.message}`);
                console.warn(`   Uso URL remoto come fallback`);
                // Fallback all'URL remoto
                results[position] = `![${promptData.alt}](${imageUrl} "${promptData.alt}")`;
            }
        } else {
            // Usa URL remoto
            results[position] = `![${promptData.alt}](${imageUrl} "${promptData.alt}")`;
        }
    }
    
    return results;
}

/**
 * Aggiorna il file della storia con le immagini
 */
async function updateStoryWithImages(filePath, forceRegenerate = false) {
    console.log(`Processando: ${filePath}`);
    
    const storyContent = extractStoryContent(filePath);
    if (!storyContent) return;
    
    const metadata = extractMetadata(filePath);
    const prompts = generateImagePrompts(storyContent, metadata);
    const images = await generateImageHTML(prompts, filePath);
    
    // Legge il contenuto del file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verifica se le immagini sono già presenti
    if (content.includes('<!-- IMMAGINE INIZIALE -->')) {
        if (!forceRegenerate) {
            console.log(`Le immagini sono già presenti in ${filePath}`);
            return;
        } else {
            console.log(`🔄 Rigenerazione forzata per ${filePath}`);
            // Rimuove le immagini esistenti
            content = content.replace(/<!-- IMMAGINE INIZIALE -->\s*\n![^)]*\)\s*\n/g, '');
            content = content.replace(/<!-- IMMAGINE CENTRALE -->\s*\n![^)]*\)\s*\n/g, '');
            content = content.replace(/<!-- IMMAGINE FINALE -->\s*\n![^)]*\)\s*\n/g, '');
        }
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
async function main() {
    const storiesDir = path.join(__dirname, '../stories');
    const storyFiles = [];
    
    // Controlla se è stata richiesta la rigenerazione
    const forceRegenerate = process.argv.includes('--regen');
    
    // Crea la cartella delle immagini se non esiste
    if (SAVE_IMAGES_LOCALLY && !fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
        console.log(`📁 Creata cartella immagini: ${IMAGES_DIR}`);
    }
    
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
    
    if (SAVE_IMAGES_LOCALLY) {
        console.log(`🖼️  Modalità salvataggio locale attivata - le immagini saranno salvate in: ${IMAGES_DIR}`);
    } else {
        console.log(`🌐 Modalità URL remoto - le immagini useranno l'endpoint esterno`);
    }
    
    if (forceRegenerate) {
        console.log(`🔄 Modalità rigenerazione attivata - le immagini esistenti verranno sostituite`);
    }
    
    // Processa ogni file in modo sequenziale per evitare overload
    for (const filePath of storyFiles) {
        await updateStoryWithImages(filePath, forceRegenerate);
    }
    
    console.log('\n🎨 Generazione immagini completata!');
}

// Esegue solo se chiamato direttamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    extractStoryContent,
    extractMetadata,
    generateImagePrompts,
    generateImageHTML,
    updateStoryWithImages
};