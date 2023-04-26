import './App.css';
import React, {useEffect, useState} from 'react';
import {supabase} from "./client.js";
import {useRoutes} from 'react-router-dom';
import NavBar from './routes/NavBar';
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import HomeFeed from "./pages/HomeFeed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Profile from "./pages/ProfilePage.jsx";
import PostDetail from "./components/PostDetail.jsx";
import EditPost from "./pages/EditPost.jsx";


const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
            //.order('created_at', { ascending: true })

            // set state of posts
            setPosts(data);
        }

        fetchPosts();
    }, []);

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
            element: token ? <HomeFeed token={token} data={posts}  /> : <Login setToken={setToken} />
        },
        {
            path: "/new",
            element: <CreatePost token={token} />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/post/:id",
            element: <PostDetail data={posts} />
        },
        {
            path: "/edit/:id",
            element: <EditPost data={posts} />
        }
    ]);

      return (
          <div className="App">
            <div className="container">
              <NavBar token={token} />
              <div className="content">
                {element}
              </div>
            </div>
          </div>
      );
}

export default App;
