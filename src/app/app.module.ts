import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
// Services
import { PitchesService } from './shared/services/pitches.service';
// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchBarComponent } from './components/search/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
// Directives
import { OnlyNumbersDirective } from './shared/directives/only-numbers.directive';
// Pipes
import { FormatDatePipe } from './shared/pipes/format-date.pipe';
import { GboToEuroPipe } from './shared/pipes/gbp-to-euro.pipe';
import { CalculateDurationPipe } from './shared/pipes/calculate-duration.pipe';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBarComponent,
    SearchResultsComponent,
    OnlyNumbersDirective,
    FormatDatePipe,
    GboToEuroPipe,
    CalculateDurationPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    PitchesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
