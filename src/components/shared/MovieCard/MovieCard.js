import React,{useState,useEffect} from 'react';
import './MovieCard.css';
import {Link} from 'react-router-dom'


function MovieCard(props) {
  return (
    <Link to={`Movie/${props.id}`} className="MovieCard">
        <img src={`https://image.tmdb.org/t/p/w500${props.image}`} alt="movie-img" className="movie-card-image"/>
        <h2 className="movie-name">{props.name}</h2>
        <div className="movie-card-options">
          <p className="movie-card-score">{props.vote_average}/10</p>
          <p className="add-movie-btn-card">add</p>
        </div>
    </Link>
  );
}

export default MovieCard;
