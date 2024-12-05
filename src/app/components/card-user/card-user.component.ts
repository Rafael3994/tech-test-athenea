import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '@services/user/user.service';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.scss'
})
export class CardUserComponent {

  @Input() user!: IUser;

}
