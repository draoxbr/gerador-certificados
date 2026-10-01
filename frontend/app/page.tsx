"use client";
import { useState } from "react";

interface Certificado {
  nome: string;
  curso: string;
  cargaHoraria: string;
}

export default function Home() {
  const [dados, setDados] = useState<Certificado>({
    nome: "",
    curso: "",
    cargaHoraria: "",
  });
  const [carregando, setCarregando] = useState(false);

  async function gerarCertificado(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    try {
      const resposta = await fetch(
        "https://gerador-certificado-rwmz.onrender.com/certificado",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      if (resposta.ok) {
        const arquivo = await resposta.blob();
        const url = window.URL.createObjectURL(arquivo);
        const link = document.createElement("a");
        link.href = url;
        link.download = `certificado-${dados.nome.toLowerCase().replace(/\s+/g, "-") || "aluno"}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert("Erro ao gerar o certificado. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  }

  const formValido = dados.nome && dados.curso && dados.cargaHoraria;

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Luzes de Fundo (Glow Effect) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl p-6 sm:p-10 transition-all hover:border-slate-700/80">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
            Gerador de Certificados
          </h1>
          <p className="text-slate-400 text-sm mt-2.5 max-w-sm mx-auto">
            Preencha as informações abaixo para emitir e baixar o certificado oficial em PDF.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={gerarCertificado} className="space-y-5">
          {/* Campo Nome */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Nome do Aluno
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Pedro Ribeiro"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500/80 transition-all text-sm"
              value={dados.nome}
              onChange={(e) => setDados({ ...dados, nome: e.target.value })}
            />
          </div>

          {/* Campo Curso */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Nome do Curso
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Desenvolvedor Frontend"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500/80 transition-all text-sm"
              value={dados.curso}
              onChange={(e) => setDados({ ...dados, curso: e.target.value })}
            />
          </div>

          {/* Campo Carga Horária */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Carga Horária
            </label>
            <input
              type="text"
              required
              placeholder="Ex: 80 horas"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500/80 transition-all text-sm"
              value={dados.cargaHoraria}
              onChange={(e) =>
                setDados({ ...dados, cargaHoraria: e.target.value })
              }
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={!formValido || carregando}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl p-4 shadow-lg shadow-indigo-600/25 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 transition-all flex items-center justify-center gap-2 text-sm"
          >
            {carregando ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Gerando Certificado...</span>
              </>
            ) : (
              <>
                <span>Gerar e Baixar PDF</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Rodapé / Informação adicional */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            Servidor Python Backend ativo e pronto
          </p>
        </div>
      </div>
    </main>
  );
}