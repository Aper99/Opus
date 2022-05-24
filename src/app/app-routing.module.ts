import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard],
  },
  {
    path: 'create-task/:id',
    loadChildren: () => import('./pages/create-task/create-task.module').then( m => m.CreateTaskPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'client/:id',
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'task/:id',
    loadChildren: () => import('./pages/task/task.module').then( m => m.TaskPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./components/tab/tab.module').then( m => m.TabPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-route/:id',
    loadChildren: () => import('./pages/create-route/create-route.module').then( m => m.CreateRoutePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'topics',
    loadChildren: () => import('./pages/topics/topics.module').then( m => m.TopicsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'topic/:id',
    loadChildren: () => import('./pages/topic/topic.module').then( m => m.TopicPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then( m => m.EmployeesPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'employee/:id',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule),
    canLoad: [AuthGuard],
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
