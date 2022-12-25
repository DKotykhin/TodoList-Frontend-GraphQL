import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQueryData } from "types/taskTypes";

interface IQuerySlise {
    query: IQueryData;
}
const initialState: IQuerySlise = {
    query: {
        limit: '6',
        page: 1,
        tabKey: 0,
        sortField: 'createdAt',
        sortOrder: -1,
        search: ''
    }
};

const QuerySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<IQuerySlise>) => {
            state.query = action.payload.query;
        },
    },
});

const { actions, reducer } = QuerySlice;

export default reducer;
export const { setQuery } = actions;