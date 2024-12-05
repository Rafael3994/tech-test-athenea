import { createReducer, on } from "@ngrx/store";
import { IUser } from "../user.service";
import { addAllUsers, addUser } from "./user.actions";

export const initialState: IUser[] = [];

export const userReducer = createReducer(
    initialState,
    on(addAllUsers, (state, { users }) => {
        console.log([...state, ...users]);
        return [...state, ...users]
    }),
    on(addUser, (state, { user }) => {
        return [...state, user]
    }),
);