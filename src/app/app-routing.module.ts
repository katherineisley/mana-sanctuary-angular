
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
import { AnchorPageComponent } from './anchor-page/anchor-page.component';
import { JointOperationComponent } from './joint-operation/joint-operation.component';
import { DpsDashboardComponent } from './dps-dashboard/dps-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, resolve: {data: DataResolver} },
  // { path: 'healing', component: HealingComponent },
  // { path: 'healing/guide', component: HealingGuideComponent },
  // { path: 'healing/teams', component: HealingTeamsComponent },
  // { path: 'healing/calculator', component: HealingCalculatorComponent, resolve: {data: DataResolver} },
  // { path: 'guides', component: GuidesComponent },
  { path: 'dps', component: DpsDashboardComponent,resolve: {data: DataResolver}  },
  { path: 'jointop', component: JointOperationComponent },
  { path: 'anchors', component: AnchorPageComponent },
  { path: 'index/:server', component: IndexComponent },
  { path: 'index/:server/weapons', component: UnitsIndexComponent, resolve: {data: DataResolver} },
  { path: 'index/:server/weapons/:name', component: UnitPageComponent, resolve: {data: DataResolver} },
  { path: 'index/:server/matrices', component: MatricesIndexComponent, resolve: {data: DataResolver} },
  { path: 'index/:server/matrices/:name', component: MatrixPageComponent, resolve: {data: DataResolver} },
  { path: 'index/:server/relics', component: RelicsIndexComponent, resolve: {data: DataResolver} },
  { path: 'index/:server/relics/:name', component: RelicPageComponent, resolve: {data: DataResolver} },
  { path: 'glossary', component: GlossaryComponent, resolve: {data: DataResolver} },
  { path: 'about-us', component: AboutUsComponent, resolve: {data: DataResolver} },
  { path: '**', component: PageNotFoundComponent }, // keep this as the last route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
