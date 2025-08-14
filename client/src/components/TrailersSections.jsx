import React, { useState } from "react";
import YouTube from "react-youtube";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";

const TrailersSections = () => {
  const [currentTrailer, setCurrentTrailer] = useState(
    dummyTrailers.length > 0 ? dummyTrailers[0] : null
  );

  // Helper: extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        {currentTrailer && (
          <div className="relative mx-auto max-w-[960px] w-full aspect-video">
            <YouTube
              videoId={getYouTubeId(currentTrailer.videoUrl)}
              className="w-full h-full"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,        // Auto‑play
                  mute: 1,            // Required for autoplay in most browsers
                  controls: 1,
                  modestbranding: 1,
                },
              }}
            />
          </div>
        )}
      </div>

      {dummyTrailers && dummyTrailers.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {dummyTrailers.map((trailer, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentTrailer(trailer)}
              className={`cursor-pointer border-4 rounded-lg overflow-hidden transition-transform duration-200 ${
                currentTrailer.videoUrl === trailer.videoUrl
                  ? "border-blue-500 scale-105"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ width: "200px" }}
            >
              <img
                src={trailer.image}
                alt={`Trailer ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrailersSections;
