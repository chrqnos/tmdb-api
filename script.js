const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  let datatag = document.getElementById("datatag");
  datatag.innerHTML = "";
  let selectedMovie = document.getElementById("dropdown");
  const movieData = await getData("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "0a4dbc5e3b74420548bdd09d59591acf",
      query: selectedMovie.value,
    }
  });

  if (movieData.data.results.length < 1) {
    return;
  }

  let movie = movieData.data.results[0];
  const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
    params: {
      api_key: "0a4dbc5e3b74420548bdd09d59591acf",
      append_to_response: "videos",
    }
  });

  const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
  const h1 = document.createElement("h1")
  const p = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  const p4 = document.createElement('p');
  const img = document.createElement('img');
  const iframe = document.createElement('iframe');

  h1.innerHTML = `${extraData.data.original_title}`;
  p.innerHTML = `Overview: ${movie.overview}`;
  p2.innerHTML = `Release Date: ${movie.release_date} | Movie Popularity: ${movie.popularity}`;
  p3.innerHTML = `Adult: ${movie.adult} | Language: ${movie.original_language}`;
  p4.innerHTML = `Vote Average: ${movie.vote_average} | Vote Count: ${movie.vote_count}`;
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  iframe.src = `https://www.youtube.com/embed/${trailer}`;
  
  datatag.append(h1);
  datatag.append(p);
  datatag.append(img);
  datatag.append(iframe);
  datatag.append(p2);
  datatag.append(p3);
  datatag.append(p4);
};





