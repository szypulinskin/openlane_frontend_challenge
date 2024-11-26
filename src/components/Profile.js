import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container, Dialog, DialogTitle,
    TextField,
    Typography
} from "@mui/material";

function SimpleDialog(props) {
    const { open } = props;


    return (
        <Dialog open={open}>
            <Box direction="column"
                 alignItems="center"
                 justifyContent={'center'}>
            <DialogTitle>Are you sure you want to delete your profile? This action cannot be undone.</DialogTitle>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant={'contained'} > Yes </Button>
                <Button variant={'outlined'} > No </Button>
            </Box>
            </Box>
        </Dialog>
    );
}

const Profile = () => {
    const navigate = useNavigate();

    // Fetch user data from localStorage
    const [user] = useState(JSON.parse(localStorage.getItem('user')));

    // States to handle form fields for editing
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [open, setOpen] = useState(false);

    // Error message state
    // const [error, setError] = useState('');

    // On page load, set form fields with user data
    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setPassword(user.password);
            setFullName(user.fullName);
            setPhoneNumber(user.phoneNumber || '');
            setFavoriteColor(user.favoriteColor);
        } else {
            navigate('/'); // Redirect to login if no user data is found
        }
    }, [user, navigate]);




    const handleDelete = () => {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <Container maxWidth="sm">
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
                        value={email}
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
                            // onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <SimpleDialog
                            open={open}
                            onClose={handleClose}
                        />
                    </Box>
            </Box>
        </Container>
    );
};

export default Profile;
