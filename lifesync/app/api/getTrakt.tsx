import React from 'react'

export async function getTrakt() {
     const traktAccessToken = localStorage.getItem("traktAccessToken");
     const traktClientId = 123;

     const movies = await fetch('https://api.trakt.tv/sync/watchlist/movies/added', {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${traktAccessToken}`,
            "trakt-api-version": 2,
            "trakt-api-key": `${traktClientId}`,
          },
        })

  return (
    <div>getTrakt</div>
  )
}
