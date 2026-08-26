import Image from "next/image";
import MusicPlayer from "@/components/music/MusicPlayer";

const spotifyArtistUrl = "https://open.spotify.com/artist/1IGGZFDaw41PO6oc6aReq9";
const soundOnReleaseUrl = "https://www.soundon.global/library/detail?id=7633233121920976913";
const contactEmail = "andremuseu@gmail.com";

export const metadata = {
  title: "Andre Almeida Music | Official Artist Page",
  description: "Official music page for Andre Almeida, Brazilian artist behind the release DEIXA ELA IR.",
};

export default function MusicPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Andre Almeida",
    url: "https://andre-almeida.online/music",
    sameAs: [spotifyArtistUrl],
    track: {
      "@type": "MusicRecording",
      name: "DEIXA ELA IR",
      byArtist: { "@type": "MusicGroup", name: "Andre Almeida" },
      url: soundOnReleaseUrl,
    },
  };

  return (
    <main className="min-h-screen bg-[#11110f] text-white">
      <section className="border-b border-white/10 px-5 py-14 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden bg-[#191917]">
            <Image src="/music/andre-profile-artist.png" alt="Andre Almeida artist portrait" fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 42vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c7b18d]">OFFICIAL ARTIST PAGE</p>
            <h1 className="mt-7 font-editorial text-[clamp(4rem,9vw,8rem)] leading-[0.82] tracking-[-0.055em]">Andre <span className="italic text-[#c7b18d]">Almeida.</span></h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/58">Brazilian artist blending romantic sertanejo, pisadinha, forró, cowboy influences and international romantic sounds.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href={spotifyArtistUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-[#f2efe8] px-6 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#11110f]">Spotify artist profile</a><a href={`mailto:${contactEmail}`} className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">Artist contact</a></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden border border-white/10 bg-black"><Image src="/music/deixa-ela-ir.png" alt="DEIXA ELA IR cover art by Andre Almeida" fill className="object-contain" sizes="(max-width:1024px) 100vw, 40vw" /></div>
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c7b18d]">LATEST RELEASE</p><h2 className="mt-6 font-editorial text-[clamp(3.2rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em]">DEIXA ELA IR</h2><p className="mt-5 text-sm leading-7 text-white/55">Official release by Andre Almeida.</p><a href={soundOnReleaseUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center rounded-full border border-[#c7b18d]/45 px-6 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#c7b18d]">View official release</a><div className="mt-10 border-t border-white/10 pt-8"><p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">LISTEN ON WEBSITE</p><MusicPlayer /></div></div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-[9px] uppercase tracking-[0.14em] text-white/30">Official music identity · Andre Almeida</footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
