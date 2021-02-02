import { Component, OnInit } from '@angular/core';
import {TokenService} from '../service/token.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  url: string;

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.getToken();
    console.log('accueil component, access token : ' + this.tokenService.accessToken);

    console.log('accueil component, token acquis :' + this.tokenService.tokenAcquis);
  }

}
