import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import edit_icon from '../../../assets/edit_icon.svg';
import './MyList.css';


function MyList(props) {

  return (
    <div className="MyList">
        <div className="upper-section-mylist">
          <h1 className="mylist-title">Your top 100 movies</h1>
          <img src={edit_icon} className="list_edit_btn"></img>
        </div>
        <div className="movie-list-container">
          {props.movie_list.map((Movie,index)=>{
              return(
                <CardMyList key={index} movieid={Movie.movieid} movie_position={Movie.movieposition}/>
              );
          })}
          
        </div>

    </div>
  );
}



const CardMyList = (props)=>{
  const [MovieData,SetMovieData] = useState([]);


  const API_KEY = "85d5c588a2dbbb1cf79f1d9a69ac5815"

  useEffect(()=>{
    getMovieData();
  },[]);

  const getMovieData = async ()=>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${props.movieid}?api_key=${API_KEY}`)
    const result = await response.json();
    SetMovieData(result);
  }

  return(
    <Link to={`../Movie/${props.movieid}`} className="card_my_list">
        <h1 className="movie_name">{props.movie_position}. {MovieData.original_title}</h1>
        <p className="remove_movie_btn">remove</p>
    </Link>
  )
}

export default MyList;
