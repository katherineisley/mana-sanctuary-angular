import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UnitsIndexComponent } from './units-index/units-index.component';
import { UnitCardComponent } from './unit-card/unit-card.component';
import { HealingGuideComponent } from './healing-guide/healing-guide.component';
import { UnitPageComponent } from './unit-page/unit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UnitsIndexComponent,
    UnitCardComponent,
    HealingGuideComponent,
    UnitPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
