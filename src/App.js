import React,{useState} from 'react';
import './App.css';
import Header from './components/navigation/Header';
import Home from './components/pages/Home/Home';
import MyList from './components/pages/MyList/MyList';
import Movie from './components/pages/Movie/Movie'
import MyAccount from './components/pages/MyAccount/MyAccount';
import {BrowserRouter,Route,Routes} from 'react-router-dom'



function App() {
  const [user,setuser] = useState(undefined);

  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} setuser={(user)=>setuser(user)}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>    
          <Route path="/MyList" element={<MyList user={user}/>}></Route>          
          <Route path="/MyAccount" element={<MyAccount user={user}/>}></Route>            
          <Route path="/Movie/:movie_id" element={<Movie/>}></Route>            
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
