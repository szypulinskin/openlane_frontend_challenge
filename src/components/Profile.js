import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Box,
    Button, CircularProgress,
    Container,
    TextField,
    Typography
} from "@mui/material";
import DeleteDialog from './DeleteDialog'

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [storedUsers, setStoredUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
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

    const handleEdit = (value) => {
        navigate(`/edit-profile/${email}`)
    };

    return (
        <Box>
            {loading ? (<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
        ):(<Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: favoriteColor }}
                >
                    {fullName}'s Profile
                </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        value={userEmail}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={password}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        type="text"
                        value={fullName}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phone Number (Optional)"
                        type="tel"
                        value={phoneNumber}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Favorite Color"
                        type="text"
                        value={favoriteColor}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <DeleteDialog/>
                    </Box>
            </Box>
        </Container>)}
        </Box>
    );
};

export default Profile;
