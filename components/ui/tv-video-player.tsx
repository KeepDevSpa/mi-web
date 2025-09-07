// v5/components/ui/tv-video-player.tsx

"use client";

import { useRef, useEffect } from 'react';

export const TVVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Intentar reproducir automáticamente cuando el componente se monta
      const playVideo = async () => {
        try {
          await video.play();
          console.log("Autoplay exitoso");
        } catch (error) {
          console.log("Autoplay bloqueado:", error);
        }
      };
      
      // Esperar un poco para que el video se cargue
      setTimeout(playVideo, 500);
    }
  }, []);

  const handleClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(e => console.log("Error reproduciendo:", e));
      } else {
        video.pause();
      }
    }
  };

  return (
    <div
      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-purple-500/50 cursor-pointer"
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src="/PrismaTV.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  );
};