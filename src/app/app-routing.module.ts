
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HealingComponent } from './healing/healing.component';
import { HealingGuideComponent } from './healing-guide/healing-guide.component';
import { HealingTeamsComponent } from './healing-teams/healing-teams.component';
import { HealingCalculatorComponent } from './healing-calculator/healing-calculator.component';
import { GuidesComponent } from './guides/guides.component';
import { UnitsIndexComponent } from './units-index/units-index.component';
import { UnitPageComponent } from './unit-page/unit-page.component';
import { MatricesIndexComponent } from './matrices-index/matrices-index.component';
import { RelicsIndexComponent } from './relics-index/relics-index.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'healing', component: HealingComponent },
  { path: 'healing/guide', component: HealingGuideComponent },
  { path: 'healing/teams', component: HealingTeamsComponent },
  { path: 'healing/calculator', component: HealingCalculatorComponent },
  { path: 'guides', component: GuidesComponent },
  { path: 'units-index', component: UnitsIndexComponent },
  { path: 'unit-page/:name', component: UnitPageComponent },
  { path: 'matrices-index', component: MatricesIndexComponent },
  { path: 'relics-index', component: RelicsIndexComponent },
  { path: 'glossary', component: GlossaryComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', component: PageNotFoundComponent }, // keep this as the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
