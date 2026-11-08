"use client";

import React, { useState } from 'react';
import { ShieldAlert, FileText, CheckCircle2, AlertTriangle, ArrowRight, Database, Cpu, Sparkles, UploadCloud } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState("Audit klausul pembatasan tanggung jawab (liability) dan pengakhiran kontrak");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const json = await res.json();
      setResult(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <ShieldAlert className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">LegalGuard AI</h1>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              Langflow × Supabase pgvector
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Autonomous SaaS Contract Compliance & Legal Risk Intelligence Agent
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 p-2 rounded-lg shadow-sm">
          <Database className="w-4 h-4 text-emerald-600" /> Supabase Connected
          <span className="text-slate-300">|</span>
          <Cpu className="w-4 h-4 text-indigo-600" /> Gemini 2.5 Flash
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Input & Documents */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-4">
              <UploadCloud className="w-5 h-5 text-emerald-600" /> Upload Kontrak / NDA
            </h2>
            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 transition-colors p-6 rounded-xl text-center cursor-pointer bg-slate-50/50">
              <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">Vendor_Enterprise_Agreement_2026.pdf</p>
              <p className="text-xs text-slate-400 mt-1">Indexed in Supabase Vector Table (documents)</p>
            </div>

            <div className="mt-6">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Instruksi Audit / Pertanyaan Klausul
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleAudit}
              disabled={loading}
              className="mt-4 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>Menganalisis Dokumen via Langflow...</>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Jalankan Audit Kontrak <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Arsitektur Agen</h3>
            <ul className="text-xs text-slate-300 mt-3 space-y-2">
              <li>• Ingestion: Recursive Character Text Splitter (800 Chunks)</li>
              <li>• Embeddings: Google Gemini Embeddings (768 Dimensi)</li>
              <li>• Storage: Supabase PostgreSQL pgvector + RPC Match</li>
              <li>• Reasoning: Prompt Template Layered Compliance Persona</li>
            </ul>
          </div>
        </div>

        {/* Right: Audit Report Output */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[480px]">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Executive Audit Report
              </h2>
              {result && (
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  result.riskLevel === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  OVERALL RISK: {result.riskLevel}
                </span>
              )}
            </div>

            {!result && !loading && (
              <div className="py-24 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-600">Belum ada audit yang dijalankan</p>
                <p className="text-xs text-slate-400 mt-1">Klik tombol &ldquo;Jalankan Audit Kontrak&rdquo; untuk memulai pemeriksaan.</p>
              </div>
            )}

            {loading && (
              <div className="py-24 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-sm font-medium text-slate-700">Melakukan Vector Similarity Search di Supabase...</p>
                <p className="text-xs text-slate-400 mt-1">Mengekstrak risiko hukum via Gemini 2.5 Flash</p>
              </div>
            )}

            {result && !loading && (
              <div className="mt-4 space-y-6">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">
                  <p className="font-semibold text-slate-900 mb-1">Ringkasan Eksekutif:</p>
                  {result.summary}
                </div>

                <div className="space-y-4">
                  {result.findings.map((f: any, idx: number) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-900">{f.clause}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          f.risk === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                          {f.risk} RISK
                        </span>
                      </div>
                      <blockquote className="text-xs italic bg-slate-50 p-2.5 rounded-lg border-l-2 border-slate-400 text-slate-600">
                        &ldquo;{f.quote}&rdquo;
                      </blockquote>
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">Dampak Risiko:</span> {f.analysis}
                      </div>
                      <div className="text-xs text-emerald-800 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                        <span className="font-semibold text-emerald-900">Rekomendasi Revisi (Safe Clause):</span> {f.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
