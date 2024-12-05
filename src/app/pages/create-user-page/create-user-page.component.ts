import { Component } from '@angular/core';
import { FormCreateUserComponent } from 'src/app/components/form-create-user/form-create-user.component';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [FormCreateUserComponent],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.scss'
})
export class CreateUserPageComponent {
  title: string = 'Create User';
}
