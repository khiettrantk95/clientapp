import React, { useState, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";

import MainHome from "./Home";
import ChatHome from "./chatapp/Home";
import ChessHome from "./chessapp/Home";

import './App.css';

const App = () => {
    
	return (
		<div>
			<h1>Welcome to React Router!</h1>
			<Routes>
				<Route path="/" element={<MainHome />} />
				<Route path="/chat" element={<ChatHome />} />
				<Route path="/chess" element={<ChessHome boardWidth={1000} />} />
			</Routes>
		</div>
	);
};

export default App;
