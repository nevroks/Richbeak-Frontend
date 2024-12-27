import { configureStore } from "@reduxjs/toolkit/react";
import { combineReducers, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import router from "../utils/router/router.tsx";
import themeReducer from "./theme/themeSlice.ts";
import languageReducer from "./language/languageSlice.ts";
import selectedCategoriesReducer from "./selectedCategories/selectedCategoriesSlice.ts";
import selectedCategoriesPopupReducer from "./selectedCategoriesPopup/selectedCategoriesPopupSlice.ts";
import { baseApi } from "../utils/api/baseApi.ts";
import categoriesBeforeChangeReducer from "./categoriesBeforeChange/categoriesBeforeChangeSlice.ts";
import csrfReducer from "./csrf/csrfSlice.ts";
import currencyReducer from './currency/currencySlice.ts'
import jwtReducer from './jwt/jwtSlice.ts';
import authorizedReducer from './authorized/authorizedSlice.ts';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import isAdminReducer from "./isAdmin/isAdminSlice.ts";

const persistConfig = {
  key: "root",
  storage,
  //blacklist: [baseApi],
  whitelist: ['theme', 'jwt', 'authorized', 'isAdmin'],
};

export const extraArgument = {
  router,
};

const reducers = combineReducers({
  theme: themeReducer,
  isAdmin: isAdminReducer,
  language: languageReducer,
  selectedCategories: selectedCategoriesReducer,
  selectedCategoriesPopup: selectedCategoriesPopupReducer,
  categoriesBeforeChange: categoriesBeforeChangeReducer,
  csrf: csrfReducer,
        currency: currencyReducer,
  jwt: jwtReducer,
  authorized: authorizedReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});
export const persistor = persistStore(store);
export type AppThunk<R = void> = ThunkAction<
  R,
  RootState,
  typeof extraArgument,
  UnknownAction
>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
