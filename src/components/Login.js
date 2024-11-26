import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            setError('Both email and password are required.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
            const users = await response.json();

            if (users.length === 0) {
                setError('Invalid email or password');
                return;
            }

            // Store user in localStorage
            localStorage.setItem('user', JSON.stringify(users[0]));

            // Navigate to the profile page
            navigate('/profile');
        } catch (error) {
            setError('Failed to login. Please try again later.');
        }
    };

    function handleCreateAccount() {
        navigate('/create-profile')
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                        onClick={handleCreateAccount}
                    >
                        Create An Account
                    </Button>
                <Typography sx={{ mt: 2 }} color="error">
                    {error}
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;