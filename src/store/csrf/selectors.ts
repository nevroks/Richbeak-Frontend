import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

const csrfSelector:(state:RootState)=>string|undefined = state => state.csrf.csrf;

export const memoizedCsrfSelector = createSelector(
    csrfSelector,
    csrf => csrf===csrf
);