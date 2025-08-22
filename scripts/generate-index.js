#!/usr/bin/env node
/**
 * Script per verificare e aggiornare i link delle storie nell'indice
 * Più conservativo della versione precedente - mantiene la struttura esistente
 */

const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(__dirname, '..', 'stories');
const INDEX_FILE = path.join(__dirname, '..', 'INDICE.md');

/**
 * Trova tutti i file delle storie
 */
function findStoryFiles() {
    const stories = [];
    
    function scanDirectory(dir) {
        const entries = fs.readdirSync(dir);
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (entry.endsWith('.md')) {
                const relativePath = path.relative(path.dirname(INDEX_FILE), fullPath).replace(/\\/g, '/');
                stories.push({
                    fullPath,
                    relativePath,
                    fileName: entry,
                    title: path.basename(entry, '.md')
                });
            }
        }
    }
    
    scanDirectory(STORIES_DIR);
    return stories;
}

/**
 * Verifica i link nell'indice esistente
 */
function verifyLinks() {
    console.log('🔍 Verifica dei link nell\'indice...');
    
    const stories = findStoryFiles();
    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
    
    console.log(`📚 Trovate ${stories.length} storie:`);
    stories.forEach(story => {
        const isLinked = indexContent.includes(story.relativePath);
        const hasClickableLink = indexContent.includes(`[${story.title}](${story.relativePath})`);
        
        console.log(`  - ${story.fileName}: ${isLinked ? '✅' : '❌'} presente, ${hasClickableLink ? '✅' : '❌'} cliccabile`);
    });
    
    // Verifica anche i link generali
    const otherFiles = [
        'characters/database-personaggi.md',
        'worlds/descrizioni-mondi.md', 
        'templates/template-storia.md'
    ];
    
    console.log('\n📁 Altri file di supporto:');
    otherFiles.forEach(file => {
        const hasClickableLink = indexContent.includes(`[${file}](${file})`);
        console.log(`  - ${file}: ${hasClickableLink ? '✅' : '❌'} cliccabile`);
    });
}

/**
 * Genera statistiche sulle storie
 */
function generateStats() {
    const stories = findStoryFiles();
    console.log('\n📊 Statistiche:');
    console.log(`  - Storie totali: ${stories.length}`);
    console.log(`  - Generi directory: ${new Set(stories.map(s => path.dirname(s.relativePath).split('/')[1])).size}`);
    
    // Raggruppa per directory
    const byGenre = {};
    stories.forEach(story => {
        const genre = path.dirname(story.relativePath).split('/')[1];
        if (!byGenre[genre]) byGenre[genre] = [];
        byGenre[genre].push(story.fileName);
    });
    
    Object.keys(byGenre).forEach(genre => {
        console.log(`    - ${genre}: ${byGenre[genre].length} storie`);
    });
}

/**
 * Suggerisce aggiornamenti per l'indice manuale
 */
function suggestUpdates() {
    console.log('\n💡 Per aggiornare manualmente l\'indice:');
    console.log('1. Assicurati che tutti i link siano in formato: [Titolo](path/to/file.md)');
    console.log('2. Verifica che tutte le storie siano elencate nella sezione principale');
    console.log('3. Aggiorna la sezione Timeline con i link corretti');
    console.log('4. Controlla che le statistiche riflettano il numero corretto di storie');
}

// Esegue solo se chiamato direttamente
if (require.main === module) {
    verifyLinks();
    generateStats();
    suggestUpdates();
}

module.exports = {
    findStoryFiles,
    verifyLinks,
    generateStats
};