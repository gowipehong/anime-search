import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchAnimeQuery } from "../store/animeApi";
import { useDebounce } from "../hooks/useDebounce";
import { AnimeCard } from "../components/AnimeCard";
import { Pagination } from "../components/Pagination";

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 250);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useSearchAnimeQuery(
    { query: debouncedSearch, page: currentPage },
    { skip: !debouncedSearch }
  );

  const handleAnimeClick = useCallback(
    (id: number) => {
      navigate(`/anime/${id}`);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
            Anime Search
          </h1>
          <p className="text-xl opacity-80 font-medium">
            Discover your next favorite anime
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                className="input input-bordered input-lg w-full shadow-2xl focus:shadow-primary/20 focus:border-primary transition-all duration-300 bg-base-100/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                autoFocus
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {isFetching && (
              <div className="text-center mb-4">
                <span className="loading loading-bars loading-md text-primary"></span>
              </div>
            )}

            {data?.data && data.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                  {data.data.map((anime) => (
                    <AnimeCard
                      key={anime.mal_id}
                      anime={anime}
                      onClick={() => handleAnimeClick(anime.mal_id)}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={data.pagination.last_visible_page}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl opacity-60 font-medium">
                  No anime found
                </p>
                <p className="text-sm opacity-40 mt-2">
                  Try a different search term
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
