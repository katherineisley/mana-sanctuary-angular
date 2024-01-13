import { NgModule } from '@angular/core';
import { NgxSplideModule } from 'ngx-splide';
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
import { HomeComponent } from './home/home.component';
import { GuidesComponent } from './guides/guides.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsCardComponent } from './about-us-card/about-us-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HealingComponent } from './healing/healing.component';
import { DynamicContentHeightDirective } from './dynamic-content-height.directive';
import { HealingTeamsComponent } from './healing-teams/healing-teams.component';
import { HealingCalculatorComponent } from './healing-calculator/healing-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UnitsIndexComponent,
    UnitCardComponent,
    HealingGuideComponent,
    UnitPageComponent,
    HomeComponent,
    GuidesComponent,
    AboutUsComponent,
    AboutUsCardComponent,
    PageNotFoundComponent,
    HealingComponent,
    DynamicContentHeightDirective,
    HealingTeamsComponent,
    HealingCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSplideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
