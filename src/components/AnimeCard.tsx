import { memo } from "react";
import { Star } from "lucide-react";
import { Anime } from "../store/animeApi";

interface AnimeCardProps {
  anime: Anime;
  onClick: () => void;
}

export const AnimeCard = memo(function AnimeCard({
  anime,
  onClick,
}: AnimeCardProps) {
  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden border border-base-300/50"
      onClick={onClick}
    >
      <figure className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {anime.score && (
          <div className="absolute top-3 right-3 badge badge-warning gap-1 p-3 shadow-lg backdrop-blur-sm bg-warning/90 border-warning/50 z-20">
            <Star size={14} fill="currentColor" />
            <span className="font-bold">{anime.score}</span>
          </div>
        )}
      </figure>
      <div className="card-body flex flex-col justify-between bg-gradient-to-b from-base-100 to-base-200/50">
        <h2 className="card-title text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {anime.title}
        </h2>
        <div className="flex gap-2 mt-2">
          {anime.type && (
            <span className="badge badge-primary shadow-md">{anime.type}</span>
          )}
          {anime.year && (
            <span className="badge badge-outline shadow-md">{anime.year}</span>
          )}
        </div>
      </div>
    </div>
  );
});
