import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from '../user.service';

export const selectUserState = createFeatureSelector<IUser[]>('users');

export const selectAllUsers = createSelector(
    selectUserState,
    (users) => users
);