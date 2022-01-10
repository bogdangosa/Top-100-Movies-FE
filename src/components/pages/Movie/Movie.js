import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';
import './Movie.css';
import axios from "axios";


function Movie(props) {
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

  const HandleResponse= ()=>{
      const callchange = props.callchange;
      callchange();
  }

  const AddMovie = ()=>{
    if(props.user==null)
      return;
    axios.post('http://localhost:4000/addmovie', {
      userid: props.user.id,
      movieid: movie_id,
      movieposition: props.movie_list.length+1 
    })
      .then(res=>HandleResponse(res))
      .catch(err=>console.log(err));
  }

  return (
    <div className="Movie">
      <div className="movie_upper_section">
        <div className='movie_image_container'>
          <img src={`https://image.tmdb.org/t/p/w1280${MovieData.backdrop_path}`} alt="movie-img" className="movie-image"/>
          <p className='add-movie-btn' onClick={()=>AddMovie()}>Add</p>
        </div>
        <div className="movie_stats">
            <h1>{MovieData.original_title}</h1>
            <div className="movie_grid_stats">
              <div className="movie_stat-container">
                <p>Score</p>
                <p>{MovieData.vote_average}</p>
              </div>

              <div className="movie_stat-container">
                <p>Popularity</p>
                <p>{MovieData.popularity}</p>
              </div>

              <div className="movie_stat-container">
                <p>Budget</p>
                <p>{MovieData.budget}</p>
              </div>

              <div className="movie_stat-container">
                <p>Runtime</p>
                <p>{MovieData.runtime}</p>
              </div>

            </div>
        </div>

      </div>
      <div className="movie-overview-container">
        <h1>Overview:</h1>
        <p>{MovieData.overview}</p>
      </div>

    </div>
  );
}

export default Movie;
