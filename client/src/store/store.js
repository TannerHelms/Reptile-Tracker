import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth_slice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

// const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    // reducer: { auth: persistedReducer },
    reducer: {
        auth: authReducer

    },
    devTools: true,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // })
});

// export const persistor = persistStore(store);

