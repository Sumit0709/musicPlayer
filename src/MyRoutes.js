import React, { useEffect } from "react";
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from "./view/pages/Home";
import ScrollToTop from "./view/core/ScrollToTop";

import NotFound from './view/core/NotFound';
import Register from "./view/pages/register/Register";
import Login from "./view/pages/login/Login";
import Profile from "./view/pages/profile/Profile";
import UploadAudio from "./view/pages/profile/UploadAudio";
import Player from "./view/pages/player/Player";
import AllAudios from "./view/pages/audio/AllAudios";

const MyRoutes = () => {

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <Routes>
                // exact is by default set to true 
                <Route path="/" exact element={<Home/>}/>
                <Route path="/register" exact element={<Register/>}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/profile" exact element={<Profile/>}/>
                <Route path="/new/audio" exact element={<UploadAudio/>}/>
                <Route path="/player" exact element={<Player/>}/>
                <Route path="/allAudio" exact element={<AllAudios/>}/>

                <Route path='*' element={<NotFound/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes