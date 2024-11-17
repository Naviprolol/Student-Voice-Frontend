import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PairsComponent } from './components/pairs/pairs.component';
import { TestingComponentsComponent } from './shared/testing-components/testing-components.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', canActivate: [AuthGuard], component: MainPageComponent },
  { path: 'subjects', canActivate: [AuthGuard], component: SubjectsComponent },
  { path: 'pairs', canActivate: [AuthGuard], component: PairsComponent },
  { path: 'testing', canActivate: [AuthGuard], component: TestingComponentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
