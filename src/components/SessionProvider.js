import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Button, Dialog, DialogActions, DialogTitle, Typography} from "@mui/material";

const SessionContext = createContext();

// SessionProvider is used to track a users activity and what route they currently are on. If they are on /profile or
// /edit-profile a timer of 60 seconds will begin and redirect them to '/' when timer finishes.
export const SessionProvider = ({ children }) => {
    const [timeoutId, setTimeoutId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const excludedRoutes = ["/", "/create-profile"];
    const isExcludedRoute = excludedRoutes.includes(location.pathname);

    // This starts the timer and opens dialog when the timer is met
    const startTimer = useCallback(() => {
        clearTimeout(timeoutId);
        if (isExcludedRoute) return;
        const id = setTimeout(() => {
            setIsDialogOpen(true);
        }, 60000); // 60 seconds
        setTimeoutId(id);
    }, [timeoutId, isExcludedRoute]);

    // This resets timer if on /profile or /edit-profile
    const resetTimer = () => {
        if (!isExcludedRoute) {
            startTimer();
        }
    };

    // This is called when timer reaches 0 and redirects the user to '/'
    const handleLogout = () => {
        clearTimeout(timeoutId);
        setIsDialogOpen(false);
        setTimeoutId(null);
        navigate("/");
    };

    // This effect tracks a user to see if they are active, if the user is inactive and not hovered over a box
    // it will never reset the timer and redirect them to '/'
    useEffect(() => {
        const events = ["mousemove", "keydown"];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        // Cleanup event listeners on unmount
        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimer));
            clearTimeout(timeoutId);
        };
    }, [resetTimer, timeoutId]);

    return (
        <SessionContext.Provider value={{ resetTimer, handleLogout }}>
            {children}
            <Dialog open={isDialogOpen} onClose={handleLogout}>
                <DialogTitle>Session Timed Out</DialogTitle>
                <Typography padding={5}>Your session has expired after 60 seconds.</Typography>
                <DialogActions>
                    <Button onClick={handleLogout} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </SessionContext.Provider>
    );
};

export const useSession = () => React.useContext(SessionContext);