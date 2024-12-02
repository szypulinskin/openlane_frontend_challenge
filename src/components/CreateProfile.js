import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress, Container,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

// This component lets a user input their attributes and checks if input is valid. If everything is valid it will push
// the data to localStorage along with all existing users.
const CreateProfile = () => {
    // All states to dynamically track user inputs.
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // effects sets users with all existing users from localStorage
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    // All validations below track a users input when create profile button is pressed
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

    // Checks if the email provided has an existing profile in localStorage, if its a unique profile it will
    // add the profile to localStorage with existing users and navigate back to home ('/').
    const handleCreateProfile = async (e) => {

        const emailExists = users.some((user) => user.userEmail === userEmail);
        if (emailExists) {
            alert('This email already exists!')
        } else {
            e.preventDefault();
            if (!validateForm()) {
                return;
            }
            setLoading(true);

            const formattedPhoneNumber = phoneNumber && validatePhoneNumber(phoneNumber)
                ? phoneNumber.replace(/[^0-9]/g, '') : '';

            const newUser = {
                userEmail,
                password,
                fullName,
                phoneNumber: formattedPhoneNumber || null,
                favoriteColor,
            };

            const newSetOfUsers = users;
            newSetOfUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(newSetOfUsers));
            setLoading(false);
            alert('Profile was created!')
            navigate('/');

        }

        setLoading(false);

    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Create Profile
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
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phone Number (Optional)"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Favorite Color</InputLabel>
                        <Select
                            value={favoriteColor}
                            onChange={(e) => setFavoriteColor(e.target.value)}
                            label="Favorite Color"
                        >
                            <MenuItem value="">Select Color</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Green">Green</MenuItem>
                            <MenuItem value="Yellow">Yellow</MenuItem>
                            <MenuItem value="Purple">Purple</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="Orange">Orange</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 2 }}
                        onClick={handleCreateProfile}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                            "Create Profile"
                        )}
                    </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link href="/" underline="hover">
                        Login here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default CreateProfile;
