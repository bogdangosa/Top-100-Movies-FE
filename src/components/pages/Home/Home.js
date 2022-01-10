import React,{useState,useEffect} from 'react';
import './Home.css';
import MovieCard from '../../shared/MovieCard/MovieCard';
import searchIcon from '../../../assets/search-icon.png';
import {Link} from 'react-router-dom';


function Home(props) {
  const [Data,setData] = useState([]);
  const [SearchText,SetSearchText] = useState("");
  const [Page,setPage] = useState(1);
  const [SelectedFilter,SetSelectedFilter] = useState("popular");
  const [FilterState,setFilterState] = useState(false);


  const API_KEY = "85d5c588a2dbbb1cf79f1d9a69ac5815"

  useEffect(()=>{
    FetchMovies("true");
  },[Page]);

  useEffect(()=>{
    FetchMovies(false);
  },[SelectedFilter]);

  const FetchMovies = async (PushData)=>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${SelectedFilter}?api_key=${API_KEY}&page=${Page}`);
    const result = await response.json();
    console.log(result);
    if(PushData)
      setData([...Data,...result.results]);
    else
      setData(result.results);
  }
  const SearchMovies = async ()=>{
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${SearchText}&api_key=${API_KEY}`);
    const result = await response.json();
    console.log(result);
    setData(result.results);
  }

  const SearchMovieinUsersList = (curent_movie_id) =>{
    if(props.user==null)
      return false;
    console.log(props.movie_list);
    for(let i=0;i<props.movie_list.length;i++){
      if(props.movie_list[i].movieid==curent_movie_id)
        return true;
    }
    return false;
  }

  return (
    <div className="Home">
        <div className="top-section">
            <h1 className="Title">Make your top 100 movies list</h1>
        </div>
        <div className="browse-top-container">
          <h2 className="browse-title-mobile">Browse Movies</h2>
          <div className="search-container">
            <input className="search-input" placeholder="search" value={SearchText} onChange={(e)=>SetSearchText(e.target.value)}/>
            <img src={searchIcon} className="search-btn" onClick={()=>SearchMovies()}/>
          </div>
          <h2 className="browse-title">Browse Movies</h2>
          <div className="filter-container">
          <div className="filter-options invisible">
              <p className="fliter-option">popular</p>
              <p className="fliter-option">now playing</p>
              <p className="fliter-option">top rated</p>
              <p className="fliter-option">upcoming</p>
            </div>
            <p className="curently-selected" onClick={()=>setFilterState(!FilterState)}>{SelectedFilter}</p>
            <div className={FilterState?"filter-options":"filter-options invisible"}>
              <p className="fliter-option" onClick={()=>SetSelectedFilter("popular")}>popular</p>
              <p className="fliter-option" onClick={()=>SetSelectedFilter("now_playing")}>now playing</p>
              <p className="fliter-option" onClick={()=>SetSelectedFilter("top_rated")}>top rated</p>
              <p className="fliter-option" onClick={()=>SetSelectedFilter("upcoming")}>upcoming</p>
            </div>
          </div>
        </div>
        <div className="browse-container">
          {
            Data.map((MovieData,index)=>{
              return(
              <MovieCard name={MovieData.original_title} image={MovieData.backdrop_path} vote_average={MovieData.vote_average}key={index} id={MovieData.id} added={SearchMovieinUsersList(MovieData.id)}/>
              )
            })
          }

        </div>
        <h2 className="browse-more-btn more-btn" onClick={()=>setPage(Page+1)}>More...</h2>

    </div>
  );
}

export default Home;
