import Image from "next/image";

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

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="h-24 w-24 overflow-hidden rounded-full border border-white/15 shadow-xl">
                <img
                  src="/music/andre-profile-artist.png?v=3"
                  alt="Andre Almeida profile photo"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af69]">
                  Official Artist Page
                </p>

                <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                  Andre Almeida
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-300 md:text-2xl">
              Brazilian artist blending romantic sertanejo, pisadinha, forró,
              cowboy influences, and international romantic sounds.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="grid gap-8 md:grid-cols-[280px,1fr] md:items-center">
              <div className="flex justify-center md:justify-start">
                <div className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-xl">
                  <Image
                    src="/music/deixa-ela-ir.png"
                    alt="DEIXA ELA IR cover art by Andre Almeida"
                    width={1200}
                    height={1200}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                  Latest Release
                </p>

                <h2 className="mt-2 text-4xl font-semibold text-white">
                  DEIXA ELA IR
                </h2>

                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  Official release by Andre Almeida.
                </p>

                <p className="mt-3 text-zinc-300">
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
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 shadow-xl">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Listen on Spotify
            </p>

            <iframe
              style={{ borderRadius: "16px" }}
              src="https://open.spotify.com/embed/artist/1IGGZFDaw41PO6oc6aReq9?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-zinc-500">
            This page is maintained as the official music identity page for
            Andre Almeida and is used to verify artist ownership, releases,
            contact information, and official streaming links.
          </p>
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
