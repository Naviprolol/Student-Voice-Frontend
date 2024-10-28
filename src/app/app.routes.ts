import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SubjectsComponent } from './components/subjects/subjects.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: '', redirectTo: '/subjects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
