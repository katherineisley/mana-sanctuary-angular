import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsIndexComponent } from './units-index/units-index.component';
import { HealingGuideComponent } from './healing-guide/healing-guide.component';

const routes: Routes = [
  { path: 'unitsindex', component: UnitsIndexComponent },
  { path: 'healingguide', component: HealingGuideComponent },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
