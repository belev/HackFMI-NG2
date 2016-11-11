import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    canActivate: [AuthService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);