import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AreasComponent } from './pages/areas/areas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redirigir a 'users' por defecto
      { path: 'users', component: UsersComponent },
      { path: 'areas', component: AreasComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  { path: '**', redirectTo: 'users' }, // Redirige a la página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
