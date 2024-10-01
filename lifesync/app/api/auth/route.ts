import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const traktClientId = process.env.TRAKT_CLIENT_ID;
const traktClientSecret = process.env.TRAKT_CLIENT_SECRET;
const redirectUri = process.env.TRAKT_REDIRECT_URI;

export async function setCode(paramRec: any) {
  const response = await fetch("https://api.trakt.tv/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: paramRec,
      client_id: traktClientId,
      client_secret: traktClientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();
  console.log("Access Token:", data.access_token, "data er b", data);
  // Brug cookies API til at sætte en cookie
  cookies().set({
    name: "traktAccessToken",
    value: data.access_token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return NextResponse.redirect("http://localhost:3000/lifesync/trakt");
}

export async function getMovies() {
  const traktAccessTokenVar = cookies().get("traktAccessToken");

  if (!traktAccessTokenVar?.value) {
    return;
  }
  const response = await fetch(
    "https://api.trakt.tv/sync/watchlist/movies/added",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${traktAccessTokenVar.value}`,
        "trakt-api-version": 2,
        "trakt-api-key": traktClientId,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch movies from Trakt:", response.statusText);
    return []; // Returnerer en tom array hvis der er en fejl
  }

  const data = await response.json();

  const promises = data.map(async (movie: any) => {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.movie.ids.tmdb}?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!tmdbResponse.ok) {
      console.error(
        "Failed to fetch movie details from TMDB:",
        tmdbResponse.statusText
      );
      return movie; // Returnerer original movie data hvis TMDB kald fejler
    }
    const tmdbData = await tmdbResponse.json();
    return { ...movie, tmdbData };
  });

  const allMovieDetails = await Promise.all(promises);

  return allMovieDetails;
}

export async function getWatchedMovies(page = 1, limit = 150) {
  const traktAccessTokenVar = cookies().get("traktAccessToken");

  if (!traktAccessTokenVar?.value) {
    return;
  }
  const response = await fetch(
    `https://api.trakt.tv/sync/history/movies?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${traktAccessTokenVar.value}`,
        "trakt-api-version": 2,
        "trakt-api-key": traktClientId,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch movies from Trakt:", response.statusText);
    return []; // Returnerer en tom array hvis der er en fejl
  }

  const data = await response.json();

  const promises = data.map(async (movie: any) => {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.movie.ids.tmdb}?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!tmdbResponse.ok) {
      console.error(
        "Failed to fetch movie details from TMDB:",
        tmdbResponse.statusText
      );
      return movie; // Returnerer original movie data hvis TMDB kald fejler
    }
    const tmdbData = await tmdbResponse.json();
    return { ...movie, tmdbData };
  });

  const allMovieDetails = await Promise.all(promises);

  return allMovieDetails;
}
