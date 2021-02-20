import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  url: string;
  accessToken: string;
  tokenAcquis: boolean;
  clientId: string;
  clientSecret: string;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {
    this.tokenAcquis = false;
    //  this.accessToken = 'USKo71du47ju5ug4eGBaBUy46ekdZMLLFv';
     this.clientId = '0b801149a6da473eb9a837f770310c80';
     this.clientSecret = 'R8Pwnnjfwf1UmytXjJlevV9z06Jk3YUb';
  }

  getToken(): void{
    console.log('debut get token : ' + this.url);
    if (this.url == null) {
      this.route.queryParams.subscribe(
        params => {
          this.url = JSON.stringify(params['code']);
          console.log('dans lurl : ' + this.url);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.url) {
      this.url = this.url.replace('"', '');
      this.url = this.url.replace('"', '');
      const basicAuth = this.clientId + ':' + this.clientSecret;
      let Headers = new HttpHeaders();
      Headers = Headers.append('Access-Control-Allow-Origin', '*');
      Headers = Headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));
      console.log('token service, url : ' + this.url);
      console.log('https://us.battle.net/oauth/token?redirect_uri=http://localhost:4200/accueil&scope=wow.profile&grant_type=authorization_code&code=' + this.url);
      this.httpClient
        .post<any>('https://us.battle.net/oauth/token?redirect_uri=http://localhost:4200/accueil&scope=wow.profile&grant_type=authorization_code&code=' + this.url, null, { headers: Headers })
        .subscribe(
          (response) => {
            console.log('requete post token service: ' , response); //afficher objet dans console log(string, objet)
            this.accessToken = response.access_token;
            this.tokenAcquis = true;
            this.router.navigate(['/accueil']);
          },
          (error) => {
            console.log('Erreur ! : ' , error);
          }
        );
    }
}
}
