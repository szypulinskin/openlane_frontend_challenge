import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import CreateProfile from './components/CreateProfile';
import EditProfile from "./components/EditProfile";
import {Box, Typography} from "@mui/material";

function App() {
    return (
        <Router>
            <Box>
                <Typography>Nate's FrontEnd Challenge</Typography>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-profile" element={<CreateProfile />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                </Routes>
            </Box>
        </Router>
    );
}

export default App;
