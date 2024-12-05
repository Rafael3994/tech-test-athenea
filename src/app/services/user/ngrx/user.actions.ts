import { createAction, props } from '@ngrx/store';
import { IUser } from '../user.service';

export const addAllUsers = createAction('[User] Add All Users', props<{ users: IUser[] }>());
export const addUser = createAction('[User] Add', props<{ user: IUser }>());