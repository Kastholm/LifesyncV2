import React from 'react'

export async function getVideos() {
  
     const youtubePlaylistId = 'PLAKDE8PiTIRlGHK3mombeOi8YFf19SwZz'
     const youtubeApiKey = 'AIzaSyAfZw_hFG7wSzEPHKqBkG6EQ0pIHWKaNIY'

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${youtubePlaylistId}&maxResults=50&key=${youtubeApiKey}`
      );
      const data = await res.json();
      return data;

  };

 /*  export async function getUdemy() {
     const clientId = 'vwKHgge8zptAwt3pOjEMH2DcHSKJzYhrNNUS8W86';
     const clientSecret = '3zBz8YtQrmyIiQJ4AzUKOhKqbGcPbTol4jOrpmr5krqPEwHsqecAbJmBtKsTU8gjurFHiv8Fv6YpvM258BejgscNxhe5jbS5xrmp7QyKxsIi5z46GYVUehGFCqZKFlKP';
 
     const auth = btoa(`${clientId}:${clientSecret}`);
 
     const res = await fetch('https://www.udemy.com/api-2.0/courses', {
         headers: {
             'Authorization': `Basic ${auth}`
         }
     });
 
     const data = await res.json();
     console.log(data, 'udemy', data[0].locale);
     return data;
 } */
 


  

  
