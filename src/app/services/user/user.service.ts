import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addAllUsers, addUser } from './ngrx/user.actions';

export interface IUser {
  name: string,
  surname: string,
  email: string,
  id: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonUrl = './assets/users.json';

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ users: IUser[] }>
  ) { }

  getAllUsersFromJSON(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.jsonUrl);
  }

  saveAllUsersOnNgrx(): void {
    this.getAllUsersFromJSON().subscribe({
      next: (users: IUser[]) => {
        if (users && users.length > 0) this.store.dispatch(addAllUsers({ users }))
      },
      error: (err) => {
        console.error('Error to charge users:', err);
      }
    });
  }
}
