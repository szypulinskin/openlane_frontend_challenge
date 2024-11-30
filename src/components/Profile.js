import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const { email } = useParams();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        console.log('NATES STORED USERS', storedUsers);
        const activeUser = storedUsers.find((user) => user.email === email);
        setUser(activeUser);
    }, [email]);




    const handleDelete = () => {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleEdit = (value) => {
        navigate(`/edit-profile/${email}`)
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: user.favoriteColor }}
                >
                    {user.fullName}'s Profile
                </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        value={user.email}
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
                        value={user.password}
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
                        value={user.fullName}
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
                        value={user.phoneNumber}
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
                        value={user.favoriteColor}
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
