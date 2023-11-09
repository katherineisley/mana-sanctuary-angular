import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsIndexComponent } from './units-index/units-index.component';

const routes: Routes = [
  { path: 'unitsindex', component: UnitsIndexComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
