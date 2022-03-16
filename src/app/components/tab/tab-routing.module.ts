import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('../../pages/home3/home3.module').then( m => m.Home3PageModule)
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
