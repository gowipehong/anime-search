import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Star, Calendar, Tv, Clock } from "lucide-react";
import { useGetAnimeByIdQuery } from "../store/animeApi";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const animeId = id ? Number(id) : 0;
  const { data, isLoading, error } = useGetAnimeByIdQuery(animeId, {
    skip: !id || isNaN(animeId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <div className="text-center">
          <p className="text-2xl mb-4">Anime not found</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(q ? `/?q=${encodeURIComponent(q)}` : "/")}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const anime = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        <button
          className="btn btn-ghost mb-6 gap-2 hover:btn-primary transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={() => navigate(q ? `/?q=${encodeURIComponent(q)}` : "/")}
        >
          <ArrowLeft size={20} />
          Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-2xl border border-base-300/50">
              <figure className="px-6 pt-6 relative group">
                <div className="absolute inset-6 rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="rounded-xl w-full shadow-2xl relative z-10 group-hover:scale-[1.02] transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20">
                  <Star
                    className="text-warning animate-pulse"
                    fill="currentColor"
                    size={28}
                  />
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-warning to-warning/70 bg-clip-text text-transparent">
                    {anime.score || "N/A"}
                  </span>
                </div>
                <div className="divider opacity-30"></div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Tv className="text-primary" size={20} />
                    <div>
                      <div className="text-xs opacity-70">Type</div>
                      <div className="font-semibold">{anime.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-secondary" size={20} />
                    <div>
                      <div className="text-xs opacity-70">Year</div>
                      <div className="font-semibold">{anime.year || "N/A"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-accent" size={20} />
                    <div>
                      <div className="text-xs opacity-70">Episodes</div>
                      <div className="font-semibold">
                        {anime.episodes || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="divider">Details</div>
                <div className="space-y-2 text-sm">
                  {anime.source && (
                    <div className="flex justify-between">
                      <span className="opacity-70">Source</span>
                      <span className="font-medium">{anime.source}</span>
                    </div>
                  )}
                  {anime.aired?.string && (
                    <div className="flex justify-between">
                      <span className="opacity-70">Aired</span>
                      <span className="font-medium text-right">
                        {anime.aired.string}
                      </span>
                    </div>
                  )}
                  {anime.broadcast?.string && (
                    <div className="flex justify-between">
                      <span className="opacity-70">Broadcast</span>
                      <span className="font-medium text-right">
                        {anime.broadcast.string}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="opacity-70">Rank</span>
                    <span className="font-medium">#{anime.rank ?? "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Popularity</span>
                    <span className="font-medium">
                      #{anime.popularity ?? "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Members</span>
                    <span className="font-medium">
                      {anime.members?.toLocaleString?.() ??
                        anime.members ??
                        "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Favorites</span>
                    <span className="font-medium">
                      {anime.favorites?.toLocaleString?.() ??
                        anime.favorites ??
                        "—"}
                    </span>
                  </div>
                </div>

                {anime.url && (
                  <>
                    <div className="divider"></div>
                    <a
                      href={anime.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline w-full"
                    >
                      View on MyAnimeList
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-300/50 backdrop-blur-sm">
              <div className="card-body">
                <h1 className="card-title text-5xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-extrabold">
                  {anime.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="badge badge-primary badge-lg shadow-lg">
                    {anime.status}
                  </span>
                  {anime.rating && (
                    <span className="badge badge-secondary badge-lg shadow-lg">
                      {anime.rating}
                    </span>
                  )}
                  {anime.duration && (
                    <span className="badge badge-accent badge-lg shadow-lg">
                      {anime.duration}
                    </span>
                  )}
                </div>
                <p className="text-lg leading-relaxed opacity-90">
                  {anime.synopsis}
                </p>
              </div>
            </div>

            {(anime.title_english ||
              anime.title_japanese ||
              (anime.title_synonyms?.length ?? 0) > 0) && (
              <div className="card bg-base-100 shadow-xl border border-base-300/50">
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">
                    Alternative Titles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {anime.title_english && (
                      <div>
                        <div className="opacity-70">English</div>
                        <div className="font-medium">{anime.title_english}</div>
                      </div>
                    )}
                    {anime.title_japanese && (
                      <div>
                        <div className="opacity-70">Japanese</div>
                        <div className="font-medium">
                          {anime.title_japanese}
                        </div>
                      </div>
                    )}
                    {anime.title_synonyms &&
                      anime.title_synonyms.length > 0 && (
                        <div className="md:col-span-3">
                          <div className="opacity-70">Synonyms</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {anime.title_synonyms.map((t, i) => (
                              <span key={i} className="badge badge-outline">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            {anime.studios?.length ||
            anime.producers?.length ||
            anime.licensors?.length ||
            anime.themes?.length ? (
              <div className="card bg-base-100 shadow-xl border border-base-300/50">
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">
                    Studios, Producers & More
                  </h2>

                  {anime.studios?.length ? (
                    <div className="mb-3">
                      <div className="opacity-70 text-sm mb-2">Studios</div>
                      <div className="flex flex-wrap gap-2">
                        {anime.studios.map((studio, index) => (
                          <span
                            key={index}
                            className="badge badge-primary badge-lg"
                          >
                            {studio.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {anime.producers?.length ? (
                    <div className="mb-3">
                      <div className="opacity-70 text-sm mb-2">Producers</div>
                      <div className="flex flex-wrap gap-2">
                        {anime.producers.map((p, i) => (
                          <span key={i} className="badge badge-ghost badge-lg">
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {anime.licensors?.length ? (
                    <div className="mb-3">
                      <div className="opacity-70 text-sm mb-2">Licensors</div>
                      <div className="flex flex-wrap gap-2">
                        {anime.licensors.map((l, i) => (
                          <span key={i} className="badge badge-info badge-lg">
                            {l.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {anime.themes?.length ? (
                    <div>
                      <div className="opacity-70 text-sm mb-2">Themes</div>
                      <div className="flex flex-wrap gap-2">
                        {anime.themes.map((t, i) => (
                          <span key={i} className="badge badge-accent badge-lg">
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {anime.genres && anime.genres.length > 0 && (
              <div className="card bg-base-100 shadow-xl border border-base-300/50">
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="badge badge-outline badge-lg"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {anime.trailer?.embed_url && (
              <div className="card bg-base-100 shadow-xl border border-base-300/50">
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">Trailer</h2>
                  <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-base-300/30">
                    <iframe
                      src={anime.trailer.embed_url}
                      title="Trailer"
                      className="w-full h-full"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
