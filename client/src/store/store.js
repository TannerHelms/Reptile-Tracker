import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth_slice';
const rootReducer = combineReducers({
    auth: authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

