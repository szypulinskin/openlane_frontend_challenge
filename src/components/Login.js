import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const Login = () => {
    // Log in page that checks for a email and password and checks localStorage if account exists.
    // Also includes a button to create an account

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Effect sets users state with what is returned in localStorage, if localStorage is empty its set empty array
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    // Checks if email provided is found returned in localStorage state and checks if password matches
    const authenticateUser = () => {
        const user = users.find((user) => user.userEmail === email);

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        if (user.password === password) {
            return { success: true, message: 'Login successful' };
        } else {
            return { success: false, message: 'Incorrect password' };
        }
    };

    // User provides a proper email and password then they are alerted with if the account exists or not
    // and will be navigated to their account if password is correct
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Both email and password are required.');
            return;
        }

        const result = authenticateUser();

        alert(result.message);

        if(result.success) {
            navigate(`/profile/${email}`);
        }




    };

    // When create an account button is selected it navigates a user to create an account
    const handleCreateAccount = () => {
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