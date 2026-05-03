# App architectures

## Databricks
```mermaid
flowchart TD
    A[Sherlock Holmes novels<br/>TXT / EPUB / PDF]
    B[Cloud Object Storage<br/>S3 / ADLS / GCS raw landing zone]
    C[Databricks Auto Loader / Workflows]
    D[Bronze Delta Table<br/>raw documents + metadata]
    E[Databricks Job / Delta Live Tables<br/>text extraction, cleaning, chunking]
    F[Silver Delta Table<br/>clean chunks]
    G[Embedding Model<br/>Databricks Foundation Model APIs<br/>or external model endpoint]
    H[Vector Search Index<br/>Databricks Vector Search]
    I[RAG Application<br/>Databricks Model Serving / Apps / FastAPI]
    J[Prompt Builder]
    K[LLM<br/>Databricks Foundation Model APIs<br/>Claude / Llama / DBRX / external Bedrock]
    L[Answer with citations]
    M[Web App<br/>React / Next.js]

    A --> B --> C --> D --> E --> F --> G --> H
    M --> I
    I --> H
    H --> J
    J --> K
    K --> L
    L --> M
```

## AWS
```mermaid
flowchart TD
    A[Sherlock Holmes novels<br/>TXT / EPUB / PDF] --> B[S3 Raw Data Bucket]
    B --> C[Ingestion Lambda / ECS Task]
    C --> D[Text Cleaning + Chunking]
    D --> E[Embedding Model<br/>Amazon Bedrock Titan / Cohere]
    E --> F[Vector Store<br/>OpenSearch / Aurora pgvector]
    
    U[User] --> G[Web App<br/>React / Next.js]
    G --> H[API Gateway]
    H --> I[Chat Lambda / FastAPI on ECS]
    I --> J[Retrieve Relevant Chunks]
    J --> F
    J --> K[Prompt Builder]
    K --> L[LLM<br/>Claude / Amazon Nova / Llama via Bedrock]
    L --> M[Answer with citations]
    M --> G

    I --> N[CloudWatch Logs]
    B --> O[Optional: Metadata DB<br/>DynamoDB]
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
