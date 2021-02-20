import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListPersonnageComponent } from './list-personnage/list-personnage.component';
import {HttpClientModule} from '@angular/common/http';
import {PersonnageService} from './service/personnage.service';
import {TokenService} from './service/token.service';
import { FourohfourComponent } from './fourohfour/fourohfour.component';
import { SinglePersonnageComponent } from './single-personnage/single-personnage.component';
import { MontureComponent } from './monture/monture.component';
import {MonturesService} from './service/montures.service';
import { TftComponent } from './tft/tft.component';
import {FormsModule} from '@angular/forms';
import { TftDetailComponent } from './tft-detail/tft-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TftService} from './service/tft.service';

const appRoute: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'list-personnage', component: ListPersonnageComponent },
  { path: 'list-personnage/:id', component: SinglePersonnageComponent },
  { path: 'monture', component: MontureComponent },
  { path: 'tft', component: TftComponent},
  { path: 'tft/:name', component: TftDetailComponent },
  { path: '', component: AccueilComponent },
  { path: 'not-found', component: FourohfourComponent },
  { path: '**', redirectTo: 'not-found' }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    ListPersonnageComponent,
    FourohfourComponent,
    SinglePersonnageComponent,
    MontureComponent,
    TftComponent,
    TftDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    NgbModule,
    NgxSpinnerModule
  ],
  providers: [
    PersonnageService,
    TokenService,
    MonturesService,
    TftService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
