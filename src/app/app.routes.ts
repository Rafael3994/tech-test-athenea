import { Routes } from '@angular/router';
import { UserListPageComponent } from '@pages/user-list-page/user-list-page.component';
import { CreateUserPageComponent } from '@pages/create-user-page/create-user-page.component';
import { DetailsUserPageComponent } from '@pages/details-user-page/details-user-page.component';

export const routes: Routes = [
    { path: '', component: UserListPageComponent },
    { path: 'create-user', component: CreateUserPageComponent },
    { path: 'user-details', component: DetailsUserPageComponent },
];