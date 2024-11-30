import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

const EditProfile = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const { email } = useParams();

    useEffect(() => {
        // Load user data from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        console.log('NATES STORED USERS', storedUsers);
        const activeUser = storedUsers.find((user) => user.email === email);
        setUser(activeUser);
    }, [email]);

    const validateEmail = (userEmail) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(userEmail);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[^a-zA-Z0-9]){1}).{10,32}$/;
        return passwordRegex.test(password);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\+?\d{1,3}?\(?\d{1,4}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/;
        return phoneRegex.test(phone);
    };

    const validateForm = () => {
        if (!userEmail || !validateEmail(userEmail)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (!password || !validatePassword(password)) {
            setError('Password must be between 10-32 characters, include at least 2 uppercase letters, 2 numbers, and 1 special character.');
            return false;
        }
        if (!fullName || fullName.length < 3) {
            setError('Full name must be at least 3 characters.');
            return false;
        }
        if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
            setError('Phone number must be in E.164 format (e.g., +15615128712).');
            return false;
        }
        if (!favoriteColor) {
            setError('Please select a favorite color.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSaveProfile = () => {
        if (!validateForm()) {
            return;
        }

        // Save updated profile to localStorage
        const updatedUser = {
            userEmail,
            password,
            fullName,
            phoneNumber,
            favoriteColor,
        };
        localStorage.setItem('users', JSON.stringify(updatedUser));

        alert('Profile updated successfully!');
        navigate('/profile'); // Redirect to profile view after saving
    };

    const handleCancel = () => {
        // Navigate back to profile page, discarding changes
        navigate('/profile');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: user.favoriteColor }}
                >
                    Edit {user.fullName} Profile
                </Typography>
                {error && (
                    <Typography variant="body1" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        type="text"
                        value={user.fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phone Number (Optional)"
                        type="tel"
                        value={user.phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Favorite Color</InputLabel>
                        <Select
                            value={user.favoriteColor}
                            onChange={(e) => setFavoriteColor(e.target.value)}
                            label="Favorite Color"
                        >
                            <MenuItem value="">Select Color</MenuItem>
                            <MenuItem value="blue">Blue</MenuItem>
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="green">Green</MenuItem>
                            <MenuItem value="yellow">Yellow</MenuItem>
                            <MenuItem value="purple">Purple</MenuItem>
                            <MenuItem value="black">Black</MenuItem>
                            <MenuItem value="orange">Orange</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveProfile}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Box>
            </Box>
        </Container>
    );
};

export default EditProfile;
