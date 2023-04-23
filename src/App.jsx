import './App.css';
import React, {useEffect, useState} from 'react';
import {useRoutes} from 'react-router-dom';
import NavBar from './routes/NavBar';
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import HomeFeed from "./pages/HomeFeed.jsx";
import CreatePost from "./pages/CreatePost.jsx";


const App = () => {

    const [token, setToken] = useState(false)

    if(token){
        sessionStorage.setItem('token',JSON.stringify(token))
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            let data = JSON.parse(sessionStorage.getItem('token'))
            setToken(data)
        }

    }, [])

      // Sets up routes
    let element = useRoutes([
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/",
            element: <Login setToken={setToken} />
        },
        {
            path: "/home",
            element: token ? <HomeFeed token={token} /> : <Login setToken={setToken} />
        },
        {
            path: "/new",
            element: <CreatePost />
        }
    ]);

      return (
          <div className="App">
            <div className="container">
              <NavBar />
              <div className="content">
                {element}
              </div>
            </div>
          </div>
      );
}

export default App;
