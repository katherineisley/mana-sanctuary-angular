
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataResolver } from './shared/resolvers/data.resolver';

import { HomeComponent } from './home/home.component';
import { HealingComponent } from './healing/healing.component';
import { HealingGuideComponent } from './healing-guide/healing-guide.component';
import { HealingTeamsComponent } from './healing-teams/healing-teams.component';
import { HealingCalculatorComponent } from './healing-calculator/healing-calculator.component';
import { GuidesComponent } from './guides/guides.component';
import { IndexComponent } from './index/index.component';
import { UnitsIndexComponent } from './units-index/units-index.component';
import { UnitPageComponent } from './unit-page/unit-page.component';
import { MatricesIndexComponent } from './matrices-index/matrices-index.component';
import { MatrixPageComponent } from './matrix-page/matrix-page.component';
import { RelicsIndexComponent } from './relics-index/relics-index.component';
import { RelicPageComponent } from './relic-page/relic-page.component';
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
  { path: 'index', component: IndexComponent },
  { path: 'index/units-index', component: UnitsIndexComponent },
  { path: 'unit-page/:name', component: UnitPageComponent },
  { path: 'index/matrices-index', component: MatricesIndexComponent },
  { path: 'matrix-page/:name', component: MatrixPageComponent },
  { path: 'index/relics-index', component: RelicsIndexComponent },
  { path: 'relic-page/:name', component: RelicPageComponent },
  { path: 'glossary', component: GlossaryComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', component: PageNotFoundComponent }, // keep this as the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
