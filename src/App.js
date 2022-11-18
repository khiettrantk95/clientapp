import React, { useState, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";

import MainHome from "./Home";
import ChatHome from "./chatapp/Home";
import AnniHome from "./anni/Home";

import './App.css';

const App = () => {
    
	return (
		<div>
			<Routes>
				<Route path="/" element={<MainHome />} />
				<Route path="/chat" element={<ChatHome />} />
				<Route path="/a2211" element={<AnniHome />} />
			</Routes>
		</div>
	);
};

export default App;
