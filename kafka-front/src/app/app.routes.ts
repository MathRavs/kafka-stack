import { Routes } from '@angular/router';
import { App } from './app';
import { isAuthenticatedGuard } from './guards/authenticated.guard';
import { isUnauthenticatedGuard } from './guards/unauthenticated.guard';
import { LoginPage } from './pages/login/login.component';
import { COMMON_ROUTES } from '../constants/routes/common';
import { AUTH_ROUTES } from '../constants/routes/auth';
import { HomePage } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: App, 
    children: [
      { path: AUTH_ROUTES.login, component: LoginPage, canActivate: [isUnauthenticatedGuard] },
      { path: COMMON_ROUTES.home, component: HomePage, canActivate: [isAuthenticatedGuard] },
    ]
  }
];
