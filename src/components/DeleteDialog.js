// import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

// Button that brings up dialog box to confirm with user if they want to delete their account
const DeleteDialog = () => {
    const [open, setOpen] = useState(false);
    const { email } = useParams();
    const navigate = useNavigate();

    // When yes is selected we filter out the account from localStorage and set it back to localStorage without
    // the current users account. We are then navigated back to home ('/').
    const handleYes = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || []
        const updatedUsers = storedUsers.filter(user => user.userEmail !== email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert('Account has been deleted!');
        navigate('/');
    }

    // When no is selected it sets open to false and closes the dialog box
    const handleNo = () => {
        setOpen(false);
    }

    // Open dialog when delete button is clicked
    const handleClickOpen = () => {
        setOpen(true);
    };

    // When clicking outside of the dialog box it closes the dialog box
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Delete
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                            <DialogTitle>Are you sure you want to delete your profile? This action cannot be undone.</DialogTitle>
                            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                <Button variant={'contained'} onClick={handleYes}> Yes </Button>
                                <Button variant={'outlined'} onClick={handleNo}> No </Button>
                            </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default DeleteDialog;