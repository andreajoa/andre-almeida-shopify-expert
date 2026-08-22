"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className="rounded-2xl bg-[#1f1f1f] p-6 shadow-2xl md:p-8">
      <audio
        ref={audioRef}
        src="/music/deixa-ela-ir.mp3"
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl bg-black/40 shadow-xl md:h-44 md:w-44">
          <Image
            src="/music/andre-profile-artist.png"
            alt="Andre Almeida artist profile"
            fill
            sizes="(max-width: 768px) 144px, 176px"
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Now Playing
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            DEIXA ELA IR
          </h3>

          <p className="mt-2 text-zinc-300">
            Andre Almeida · Official Release
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://open.spotify.com/artist/1IGGZFDaw41PO6oc6aReq9"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Open on Spotify
            </a>

            <a
              href="https://www.soundon.global/library/detail?id=7633233121920976913"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#d4af69]/60 px-5 py-3 text-center text-sm font-semibold text-[#d4af69] transition hover:bg-[#d4af69] hover:text-black"
            >
              View SoundOn Release
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-black text-black transition hover:scale-105"
          aria-label={isPlaying ? "Pause DEIXA ELA IR" : "Play DEIXA ELA IR"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
}
