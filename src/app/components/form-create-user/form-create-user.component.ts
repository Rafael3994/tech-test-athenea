import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addUser } from '@services/user/ngrx/user.actions';
import { selectAllUsers } from '@services/user/ngrx/user.selector';
import { IUser } from '@services/user/user.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dni = control.value;
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;

    if (dni && !dniRegex.test(dni)) {
      return { invalidDni: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-form-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './form-create-user.component.html',
  styleUrl: './form-create-user.component.scss'
})
export class FormCreateUserComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  form: FormGroup;

  users$: Observable<IUser[]> = of();

  constructor(private fb: FormBuilder, private store: Store<{ users: IUser }>, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', [Validators.required, dniValidator()]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.users$ = this.store.select(selectAllUsers);
  }

  onSubmit() {
    if (this.form.valid) {
      const { name, surname, dni, email } = this.form.value

      this.users$.subscribe(users => {
        if (users.find(user => user.id === dni)) {
          this.openSnackBar('User creation failed ❌')
          return
        }

        const newUser: IUser = {
          name: name.trim(),
          surname: surname.trim(),
          email: email.trim(),
          id: dni.trim(),
        }

        this.store.dispatch(addUser({ user: newUser }));
        this.openSnackBar('User created ✅');
      });
    }
  }

  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
