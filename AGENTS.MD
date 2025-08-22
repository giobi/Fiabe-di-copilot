# Fiabe di Copilot - AI Agent Guidelines

**Linee guida per assistenti AI che contribuiscono al progetto "Fiabe di Copilot"**
**Guidelines for AI assistants contributing to the "Fiabe di Copilot" project**

---

## 🎯 Obiettivo del Progetto | Project Goal

**IT:** Questo progetto è un proof of concept innovativo per la creazione di una raccolta di racconti interconnessi generati esclusivamente attraverso l'intelligenza artificiale, utilizzando un workflow basato su GitHub Issues e collaborazione AI-umano.

**EN:** This project is an innovative proof of concept for creating a collection of interconnected stories generated exclusively through artificial intelligence, using a GitHub Issues-based workflow and AI-human collaboration.

---

## 📖 Core Narrative Guidelines

### 🌍 Universe Consistency | Coerenza dell'Universo

**SEMPRE leggi prima le storie esistenti** per mantenere coerenza narrativa:
- **Database Personaggi**: `characters/database-personaggi.md`
- **Descrizioni Mondi**: `worlds/descrizioni-mondi.md`
- **Indice Generale**: `INDICE.md`
- **Template Storia**: `templates/template-storia.md`

**Key Universes to Respect:**
- **Terra Mystica** - Fantasy realm with magical elements
- **Università di Blackwood** - Academic mystery setting (early 21st century)
- **Colonia Artemis-7** - Space colony (2157)
- **Neo-Tokyo 2157** - Post-apocalyptic cyberpunk setting
- **Borgo di Silvacristallo** - Magical village setting (2089)

### 🧑‍🤝‍🧑 Character Development Rules

**Famiglia Stellari (Stellari Family) - Core Bloodline:**
- **Marco Stellari** - Ancestor, discoverer of Cristallo di Vremya (early 21st century)
- **Luna Stellari** - Descendant detective, space colony investigator (2157)
- Maintain family traits: scientific curiosity, dimensional sensitivity, moral courage

**Guardiane di Terra Mystica:**
- **Lyralei** - Appears across all timelines as guide
- **Vixen** - Mechanical fox guardian, uses Stellari-derived technology

**Recurring Elements:**
- **Cristallo di Vremya** - Unifying magical/technological element across all stories
- Cross-temporal connections between characters
- Subtle references that don't break immersion

### 🎨 Writing Style Standards

**Narrative Voice:**
- Third person omniscient preferred for most stories
- Rich, descriptive language befitting Italian storytelling tradition
- Balance between accessibility and literary quality
- Age-appropriate content for general audiences

**Tone Guidelines:**
- **Fantasy**: Mystical, wonder-filled, adventurous
- **Sci-Fi**: Thoughtful, technology-aware, speculative
- **Mystery**: Suspenseful, logical, atmospheric
- **Cross-genre**: Blend appropriate elements smoothly

**Length Standards:**
- **Breve (Short)**: 2000-3000 words
- **Media (Medium)**: 3000-5000 words  
- **Lunga (Long)**: 5000+ words

---

## 🗂️ File Organization Rules

### 📁 Directory Structure

```
stories/
├── fantasy/           # Storie fantasy (Terra Mystica, magia)
├── sci-fi/           # Fantascienza (spazio, futuro, tecnologia)
├── mystery/          # Mistero e investigazione
└── cross-genre/      # Storie multi-genere
```

### 📝 File Naming Convention

**Format**: `kebab-case-title.md`
**Examples**: 
- `il-cristallo-di-vremya.md`
- `detective-luna.md`
- `lultima-libreria.md`

### 🏷️ Required Story Header Format

```markdown
# [Titolo Storia]

**Genere**: [Fantasy/Sci-Fi/Mystery/Cross-Genre]
**Ambientazione**: [Nome del mondo/luogo]
**Epoca**: [Periodo temporale]
**Protagonisti**: [Nomi personaggi principali]
**Connessioni**: [Collegamenti ad altre storie]

## Storia

[Contenuto narrativo completo...]

## Note dell'Autore AI

- **Personaggi Introdotti**: [Lista nuovi personaggi]
- **Elementi per Future Storie**: [Hook e sviluppi futuri]
- **Connessioni Create**: [Come si lega ad altre storie]
- **Elementi Magici/Tecnologici**: [Nuovi elementi introdotti]
```

