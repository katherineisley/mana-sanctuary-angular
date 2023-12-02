
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsIndexComponent } from './units-index/units-index.component';
import { HealingGuideComponent } from './healing-guide/healing-guide.component';
import { UnitPageComponent } from './unit-page/unit-page.component';
import { HomeComponent } from './home/home.component';
import { GuidesComponent } from './guides/guides.component';

const routes: Routes = [
  { path: 'unitsindex', component: UnitsIndexComponent },
  { path: 'healingguide', component: HealingGuideComponent },  
  { path: 'unitpage', component: UnitPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'guides', component: GuidesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
