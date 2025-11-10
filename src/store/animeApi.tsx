import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AiredDate {
  string: string;
}

interface BroadcastInfo {
  string: string;
}

interface TrailerInfo {
  embed_url: string;
}

interface Entity {
  name: string;
}

export interface Anime {
  source: string | null;
  aired: AiredDate | null;
  broadcast: BroadcastInfo | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  url: string | null;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[] | null;
  producers: Entity[];
  licensors: Entity[];
  themes: Entity[];
  trailer: TrailerInfo | null;
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number | null;
  synopsis: string;
  episodes: number | null;
  status: string;
  year: number | null;
  genres: Entity[];
  studios: Entity[];
  type: string;
  rating: string | null;
  duration: string | null;
}

interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

interface AnimeDetailResponse {
  data: Anime;
}

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4" }),
  endpoints: (builder) => ({
    searchAnime: builder.query<AnimeResponse, { query: string; page: number }>({
      query: ({ query, page }) => `/anime?q=${query}&page=${page}&limit=12`,
    }),
    getAnimeById: builder.query<AnimeDetailResponse, number>({
      query: (id) => `/anime/${id}`,
    }),
  }),
});

export const { useSearchAnimeQuery, useGetAnimeByIdQuery } = animeApi;
