import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TokenService} from './token.service';
import {Router} from '@angular/router';
import {Personnage} from '../../models/personnages';

// TODO appel avec d'autre api pour tout afficher du personnage ilvl, covenant ect, titre a voir ajouter au tableau singlePersonnage et naviguer dedans avec [0] etc
// TODO afficher les monture du compte (nouvel onglet monture)
@Injectable({
  providedIn: 'root'
})
export class PersonnageService {

  url: string;
  personnagesObject: Array<Personnage> = [];
  tokenAcquisPersonnage: boolean;

  constructor(private httpClient: HttpClient, public tokenService: TokenService, private router: Router) {
  }


  appelAPI(): void{
    this.personnagesObject = []; // vide l'objet a chaque appel
    this.url = 'https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=fr_FR&access_token=' + this.tokenService.accessToken;
    this.httpClient
      .get<any>(this.url)
      .subscribe(
      (response) => {
        console.log('response : ', response);
        for (let index in response.wow_accounts[0].characters){
          this.personnagesObject.push(
            {
              id: response.wow_accounts[0].characters[index].id,
              name: response.wow_accounts[0].characters[index].name,
              gender: response.wow_accounts[0].characters[index].gender.name,
              lvl: response.wow_accounts[0].characters[index].level,
              classe: response.wow_accounts[0].characters[index].playable_class.name,
              race: response.wow_accounts[0].characters[index].playable_race.name,
              realm: response.wow_accounts[0].characters[index].realm.name,
              realmID: response.wow_accounts[0].characters[index].realm.id,
              faction: response.wow_accounts[0].characters[index].faction.name
            }
            );
          console.log('objet personnage : ', this.personnagesObject);
        }
      },
      (error) => {
        console.log('Erreur get api ! : ' , error);
      }
    );
  }

  appelAPISinglePersonnage(personnage: Personnage): void{
    this.url = 'https://eu.api.blizzard.com/profile/user/wow/protected-character/' + personnage.realmID + '-' + personnage.id + '?namespace=profile-eu&locale=fr_FR&access_token=' + this.tokenService.accessToken;
    this.httpClient
      .get<any>(this.url)
      .subscribe(
        (response) => {
          personnage.money = response.money;
          personnage.goldGained = response.protected_stats.total_gold_gained;
          personnage.goldLost = response.protected_stats.total_gold_lost;
          personnage.zone = response.position.zone.name;
          personnage.region = response.position.map.name;
          personnage.pdf = response.bind_position.zone.name;
          personnage.nbreMort = response.protected_stats.total_number_deaths;
          console.log('résultat get : ' , response);
        },
        (error) => {
          console.log('Erreur api get single perso ! : ' , error);
          this.router.navigate(['list-personnage']);
        }
      );

    this.httpClient
      .get<any>('https://eu.api.blizzard.com/profile/wow/character/' + personnage.realm.toLowerCase() + '/' + personnage.name.toLowerCase() + '/character-media?namespace=profile-eu&locale=fr_FR&access_token=' + this.tokenService.accessToken)
      .subscribe(
        (response) => {
          personnage.lienImage = response.assets[3].value;
          console.log('résultat get image : ' , response);
        },
        (error) => {
          console.log('Erreur image ! : ' , error);
        }
      );

    this.httpClient
      .get<any>('https://eu.api.blizzard.com/profile/wow/character/' + personnage.realm.toLowerCase() + '/' + personnage.name.toLowerCase() + '?namespace=profile-eu&locale=fr_FR&access_token=' + this.tokenService.accessToken)
      .subscribe(
        (response) => {
          // personnage.lienImage = response.assets[3].value;
          personnage.ilvl = response.equipped_item_level;
          personnage.specialisation = response.active_spec.name;
          personnage.hf = response.achievement_points;
          if (response.covenant_progress){
            personnage.covenant = response.covenant_progress.chosen_covenant.name;
            personnage.renom = response.covenant_progress.renown_level;
          }

          console.log('résultat get profile : ' , response);
        },
        (error) => {
          console.log('Erreur profile ! : ' , error);
        }
      );
  }

      }
