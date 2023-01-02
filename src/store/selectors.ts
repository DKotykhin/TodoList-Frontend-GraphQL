import type { RootState } from './store';

export const selectUser = (state: RootState) => state.user;

export const selectQuery = (state: RootState) => state.query;
