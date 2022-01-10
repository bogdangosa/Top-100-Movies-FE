import React,{useEffect,useState} from 'react';
import './App.css';
import Header from './components/navigation/Header';
import Home from './components/pages/Home/Home';
import MyList from './components/pages/MyList/MyList';
import Movie from './components/pages/Movie/Movie'
import MyAccount from './components/pages/MyAccount/MyAccount';
import {BrowserRouter,Route,Routes} from 'react-router-dom'



function App() {
  const [user,setuser] = useState(undefined);
  const [movie_list,set_movie_list] = useState([]);
  const [change,callChange] = useState();

  useEffect(()=>{
      if(user!=undefined)
        FetchMovies();
  },[user,change])

  const FetchMovies = async()=>{
    const response = await fetch(`http://localhost:4000/movielist?userid=${user.id}`);
    const result = await response.json();
    console.log(result);
    set_movie_list(result.result_array);
  }


  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} setuser={(user)=>setuser(user)}/>
        <Routes>
          <Route path="/" element={<Home user={user} movie_list={movie_list}/>}></Route>    
          <Route path="/MyList" element={<MyList user={user} movie_list={movie_list}/>}></Route>          
          <Route path="/MyAccount" element={<MyAccount user={user} movie_list={movie_list}/>}></Route>            
          <Route path="/Movie/:movie_id" element={<Movie user={user} movie_list={movie_list} callchange={()=>callChange(change+1)}/>}></Route>            
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
