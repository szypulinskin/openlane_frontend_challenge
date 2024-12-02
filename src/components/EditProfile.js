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
    // EditProfile lets the user change any attributes to their account and lets them save or cancel all changes

    const navigate = useNavigate();
    // useStates underneath are all used to set the textfields dynamically and can see edits live to name and color.
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    // storedUsers state is used to get all user data from localStorage so it is live data and can be altered
    const [storedUsers, setStoredUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
    // email param is used to pass in the users account that wants to be edited
    const { email } = useParams();

    useEffect(() => {
        // This effect fetches all user data in localStorage and uses .find to filter out the profile used to
        // log in. Then all details are stored in a state to dynamically change the textfields.
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

    // Validates all field when trying to save to make sure user does not input invalid inputs.
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

    // Updated user profile will be updated to localStorage with its new values
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
        // if emails stay the same we just replace the index of that user with their updated attributes
        if (user.email === updatedUser.userEmail) {
            const index = storedUsers.findIndex(user => user.email === updatedUser.userEmail);

            if (index !== -1) {
                storedUsers[index] = updatedUser;
            }

            localStorage.setItem('users', JSON.stringify(storedUsers));
        }
        // if email was changed we remove the old user profile with the old email and add the new
        // user profile with their updated email
        else {
            const updatedUsers = storedUsers.filter(user => user.userEmail !== email)
            updatedUsers.push(updatedUser);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }

        // Let user know their account is updated and navigate to their updated profile
        alert('Profile updated successfully!');
        navigate(`/profile/${userEmail}`);
    };

    // naviage user back to their original profile if they dont wish to save changes
    const handleCancel = () => {
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
