# Cartella Immagini | Images Folder

Questa cartella contiene le immagini generate localmente per le storie quando la modalità di salvataggio locale è attivata.

## Configurazione | Configuration

Per salvare le immagini localmente invece di usare URL esterni:

```bash
export SAVE_IMAGES_LOCALLY=true
node scripts/generate-story-images.js
```

## Struttura | Structure

```
images/
└── stories/
    ├── nome-storia-beginning.jpg
    ├── nome-storia-middle.jpg
    ├── nome-storia-end.jpg
    └── ...
```

## Note

- Le immagini vengono scaricate dall'endpoint esterno e salvate localmente
- Se il download fallisce, il sistema usa automaticamente l'URL remoto come fallback
- Questa cartella dovrebbe essere aggiunta al .gitignore se le immagini sono grandi
- Le immagini sono generate con dimensioni 1000x600 (16:9) con parametro &regen per forzare rigenerazione