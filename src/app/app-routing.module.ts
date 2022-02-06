import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { HomeComponent } from './component/home/home.component';
import { PivotsComponent } from './component/pivots/pivots.component';
import { SettingsComponent } from './component/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pivots', component: PivotsComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
