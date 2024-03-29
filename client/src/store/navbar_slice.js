import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        value: false,
    },
    reducers: {
        turnOnNavbar: (state) => {
            state.value = true;
        },
        turnOffNavbar: (state) => {
            state.value = false;
        },
    },
});

export const { turnOnNavbar, turnOffNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;

export const nav = (state) => state.navbar.value;