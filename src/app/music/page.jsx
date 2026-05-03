const spotifyArtistUrl = "https://open.spotify.com/artist/1IGGZFDaw41PO6oc6aReq9";
const soundOnReleaseUrl = "https://www.soundon.global/library/detail?id=7633233121920976913";
const contactEmail = "andremuseu@gmail.com";

export const metadata = {
  title: "Andre Almeida Music | Official Artist Page",
  description:
    "Official music page for Andre Almeida, Brazilian artist behind the release DEIXA ELA IR.",
};

export default function MusicPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#8b5a2b55,transparent_35%),radial-gradient(circle_at_bottom_left,#1d4ed855,transparent_30%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af69]">
              Official Artist Page
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Andre Almeida
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-zinc-300 md:text-2xl">
              Brazilian artist blending romantic sertanejo, pisadinha, forró,
              cowboy influences, and international romantic sounds.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                Latest Release
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-white">
                DEIXA ELA IR
              </h2>

              <p className="mt-4 text-zinc-300">
                Artist contact:{" "}
                <a
                  className="text-[#d4af69] underline underline-offset-4"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={spotifyArtistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#1DB954] px-5 py-4 text-center font-semibold text-black transition hover:scale-[1.02]"
                >
                  Open Spotify Artist Profile
                </a>

                <a
                  href={soundOnReleaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#d4af69]/60 px-5 py-4 text-center font-semibold text-[#d4af69] transition hover:bg-[#d4af69] hover:text-black"
                >
                  View SoundOn Release
                </a>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/artist/1IGGZFDaw41PO6oc6aReq9?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500">
              This page is maintained as the official music identity page for
              Andre Almeida and is used to verify artist ownership, releases,
              contact information, and official streaming links.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicGroup",
            name: "Andre Almeida",
            url: "https://andre-almeida.online/music",
            email: contactEmail,
            sameAs: [spotifyArtistUrl, soundOnReleaseUrl],
            track: {
              "@type": "MusicRecording",
              name: "DEIXA ELA IR",
              byArtist: "Andre Almeida",
            },
          }),
        }}
      />
    </main>
  );
}
