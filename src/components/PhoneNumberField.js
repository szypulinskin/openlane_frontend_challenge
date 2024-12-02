import React from "react";
import TextField from "@mui/material/TextField";

const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return phoneNumber;

    // If user did not add international code of 1
    if (phoneNumber.charAt(0) !== '1') {
        phoneNumber = '1' + phoneNumber;
    }

    // Checks if number matches format, if so it formats the number as +1(999)999-9999
    const match = phoneNumber.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return `+${match[1]}(${match[2]})${match[3]}-${match[4]}`;
    }

    // If the input doesn't match, return as-is
    return phoneNumber;
};

const PhoneNumberField = ({ phoneNumber }) => {
    const formattedPhone = formatPhoneNumber(phoneNumber);

    return (
        <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={formattedPhone}
            slotProps={{
                readOnly: true,
            }}
        />
    );
};
export default PhoneNumberField;