import React from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import {  Route, Routes } from 'react-router-dom';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import { LoginPage } from "./home/HomePage";


function App () {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<LoginPage/>} />
            </Routes>
        </> 
    );
}


export default App;