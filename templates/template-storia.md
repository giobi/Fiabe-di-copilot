# Template per Nuova Storia | Story Template

## Informazioni Base | Basic Information

**Titolo**: [Nome della Storia]
**Genere**: [Fantasy/Sci-Fi/Mystery/Romance/Avventura/Cross-Genre]
**Ambientazione**: [Dove si svolge - vedi /worlds/ per mondi esistenti]
**Epoca**: [Quando si svolge - riferimento alla timeline condivisa]

## Personaggi | Characters

### Personaggi Principali | Main Characters
- **[Nome]**: [Descrizione breve, professione, caratteristiche]
- **[Nome]**: [Descrizione breve, professione, caratteristiche]

### Personaggi Esistenti | Existing Characters
- **[Nome]**: [Se riutilizzi personaggi dal database, indica il loro ruolo in questa storia]

### Nuovi Personaggi | New Characters
- **[Nome]**: [Personaggi che introduci per la prima volta]

## Trama | Plot

### Riassunto Base | Basic Summary
[2-3 righe che descrivono la trama principale]

### Elementi Centrali | Core Elements
- **Conflitto Principale**: [Cosa guida la storia]
- **Mistero/Problema**: [Cosa deve essere risolto]
- **Crescita Personaggi**: [Come si sviluppano i personaggi]

## Connessioni | Connections

### Riferimenti ad Altre Storie | References to Other Stories
- **[Titolo Storia]**: [Come si collega]
- **Personaggi Condivisi**: [Chi appare anche in altre storie]
- **Oggetti/Luoghi**: [Elementi ricorrenti come il Cristallo di Vremya]

### Elementi per Future Storie | Elements for Future Stories
- **Hook Narrativi**: [Cosa lasci aperto per sviluppi futuri]
- **Nuovi Misteri**: [Domande che potrebbero essere esplorate]
- **Personaggi da Sviluppare**: [Chi potrebbe riapparire]

## Stile e Tono | Style and Tone

**Mood/Tono**: [Drammatico/Leggero/Misterioso/Romantico/Avventuroso/etc.]
**Lunghezza Target**: [Breve (2000-3000 parole)/Media (3000-5000)/Lunga (5000+ parole)]
**Punto di Vista**: [Prima/Terza persona, narratore]

## Struttura della Storia | Story Structure

### Apertura | Opening
[Come inizia la storia, che atmosfera stabilisce]

### Sviluppo | Development
[Come si svolgono gli eventi principali]

### Climax | Climax
[Il momento di maggiore tensione]

### Risoluzione | Resolution
[Come si conclude, che messaggi lascia]

## Generazione Immagini | Image Generation

### Linee Guida per le Immagini | Image Guidelines

Ogni storia deve includere **tre immagini** generate automaticamente:

1. **Immagine Iniziale**: Rappresenta la scena di apertura e l'atmosfera generale
2. **Immagine Centrale**: Cattura il momento cruciale o il conflitto principale  
3. **Immagine Finale**: Mostra la risoluzione o l'epilogo della storia

### Endpoint di Generazione | Generation Endpoint

Utilizzare sempre questo endpoint per generare le immagini:
```
https://giobiflare-llm24.giobi.workers.dev/image?prompt=${encodeURIComponent(prompt)}
```

### Struttura dei Prompt | Prompt Structure

Ogni prompt deve seguire questa struttura:
```
[Stile base], [genere] style, [ambientazione], cinematic lighting, detailed digital art. [Descrizione scena specifica]
```

**Esempio**:
```
Fantasy illustration, mystery style, Neo-Tokyo 2157, cinematic lighting, detailed digital art. Opening scene: Detective Luna investigating in a futuristic space colony...
```

### Criteri per i Prompt | Prompt Criteria

- **Lunghezza**: Massimo 300 caratteri per prompt
- **Stile**: Coerente con genere e ambientazione della storia
- **Contenuto**: Basato sul contenuto effettivo di quella parte della storia
- **Atmosfera**: Rispettare il tono narrativo (drammatico, misterioso, magico, etc.)

## Formato Output Richiesto | Required Output Format

```markdown
# [Titolo Storia]

**Genere**: [...]
**Ambientazione**: [...]
**Connessioni**: [...]

## Storia

<!-- IMMAGINE INIZIALE -->
![Immagine iniziale - Titolo Storia](https://giobiflare-llm24.giobi.workers.dev/image?prompt=PROMPT_INIZIALE "Immagine iniziale - Titolo Storia")

[Primo terzo della storia...]

<!-- IMMAGINE CENTRALE -->
![Immagine centrale - Titolo Storia](https://giobiflare-llm24.giobi.workers.dev/image?prompt=PROMPT_CENTRALE "Immagine centrale - Titolo Storia")

[Secondo terzo della storia...]

<!-- IMMAGINE FINALE -->
![Immagine finale - Titolo Storia](https://giobiflare-llm24.giobi.workers.dev/image?prompt=PROMPT_FINALE "Immagine finale - Titolo Storia")

[Ultimo terzo della storia...]

## Note dell'Autore AI

- **Personaggi Introdotti**: [Lista dei nuovi personaggi]
- **Elementi per Future Storie**: [Hooks e sviluppi futuri]
- **Connessioni Create**: [Come si lega ad altre storie dell'universo]
- **Immagini Generate**: [Descrizione delle tre immagini e dei prompt utilizzati]
```

## Checklist Pre-Scrittura | Pre-Writing Checklist

### Ricerca | Research
- [ ] Ho letto le storie esistenti per contesto
- [ ] Ho verificato il database personaggi per coerenza
- [ ] Ho consultato le descrizioni dei mondi
- [ ] Ho identificato opportunità di cross-reference

### Pianificazione | Planning
- [ ] Ho definito il conflitto principale
- [ ] Ho pianificato l'arco narrativo dei personaggi
- [ ] Ho identificato i collegamenti con altre storie
- [ ] Ho scelto il tono appropriato per il genere

### Sviluppo | Development
- [ ] Ho creato personaggi con profondità
- [ ] Ho rispettato le regole dei mondi esistenti
- [ ] Ho integrato riferimenti naturali ad altre storie
- [ ] Ho lasciato hook per sviluppi futuri
- [ ] Ho generato tre immagini appropriate per la storia
- [ ] I prompt delle immagini sono coerenti con il contenuto narrativo

### Revisione | Review
- [ ] La storia è coerente con l'universo esistente
- [ ] I personaggi mantengono le loro caratteristiche stabilite
- [ ] Le connessioni sono naturali e non forzate
- [ ] Il tono è appropriato e coinvolgente

## Note per l'AI | Notes for AI

### Priorità Creative | Creative Priorities
1. **Coerenza Narrativa**: Mantenere consistenza con le storie esistenti
2. **Sviluppo Organico**: Lasciare che i personaggi guidino la trama
3. **Interconnessioni Sottili**: Creare collegamenti naturali, non artificiali
4. **Qualità Letteraria**: Puntare a uno stile narrativo coinvolgente
5. **Preparazione Futura**: Ogni storia deve arricchire l'universo condiviso

### Elementi da Evitare | Elements to Avoid
- Contraddizioni con materiale esistente
- Spiegazioni troppo esplicite dei collegamenti
- Personaggi che agiscono fuori carattere
- Risoluzioni troppo semplici o definitive
- Ignorare gli elementi magici/fantastici stabiliti