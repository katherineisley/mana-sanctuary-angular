
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsIndexComponent } from './units-index/units-index.component';
import { HealingGuideComponent } from './healing-guide/healing-guide.component';
import { UnitPageComponent } from './unit-page/unit-page.component';
import { HomeComponent } from './home/home.component';
import { GuidesComponent } from './guides/guides.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'units-index', component: UnitsIndexComponent },
  { path: 'healing-guide', component: HealingGuideComponent },  
  { path: 'unit-page', component: UnitPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'guides', component: GuidesComponent },
  { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
