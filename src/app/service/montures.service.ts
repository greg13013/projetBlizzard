import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {Montures} from '../../models/montures';

@Injectable({
  providedIn: 'root'
})
export class MonturesService {
  
  montureObject: Array<Montures> = [];
  tokenAcquisMonture: boolean;

  constructor(private tokenService: TokenService, private httpClient: HttpClient) { }

  gettokenService(): TokenService {
    return this.tokenService;
  }

  settokenAcquisMonture(reponse: boolean): void {
    this.tokenAcquisMonture = reponse;
  }

  // appel api monture pour récupérer les monture et l'id
  appelAPIMonture(): void {
    this.montureObject = []; // vide l'objet a chaque appel
    this.httpClient
      .get<any>('https://eu.api.blizzard.com/profile/user/wow/collections/mounts?namespace=profile-eu&locale=fr_FR&access_token=' + this.tokenService.accessToken)
      .subscribe(
        (response) => {
          // this.monture.push(response);
          console.log('résultat get monture : ' , response);
          for (let index in response.mounts){
            // this.montureObject = new Montures(this.monture[0].all.mounts[index].mount.id, 0 , this.monture[0].all.mounts[index].mount.name );
            this.montureObject.push({id : response.mounts[index].mount.id, nomMonture : response.mounts[index].mount.name });
            // this.montureObject.nomMonture =  this.monture[0].all.mounts[index].mount.name;
            console.log('api monture', response.mounts[index].mount.id);
            this.appelAPIidMonture(this.montureObject[index]);
          }
        },
        (error) => {
          console.log('Erreur monture ! : ' , error);
        },
        () => {
          console.log('Completed');
        }
      );

  }

  // appel api pour l'id des monture requis pr le lien des image
  appelAPIidMonture(monture: Montures): void {
    this.httpClient
      .get<any>('https://eu.api.blizzard.com/data/wow/mount/' + monture.id + '?namespace=static-eu&locale=fr_FR&access_token=' + this.tokenService.accessToken)
      .subscribe(
        (response) => {
          console.log('id Monture : ' + monture.id);
          console.log('resultat appel api image monture : ', response);
          this.appelAPIlienMonture(response.creature_displays[0].key.href, monture);
        },
        (error) => {
          console.log('Erreur image appel api monture : ', error);
        },
        () => {
          console.log('appel image api monture complete');
        }
      );
  }

  // appel api pour récupérer lee lien des image des montures
appelAPIlienMonture(urlImage: string, monture: Montures): void {
    this.httpClient
      .get<any>(urlImage + '&access_token=' + this.tokenService.accessToken)
      .subscribe(
        (response) => {
          monture.lienImage = response.assets[0].value;
          console.log('monture objet' , this.montureObject);
          console.log('monture id dans lien:' + monture.id);
          console.log('resultat appel api LIEN image monture : ', response);
        },
        (error) => {
          console.log('Erreur LIEN image appel api monture : ', error);
        },
        () => {
          console.log('appel LIEN image api monture complete');
        }
      );
  }

}
