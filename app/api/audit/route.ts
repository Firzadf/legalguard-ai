import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query, contractText } = await req.json();

    const langflowBase = process.env.LANGFLOW_BASE_URL || 'http://localhost:7860';
    const flowId = process.env.LANGFLOW_FLOW_ID;
    const token = process.env.LANGFLOW_APPLICATION_TOKEN;

    // Optional: Call real Langflow endpoint if configured
    if (flowId && token) {
      const response = await fetch(`${langflowBase}/api/v1/run/${flowId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          input_value: query,
          input_type: 'chat',
          output_type: 'chat'
        })
      });

      const data = await response.json();
      return NextResponse.json({ result: data });
    }

    // Default High-Fidelity Simulation for Capstone Showcase
    return NextResponse.json({
      success: true,
      data: {
        summary: "Audit selesai. Ditemukan potensi klausul berat sebelah pada pembatasan tanggung jawab dan terminasi sepihak.",
        riskLevel: "HIGH",
        findings: [
          {
            clause: "Pasal 12: Batasan Pertanggungjawaban (Limitation of Liability)",
            quote: "Penyedia Layanan dibebaskan dari segala tuntutan ganti rugi, baik langsung maupun tidak langsung, melebihi total pembayaran bulan terakhir.",
            risk: "HIGH",
            analysis: "Klausul ini membatasi pemulihan kerugian perusahaan klien jika terjadi kebocoran data (UU PDP) atau downtime kritis yang merugikan operasional bisnis.",
            recommendation: "Tambahkan pengecualian (carve-out) untuk pelanggaran kerahasiaan data pribadi, kelalaian berat (gross negligence), dan pelanggaran hak kekayaan intelektual."
          },
          {
            clause: "Pasal 17: Pengakhiran Perjanjian (Termination)",
            quote: "Pihak Pertama berhak menghentikan kerja sama sewaktu-waktu secara sepihak tanpa pemberitahuan tertulis sebelumnya.",
            risk: "CRITICAL",
            analysis: "Menghilangkan perlindungan transisi bisnis klien dan berpotensi memutus layanan tanpa waktu migrasi cadangan.",
            recommendation: "Ubah menjadi kewajiban pemberitahuan tertulis minimal 30 hari kalender dengan kewajiban memberikan dukungan transisi data."
          }
        ]
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
