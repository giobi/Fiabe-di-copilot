# Scripts di Utilità | Utility Scripts

Questa cartella contiene script di utilità per la gestione delle storie e delle immagini.

## 🎨 generate-story-images.js

Script Node.js per generare automaticamente immagini per le storie esistenti.

### Funzionalità

- Analizza tutti i file delle storie nelle cartelle `stories/`
- Estrae il contenuto narrativo e i metadata da ogni storia
- Genera tre prompt per immagini basati sul contenuto:
  - **Immagine Iniziale**: Primo terzo della storia
  - **Immagine Centrale**: Secondo terzo della storia  
  - **Immagine Finale**: Ultimo terzo della storia
- Inserisce automaticamente le immagini nei punti appropriati
- Utilizza l'endpoint: `https://giobiflare-llm24.giobi.workers.dev/image?prompt=`

### Utilizzo

```bash
# Dalla root del progetto
node scripts/generate-story-images.js
```

### Formato dei Prompt

I prompt seguono questa struttura:
```
Fantasy illustration, [genere] style, [ambientazione], cinematic lighting, detailed digital art. [Descrizione scena]: [contenuto specifico]...
```

### Sicurezza

- Lo script controlla se le immagini sono già presenti (cerca `<!-- IMMAGINE INIZIALE -->`)
- Non sovrascrive immagini esistenti
- Preserva tutto il contenuto originale della storia

### Output

Il script aggiunge tre sezioni immagine in ogni storia:

```markdown
<!-- IMMAGINE INIZIALE -->
![Alt text](image_url "Title")

<!-- IMMAGINE CENTRALE -->  
![Alt text](image_url "Title")

<!-- IMMAGINE FINALE -->
![Alt text](image_url "Title")
```

### Log

Lo script mostra:
- Elenco dei file trovati
- Progresso per ogni file processato
- Conferma di completamento per ogni storia
- Notifica se le immagini sono già presenti

## Sviluppi Futuri

- Script per aggiornare prompt di immagini esistenti
- Validazione qualità dei prompt generati
- Integrazione con workflow automatico per nuove storie
- Script per ottimizzare dimensioni e caricamento immagini