
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsIndexComponent } from './units-index/units-index.component';
import { HealingComponent } from './healing/healing.component';
import { HealingGuideComponent } from './healing-guide/healing-guide.component';
import { HealingTeamsComponent } from './healing-teams/healing-teams.component';
import { HealingCalculatorComponent } from './healing-calculator/healing-calculator.component';
import { UnitPageComponent } from './unit-page/unit-page.component';
import { HomeComponent } from './home/home.component';
import { GuidesComponent } from './guides/guides.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'units-index', component: UnitsIndexComponent },
  { path: 'healing', component: HealingComponent },
  { path: 'healing/guide', component: HealingGuideComponent },
  { path: 'healing/teams', component: HealingTeamsComponent },
  { path: 'healing/calculator', component: HealingCalculatorComponent }, 
  { path: 'unit-page/:name', component: UnitPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'guides', component: GuidesComponent },
  { path: 'glossary', component: GlossaryComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', component: PageNotFoundComponent }, // keep this as the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
