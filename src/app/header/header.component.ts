import { Component, OnInit } from '@angular/core';
import {TokenService} from '../service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  urlAuthorize: string;

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
    console.log(window.location.origin);
    this.urlAuthorize = 'https://eu.battle.net/oauth/authorize?response_type=code&client_id=' + this.tokenService.clientId + '&scope=wow.profile%20sc2.profile&redirect_uri=' + window.location.origin + '/accueil';
  }

}
