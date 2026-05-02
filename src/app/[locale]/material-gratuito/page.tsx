export default function MaterialGratuitoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 px-6">
      <section className="max-w-5xl mx-auto py-20 text-center">
        <p className="inline-flex rounded-full border border-purple-400/40 px-4 py-2 text-sm text-purple-200 mb-6">
          Recursos gratuitos
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Recursos que elevam sua{" "}
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            presença digital.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-lg">
          Guias práticos, checklists e materiais selecionados para ajudar você a
          criar, crescer e converter online.
        </p>

        <div className="mt-12 rounded-3xl border border-cyan-400/30 bg-slate-900/70 p-8 text-left">
          <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-300 font-bold mb-4">
            Recurso em destaque
          </p>

          <h2 className="text-3xl font-bold">
            Guia Essencial do Posicionamento Digital
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl">
            Um passo a passo para definir seu posicionamento, atrair o público
            certo e se destacar no digital.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://drive.google.com/uc?export=download&id=1VJZQVyJk0ogJ1cMvR7941iOmJyJtW0SJ"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-xl bg-purple-600 px-6 py-3 font-bold text-white hover:bg-purple-500 transition"
            >
              Baixar PDF
            </a>

            <a
              href="https://drive.google.com/file/d/1VJZQVyJk0ogJ1cMvR7941iOmJyJtW0SJ/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-xl border border-white/10 px-6 py-3 font-bold text-white hover:border-cyan-400/40 transition"
            >
              Abrir no Drive
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
