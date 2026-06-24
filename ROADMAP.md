# Roadmap

Planned and nice-to-have features for the portfolio. Design docs live in
[`docs/roadmap/`](docs/roadmap/).

## Planned / nice-to-have

| Feature | Status | Design doc |
| --- | --- | --- |
| Self-hosted RAG chatbot | Planned (deferred) | [docs/roadmap/rag-chatbot.md](docs/roadmap/rag-chatbot.md) |

### Self-hosted RAG chatbot
A retrieval-augmented chatbot answering questions about Harsh, served by the
homelab Ollama instance. Fully self-hosted (no third-party API), and **completely
isolated from the frontend** — the GitHub Pages site stays 100% functional when the
homelab is offline; the chat widget simply hides itself when the backend is
unreachable. Reuses the in-house Go rate limiter. RAG over existing repo content
(no fine-tuning). See the [design doc](docs/roadmap/rag-chatbot.md) for
architecture, frontend-isolation rules, and the three retrieval algorithm options
under evaluation.
