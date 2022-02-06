import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavigationMenuComponent } from './component/navigation-menu/navigation-menu.component';
import { PivotsComponent } from './component/pivots/pivots.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AboutComponent } from './component/about/about.component';
import { BidAskComponent } from './component/bid-ask/bid-ask.component';
import { PriceDifferenceComponent } from './component/price-difference/price-difference.component';
import { PivotTableComponent } from './component/pivot-table/pivot-table.component';
import { PivotListComponent } from './component/pivot-list/pivot-list.component';
import { TruthyPipe } from './pipe/truthy.pipe';
import { ActiveAlertComponent } from './component/active-alert/active-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationMenuComponent,
    PivotsComponent,
    SettingsComponent,
    AboutComponent,
    BidAskComponent,
    PriceDifferenceComponent,
    PivotTableComponent,
    PivotListComponent,
    TruthyPipe,
    ActiveAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
