import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';
import './Movie.css';


function Movie() {
  const {movie_id} = useParams();
  const [MovieData,SetMovieData] = useState({});
  const API_KEY = "85d5c588a2dbbb1cf79f1d9a69ac5815"

  useEffect(()=>{
    FetchMovieData();
  },[]);

  const FetchMovieData =  async()=>{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`);
      const result = await response.json();
      console.log(result);
      SetMovieData(result);
  }

  return (
    <div className="Movie">
      <img src={`https://image.tmdb.org/t/p/w1280${MovieData.backdrop_path}`} alt="movie-img" className="movie-image"/>
      <h1>{MovieData.original_title}</h1>
    </div>
  );
}

export default Movie;
