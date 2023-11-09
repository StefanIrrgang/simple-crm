import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { LeadsComponent } from './leads/leads.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { CalendarComponent } from './calendar/calendar.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { EmailsComponent } from './emails/emails.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'organizations', component: OrganizationsComponent},
  {path: 'leads', component: LeadsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'emails', component: EmailsComponent},
  {path: 'opportunities', component: OpportunitiesComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'tasks', component: TasksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
