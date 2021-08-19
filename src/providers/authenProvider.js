import { createContext } from 'react';
const INITIAL_STATE = {
    isLogin: false,
    user: {},
};

export const authenProvider = createContext(INITIAL_STATE);
