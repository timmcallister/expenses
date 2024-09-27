import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from  './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'expenses', component: ExpenseListComponent },
    { path: 'expense/new', component: ExpenseFormComponent },
    { path: 'expense/edit/:id', component: ExpenseFormComponent }
];
