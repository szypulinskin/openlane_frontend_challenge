import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

const EditProfile = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [storedUsers, setStoredUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
    const { email } = useParams();

    useEffect(() => {
        // Load user data from localStorage
        const loadData = async () => {
            setStoredUsers(JSON.parse(localStorage.getItem('users')) || []);
            if (storedUsers) {
                setUser(storedUsers.find((user) => user.userEmail === email));
                setUserEmail(user.userEmail);
                setPassword(user.password);
                setFullName(user.fullName);
                setPhoneNumber(user.phoneNumber);
                setFavoriteColor(user.favoriteColor);
                setLoading(false);
            }
        };

        loadData();

    }, [loading]);

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
        if (user.email === updatedUser.userEmail) {
            const index = storedUsers.findIndex(user => user.email === updatedUser.userEmail);

            if (index !== -1) {
                storedUsers[index] = updatedUser;
            }

            localStorage.setItem('users', JSON.stringify(storedUsers));
        } else {
            const updatedUsers = storedUsers.filter(user => user.userEmail !== email)
            updatedUsers.push(updatedUser);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }

        alert('Profile updated successfully!');
        navigate(`/profile/${userEmail}`); // Redirect to profile view after saving
    };

    const handleCancel = () => {
        // Navigate back to profile page, discarding changes
        navigate(`/profile/${email}`);
    };

    return (
        <Box>
        {loading ?
                (<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box> ): (<Container maxWidth="sm">
                    <Box sx={{ mt: 8 }}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ color: favoriteColor }}
                        >
                            Edit {fullName} Profile
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
                                value={favoriteColor || ''}
                                onChange={(e) => setFavoriteColor(e.target.value)}
                                label="Favorite Color"
                                variant="filled">
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
                </Container>)}
        </Box>
    );
};

export default EditProfile;
