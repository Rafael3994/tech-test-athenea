import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IUser } from '@services/user/user.service';
import { CardUserComponent } from 'src/app/components/card-user/card-user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details-user-page',
  standalone: true,
  imports: [CommonModule, CardUserComponent, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './details-user-page.component.html',
  styleUrl: './details-user-page.component.scss'
})
export class DetailsUserPageComponent {
  title: string = 'User Details';
  user: IUser = {} as IUser;

  ngOnInit(): void {
    this.user = history.state;
  }
}
