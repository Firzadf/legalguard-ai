# LegalGuard AI: SaaS Contract & Compliance Intelligence Agent
> **Capstone Project Track 1 (Langflow) - IBM SkillsBuild x Hacktiv8**

[![Langflow](https://img.shields.io/badge/Langflow-Workflow_Orchestration-blue.svg)](https://langflow.org)
[![Supabase](https://img.shields.io/badge/Supabase-pgvector_PostgreSQL-emerald.svg)](https://supabase.com)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-orange.svg)](https://aistudio.google.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Production_Deploy-black.svg)](https://vercel.com)

## 📌 Project Overview
**LegalGuard AI** adalah solusi agen AI otonom yang mengaudit klausul kontrak kerja sama bisnis, SLA, dan NDA vendor untuk menemukan klausul berisiko tinggi (*unlimited liability, auto-renewal sepihak, denda disproportionate, dan celah kepatuhan UU PDP*). 

Berbeda dari starter project konvensional, proyek ini mengintegrasikan **Supabase Vector Store (PostgreSQL pgvector)** sebagai vector store enterprise dan model penalaran **Google Gemini 2.5 Flash**.

---

## 🏗️ System Architecture
```
[Dokumen Kontrak (PDF)] ──> [Recursive Character Splitter]
                                     │
                                     ▼
[Google Gemini Embedding] ──> [Supabase Vector Table (documents)]
                                     │ (Cosine Similarity Search)
                                     ▼
[User Query / Chat Input] ──> [Clause Context Parser]
                                     │
                                     ▼
[Prompt Template (Auditor)] ──> [Gemini 2.5 Flash] ──> [Audit Report Output]
```

---

## 🚀 Quick Setup & Deployment

### 1. Setup Supabase
1. Buat proyek baru di [Supabase](https://supabase.com).
2. Masuk ke menu **SQL Editor**, buka file `supabase/schema.sql` di repository ini, dan klik **Run**.
3. Simpan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` dari menu **Settings > API**.

### 2. Import ke Langflow
1. Buka aplikasi **Langflow**.
2. Klik tombol **Import**, pilih file `langflow/legalguard_agent_flow.json`.
3. Masukkan API Key Gemini dan kredensial Supabase pada node terkait.
4. Klik **Playground** untuk menguji alur secara visual.

### 3. Deploy Frontend Web ke Vercel
1. Fork atau clone repository ini:
   ```bash
   git clone https://github.com/your-username/legalguard-ai.git
   cd legalguard-ai
   npm install
   ```
2. Jalankan secara lokal:
   ```bash
   npm run dev
   ```
3. Deploy ke Vercel:
   * Push project ke repository GitHub Anda.
   * Masuk ke [Vercel Dashboard](https://vercel.com) -> **Add New Project** -> Pilih repo `legalguard-ai`.
   * Masukkan Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, dll).
   * Klik **Deploy**.

---

## 📝 Jawaban Form Submission Capstone Project
Draf lengkap untuk formulir Google Form Hacktiv8 x IBM Sesi 3 tersedia di dokumentasi submission.
