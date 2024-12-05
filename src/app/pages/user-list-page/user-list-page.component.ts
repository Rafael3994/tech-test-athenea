import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '@services/user/ngrx/user.selector';
import { IUser, UserService } from '@services/user/user.service';
import { Observable, of } from 'rxjs';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [CommonModule, TableListComponent, MatButtonModule],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent {
  title: string = 'User List';
  users$: Observable<IUser[]> = of();

  constructor(private store: Store<{ users: IUser }>, private userService: UserService) {
    this.users$ = this.store.select(selectAllUsers);
  }

  handleGeneratePDFUsers(): void {
    this.users$.subscribe(users => this.userService.generatePDF(users, this.title, ['Name', 'Surname', 'Email', 'DNI']));
  }

  handleGenerateExcelUsers(): void {
  }
}
