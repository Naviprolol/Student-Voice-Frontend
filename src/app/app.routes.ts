import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PairsComponent } from './components/pairs/pairs.component';
import { TestingComponentsComponent } from './shared/testing-components/testing-components.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { PairDetailsComponent } from './components/pair-details/pair-details.component';
import { PairVisitListComponent } from './components/pair-visit-list/pair-visit-list.component';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { CreatePairComponent } from './components/create-pair/create-pair.component';
import { QrFilledComponent } from './components/qr-codes/qr-filled/qr-filled.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', canActivate: [AuthGuard], component: MainPageComponent },
  { path: 'subjects', canActivate: [AuthGuard], component: SubjectsComponent },
  { path: 'pairs', canActivate: [AuthGuard], component: PairsComponent },
  { path: 'testing', canActivate: [AuthGuard], component: TestingComponentsComponent },
  { path: 'subject/:id', canActivate: [AuthGuard], component: SubjectDetailsComponent },
  { path: 'pair/:id', canActivate: [AuthGuard], component: PairDetailsComponent },
  { path: 'pair/:id/visit-list', canActivate: [AuthGuard], component: PairVisitListComponent },
  { path: 'schedule', canActivate: [AuthGuard], component: TeacherScheduleComponent },
  { path: 'create-subject', canActivate: [AuthGuard], component: CreateSubjectComponent },
  { path: 'create-pair', canActivate: [AuthGuard], component: CreatePairComponent },
  { path: 'edit/subject/:id', canActivate: [AuthGuard], component: CreateSubjectComponent },
  { path: 'edit/pair/:id', canActivate: [AuthGuard], component: CreatePairComponent },
  { path: 'qr', canActivate: [AuthGuard], component: QrFilledComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
