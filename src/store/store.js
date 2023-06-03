import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/login/userSlice'
import web3Reducer from '../components/login/web3Slice'
import web3RecruitmentReducer from '../components/login/web3RecruitmentSlice'
import providerReducer from '../components/login/providerSlice'
import web3ModalReducer from '../components/login/web3ModalSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedWeb3ModalReducer = persistReducer(persistConfig, web3ModalReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    web3: web3Reducer,
    web3Recruitment: web3RecruitmentReducer,
    provider: providerReducer,
    web3Modal: persistedWeb3ModalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store)