import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-task',
    loadChildren: () => import('./pages/create-task/create-task.module').then( m => m.CreateTaskPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'client/:id',
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./pages/task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'create-route',
    loadChildren: () => import('./pages/create-route/create-route.module').then( m => m.CreateRoutePageModule)
  },
  {
    path: 'topics',
    loadChildren: () => import('./pages/topics/topics.module').then( m => m.TopicsPageModule)
  },
  {
    path: 'topic/:id',
    loadChildren: () => import('./pages/topic/topic.module').then( m => m.TopicPageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then( m => m.EmployeesPageModule)
  },
  {
    path: 'employee/:id',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
