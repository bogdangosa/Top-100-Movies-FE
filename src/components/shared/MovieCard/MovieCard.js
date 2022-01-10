import React,{useState,useEffect} from 'react';
import './MovieCard.css';
import {Link} from 'react-router-dom'
import NoImage from '../../../assets/no-image-available.jpg';


function MovieCard(props) {
  const [Image,setImage] = useState();

  useEffect(()=>{
    getImage();
  },[props.image]);

  const getImage = ()=>{
    if(props.image!=null){
    const image = `https://image.tmdb.org/t/p/w500${props.image}`;
    setImage(image);
    }
    else setImage(NoImage);
  }

  return (
    <Link to={`Movie/${props.id}`} className="MovieCard">
        <img src={Image} alt="movie-img" className="movie-card-image"/>
        <h2 className="movie-name">{props.name}</h2>
        <div className="movie-card-options">
          <p className="movie-card-score">{props.vote_average}/10</p>
          <p className="add-movie-btn-card">{props.added?"added":"add"}</p>
        </div>
    </Link>
  );
}

export default MovieCard;
