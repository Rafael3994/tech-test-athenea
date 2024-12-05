import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '@services/user/ngrx/user.selector';
import { IUser } from '@services/user/user.service';
import { Observable, of } from 'rxjs';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [CommonModule, TableListComponent],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent {
  title: string = 'User List';
  users$: Observable<IUser[]> = of();

  constructor(private store: Store<{ users: IUser }>) {
    this.users$ = this.store.select(selectAllUsers);
  }
}
