# HolmsRAG Chatbot for Astro

Embeddable Sherlock Holmes themed RAG chatbot for `carina.nz`, updated for an Astro site.

## App architecture

```text
carina.nz Astro site
        |
        +-- Blog post embeds /holmsrag with an iframe
        |       or renders <HolmsRAGChat /> directly in an Astro page
        |
        v
HolmsRAG Astro component
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
holmsrag-chatbot-astro/
  astro.config.mjs
  package.json
  src/
    components/
      HolmsRAGChat.astro
    pages/
      holmsrag.astro
      api/
        chat.js
    styles/
      holmsrag.css
```

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:4321/holmsrag
```

## Embed in an Astro post

In your Astro markdown/MDX blog post, embed the hosted chatbot page:

```html
<iframe
  src="/holmsrag"
  title="HolmsRAG Sherlock Holmes chatbot"
  style="width:100%;height:760px;border:0;border-radius:22px;overflow:hidden;"
  loading="lazy">
</iframe>
```

If the chatbot is deployed separately, use the full deployed URL instead of `/holmsrag`.

## Direct Astro component usage

You can also render the component directly inside any Astro page:

```astro
---
import HolmsRAGChat from '../components/HolmsRAGChat.astro';
---

<HolmsRAGChat />
```

## Environment variables

```bash
DAILY_LIMIT=5
DATABRICKS_RAG_ENDPOINT=https://<workspace>/serving-endpoints/<endpoint>/invocations
DATABRICKS_TOKEN=<token>
```

## Production quota note

The included `/api/chat` endpoint uses an in-memory `Map`, which is fine for local development but resets when the server restarts and is not shared across serverless regions.

For production, replace it with one of these simple stores:

- Upstash Redis
- Cloudflare KV / D1
- Vercel KV
- Netlify Blobs
- A tiny Databricks Delta table service

Keep the client-side localStorage check as a nicer UX hint, but rely on the server-side quota for real enforcement.

## Deployment note

`astro.config.mjs` uses `output: 'server'` because the chatbot needs `/api/chat`. Add the adapter for your host:

```bash
npx astro add vercel
# or
npx astro add netlify
# or
npx astro add cloudflare
```