---

## 🔗 Cross-Reference System

### 🎭 Character Cross-References

**ALWAYS update `characters/database-personaggi.md` when introducing new characters**

**Established Connections:**
- Marco → Luna: Direct family line (great-great-grandfather → great-great-granddaughter)
- Marco → Kael: Vixen uses technology derived from Stellari experiments
- Luna → Kai/Elena: Her research preserved in L'Ultima Libreria
- Lyralei: Guide appearing across all timelines
- Cristallo di Vremya: Unifying element present in all stories

### 🌐 Temporal Consistency

**Timeline Order:**
1. **Early 21st Century**: Marco Stellari era (Il Cristallo di Vremya)
2. **2089**: Kael era (Il Ragazzo e la Volpe Meccanica)
3. **2157**: Luna era + Neo-Tokyo (Detective Luna, L'Ultima Libreria)

**Connection Rules:**
- Future characters can reference past events
- Technology/magic can evolve from previous discoveries
- Family artifacts can be passed down through generations
- Dimensional elements can transcend time

---

## 🌏 Bilingual Considerations

### 🇮🇹 Italian Language Standards

**Writing Style:**
- Use contemporary Italian suitable for general audiences
- Avoid overly archaic or overly colloquial expressions
- Regional dialects only when narratively justified
- Consistent use of formal vs informal address based on context

**Technical Terms:**
- Prefer Italian terms when natural equivalents exist
- Use English terms for sci-fi concepts when established (es. "cyberpunk")
- Always provide context clues for specialized vocabulary

### 🇬🇧 English Documentation

**All technical documentation should be bilingual:**
- Database entries: IT/EN parallel format
- Template files: Instructions in both languages
- Cross-references: Maintain consistency in both languages

---

## 🛠️ Technical Guidelines

### 📋 Issue-Based Workflow

**When creating new stories from GitHub Issues:**

1. **Read Issue Requirements**: Understand requested theme, genre, connections
2. **Research Context**: Review related existing stories and characters
3. **Plan Connections**: Identify natural cross-reference opportunities
4. **Draft Outline**: Structure story arc with beginning, middle, end
5. **Write Story**: Follow format requirements and style guidelines
6. **Generate Images**: Create three images using the specified endpoint
7. **Update Databases**: Add new characters and elements to database files
8. **Create Hooks**: Leave subtle setup for future stories

### 🔍 Quality Assurance Checklist

**Before submitting any story:**

- [ ] Does it respect established character personalities?
- [ ] Are cross-references natural, not forced?
- [ ] Is the timeline consistent with existing stories?
- [ ] Have I updated the character database?
- [ ] Does it add value to the shared universe?
- [ ] Is the writing quality appropriate for the collection?
- [ ] Are magical/technological elements consistent with established rules?
- [ ] Are three images included at appropriate points in the story?
- [ ] Do the image prompts accurately reflect the story content?

### 🚫 Avoid These Common Mistakes

**Narrative Errors:**
- Don't contradict established character traits or histories
- Don't over-explain connections (keep them subtle)
- Don't ignore the established magical/technological rules
- Don't create timeline paradoxes

**Technical Errors:**
- Don't use inconsistent file naming
- Don't skip updating the character database
- Don't forget bilingual documentation requirements
- Don't create stories without proper cross-references

---

## 🔮 Advanced Guidelines

### 🎨 Creative Innovation

**Encouraged Creative Elements:**
- New magical creatures or technological innovations
- Unexplored corners of established worlds
- New time periods that fit the timeline
- Subtle genre-blending between fantasy and sci-fi

**Character Development:**
- Give existing characters new dimensions without contradicting core traits
- Create compelling new characters that enhance the universe
- Develop relationships between characters from different time periods
- Show character growth across interconnected stories

### 🌟 Experimental Features

**Narrative Techniques:**
- Multiple POV in long stories (when appropriate)
- Nested stories or stories-within-stories
- Time-shifted narratives (with clear timestamps)
- Cross-dimensional perspective shifts

**Meta-Elements:**
- Stories can reference the concept of stories being recorded/preserved
- L'Ultima Libreria specifically serves as a meta-repository for the collection
- The act of storytelling itself can be thematically important

---

## 📚 Documentation Requirements

### 📊 Database Maintenance

**Always update when creating stories:**

1. **`characters/database-personaggi.md`** - Add new characters with full profiles
2. **`INDICE.md`** - Add story to appropriate genre section with summary
3. **`worlds/descrizioni-mondi.md`** - Expand world descriptions if needed

### 🗂️ File Management

**Commit Message Format:**
```
feat(stories): add [story-title] - [genre] story

- Introduces [character names]
- Connects to [related stories]
- Expands [world/timeline element]
- Updates character database
```

**Documentation Files:**
- Always use Markdown format (.md)
- Include proper headers and sections
- Maintain consistent formatting across files
- Use relative links for internal references

---

## 🎨 Image Generation Guidelines

### 📸 Automatic Image Integration

**Every story must include three generated images:**

1. **Opening Image** - Sets the scene and atmosphere
2. **Central Image** - Captures the main conflict or turning point
3. **Closing Image** - Shows the resolution or epilogue

### 🔗 Generation Endpoint

**Always use this endpoint:**
```
https://giobiflare-llm24.giobi.workers.dev/image?prompt=${encodeURIComponent(prompt)}
```

### ✍️ Prompt Engineering

**Prompt Structure:**
```
[Visual Style], [genre] style, [setting], cinematic lighting, detailed digital art. [Scene description]
```

**Examples:**
- `Fantasy illustration, mystery/sci-fi style, Colonia Spaziale Artemis-7, cinematic lighting, detailed digital art. Opening scene: Detective Luna examining a crime scene in a futuristic space station...`
- `Digital art, fantasy style, Terra Mystica, cinematic lighting, detailed illustration. Final scene: Marco standing in a crystalline forest under twin moons...`

**Best Practices:**
- Keep prompts under 300 characters
- Include specific details from that part of the story
- Match the visual style to the story's genre and mood
- Ensure consistency with the established world descriptions

### 🖼️ Image Placement

```markdown
## Storia

<!-- IMMAGINE INIZIALE -->
![Alt text](image_url "Title")

[First third of story...]

<!-- IMMAGINE CENTRALE -->
![Alt text](image_url "Title")

[Second third of story...]

<!-- IMMAGINE FINALE -->
![Alt text](image_url "Title")

[Final third of story...]
```

---

## 🤝 Collaboration Principles

### 🎭 Respecting the Creative Vision

**This project celebrates:**
- AI-human collaborative creativity
- Italian storytelling traditions
- Interconnected narrative universes
- Genre-blending innovation
- Community-driven development

**Core Values:**
- **Creativity**: Encourage innovative storytelling within established boundaries
- **Consistency**: Maintain universe coherence above all else
- **Quality**: Each story should enhance the overall collection
- **Accessibility**: Stories should be enjoyable for diverse audiences
- **Inclusivity**: Characters and themes should reflect universal human experiences

### 🌈 Community Guidelines

**When working on this project:**
- Respect the existing creative work and established patterns
- Build upon others' contributions rather than replacing them
- Communicate clearly about changes to shared universe elements
- Maintain the bilingual nature of the project
- Focus on additive rather than subtractive changes

---

## 🏁 Final Notes

**Success Metrics for AI Contributions:**
- Stories that feel natural within the established universe
- Characters that readers want to see in future stories
- Cross-references that enhance rather than distract
- Technical documentation that helps future contributors
- Creative innovations that expand possibilities without breaking consistency

**Remember**: This is both a technical project demonstrating AI capabilities AND a genuine creative endeavor aiming to produce compelling, interconnected stories that readers will enjoy.

---

*Questo documento è in continua evoluzione grazie alla collaborazione tra intelligenza artificiale e visione umana.*

*This document continuously evolves through the collaboration between artificial intelligence and human vision.*

**Ultima modifica**: Agosto 2024 | **Last modified**: August 2024