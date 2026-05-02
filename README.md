# HolmesRAG Chatbot for Astro

Embeddable Sherlock Holmes themed RAG chatbot for `carina.nz`, updated for an Astro site.

## App architecture

```text
carina.nz Astro site
        |
        +-- Blog post embeds /holmesrag with an iframe
        |       or renders <HolmesRAGChat /> directly in an Astro page
        |
        v
HolmesRAG Astro component
        |
        v
POST /api/chat Astro server endpoint
        |
        +-- Daily quota check: 5 questions / visitor IP / day
        |
        v
Databricks Model Serving / Databricks Apps endpoint
        |
        v
Query embedding -> Databricks Vector Search -> Prompt builder -> LLM
        |
        v
Answer + citations returned to widget
```

## Git-style structure

```text
holmesrag/
  astro.config.mjs
  package.json
  src/
    components/
      HolmesRAGChat.astro
    pages/
      holmesrag.astro
      api/
        chat.js
    styles/
      holmesrag.css
```

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:4321/holmesrag
```