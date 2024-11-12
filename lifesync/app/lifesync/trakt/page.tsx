import Link from "next/link";
import React from "react";
import { getWatchedMovies, setCode } from "@/app/lifesync/trakt/api/auth/route";
import { getMovies } from "@/app/lifesync/trakt/api/auth/route";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export default async function Page({ searchParams }) {
  const code = searchParams.code;
  const traktClientId = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID
  const traktClientSecret = process.env.NEXT_PUBLIC_TRAKT_CLIENT_SECRET
  const redirectUri = process.env.NEXT_PUBLIC_TRAKT_REDIRECT_URI;

  const movies = await getMovies();

  const watchedMovies = await getWatchedMovies();

  function groupMovies(movies, groupSize) {
    const groups = [];
    for (let i = 0; i < movies.length; i += groupSize) {
      groups.push(movies.slice(i, i + groupSize));
    }
    return groups;
  }
  function removeDuplicateMovies(movies) {
    const titles = new Set();
    const uniqueMovies = [];

    movies.forEach((movie) => {
      if (!titles.has(movie.movie.title)) {
        titles.add(movie.movie.title);
        uniqueMovies.push(movie);
      }
    });

    return uniqueMovies;
  }

  const usdToDkkRate = 6.5; // Konverteringsrate fra USD til DKK

function convertAndFormat(value) {
  // Først konvertere og afrunde værdien
  const roundedValue = Math.round(value * usdToDkkRate);

  // Derefter formatere den afrundede værdi
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    // Specifikere at der ikke ønskes nogen decimaler
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(roundedValue);
}

  return (
    <div>
      {movies ? (
        <Carousel>
          <div className="two mt-8 ml-1">
            <h1>
              Watch list
              <span>Movies on watchlist</span>
            </h1>
          </div>
          <CarouselContent>
            {groupMovies(movies, 6).map((movieGroup, idx) => (
              <CarouselItem key={idx}>
                <div className="flex gap-8 justify-around">
                  {movieGroup.map((movie) => (
                    <div
                      key={movie.movie.ids.trakt}
                      className="mx-auto w-[230px] relative bg-white rounded-3xl shadow-xl"
                    >
                      <div className="grid rounded-3xl shadow-sm bg-slate-100 flex-col">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.tmdbData.poster_path}`}
                          alt={`Plakat for ${movie.movie.title}`}
                          width="260"
                          height="100"
                          className="rounded-3xl grid object-cover"
                        />

                        <div className="group p-5 grid z-10 absolute bg-slate-100 bottom-0 min-h-[80%] rounded-b-3xl opacity-0 hover:opacity-100 transition-opacity">
                          <a
                            href={`/`}
                            className="group-hover:text-cyan-700 mb-auto font-bold md:text-2xl line-clamp-2"
                          >
                            {movie.movie.title}
                          </a>
                          <span className="text-slate-400 font-semibold">
                            ({movie.movie.year})
                          </span>
                          <div className="overflow-clip h-20">
                            <span className="line-clamp-3 py-2 leading-6 text-sm font-light">
                              {movie.tmdbData.overview}
                            </span>
                          </div>
                          <div className="grid-cols-2 flex group justify-between">
                            <div className="font-black flex flex-col">
                              <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
                                {Math.round(movie.tmdbData.vote_average)}
                                {/* SVG ikon her */}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div>
          <Link
            href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${traktClientId}&redirect_uri=${redirectUri}`}
          >
            Get code
          </Link>
          <form
            action={async () => {
              "use server";
              await setCode(code);
            }}
          >
            <button>Set Code</button>
          </form>
        </div>
      )}

      {watchedMovies ? (
        <div className="mt-12">
          <div className="two">
            <h1>
              Watched Movies
              <span>Recently watched movies</span>
            </h1>
          </div>
          <div>
            {/* {groupMovies(movies, 6).map((movieGroup, idx) => ( */}
            <div /* key={idx} */>
              <div className="grid grid-cols-5 gap-8  justify-around">
                {removeDuplicateMovies(watchedMovies).map((movie) => (
                  <div
                    key={movie.movie.ids.trakt}
                    className="mx-auto w-[230px] relative bg-white rounded-3xl shadow-xl"
                  >
                    <div className="grid rounded-3xl shadow-sm bg-slate-100 flex-col">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.tmdbData.poster_path}`}
                        alt={`Plakat for ${movie.movie.title}`}
                        width="260"
                        height="100"
                        className="rounded-3xl grid object-cover"
                      />

                      <div className="group p-5 grid z-10 absolute bg-slate-100 bottom-0 right-0 left-0 min-h-[80%] rounded-b-3xl opacity-0 hover:opacity-100 transition-opacity">
                        <a
                          href={`/`}
                          className="group-hover:text-cyan-700 mb-auto font-bold md:text-2xl line-clamp-2"
                        >
                          {movie.movie.title}
                        </a>
                        <span className="text-slate-400 font-semibold">
                          ({movie.movie.year})
                        </span>
                        <div className="overflow-clip h-20 w-full">
                          <span className=" py-2 leading-6 text-sm font-light">
                            <span className="py-2 leading-6 text-sm font-light">
                              <b>Bud </b>
                              <Badge variant={"outline"}>
                                {convertAndFormat(movie.tmdbData.budget)}
                              </Badge>
                              <br></br>
                              <b>Rev </b>
                              <Badge variant={"outline"}>
                                {convertAndFormat(movie.tmdbData.revenue)}
                              </Badge>
                              <br></br>
                              <b>Inc . </b>
                              <Badge variant={"default"}>
                                {convertAndFormat(
                                  movie.tmdbData.revenue - movie.tmdbData.budget
                                )}
                              </Badge>
                            </span>
                          </span>
                        </div>
                        <div className="grid-cols-2 flex group justify-between">
                          <div className="font-black flex flex-col">
                            <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
                              {Math.round(movie.tmdbData.vote_average)}
                              {/* SVG ikon her */}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      ) : (
        <div>
          <Link
            href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${traktClientId}&redirect_uri=${redirectUri}`}
          >
            Get code
          </Link>
          <form
            action={async () => {
              "use server";
              await setCode(code);
            }}
          >
            <button>Set Code</button>
          </form>
        </div>
      )}
    </div>
  );
}
