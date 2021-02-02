import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tfts} from '../../models/tft';
import {TftsDetail} from '../../models/tftDetail';

@Injectable({
  providedIn: 'root'
})
export class TftService {
  apiKey: string;
  tft: Tfts;
  fin: boolean; // fin requete

  constructor(private httpClient: HttpClient) {
    this.apiKey = 'RGAPI-e373b27d-6aa2-42b0-9c58-6c24547032e4';
  }

  appelAPIByNom(nom: string){
    this.fin = false;
    this.tft = new Tfts();
    let Headers = new HttpHeaders();
    Headers = Headers.append('Access-Control-Allow-Origin', '*');
    Headers = Headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    this.httpClient
      .get<any>('https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/' + nom + '?api_key=' + this.apiKey, {headers: Headers})
      .subscribe(
        (response) => {
          this.tft.puuid = response.puuid;
          console.log('resultat appel api', this.tft);
          this.appelAPIMatch(this.tft);
        },
        (error) => {
          console.log('Erreur api ! : ' , error);
        }
      );
  }

  appelAPIByPuuid(puuid: string, tft: TftsDetail){
    this.httpClient
      .get<any>('https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/' + puuid + '?api_key=' + this.apiKey)
      .subscribe(
        (response) => {
          console.log('resultat appel Puuid', response);
          tft.nom = response.name;
          console.log('participant : ', this.tft.participant);
        },
        (error) => {
          console.log('Erreur api ! : ' , error);
        }, () =>    {
          this.fin = true;
          console.log('complete');
    }
      );
  }

  appelAPIMatch(tft: Tfts){
    tft.match = [];
    this.httpClient
      .get<any>('https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/' + tft.puuid + '/ids?count=15&api_key=' + this.apiKey)
      .subscribe(
        (response) => {
          console.log('resultat appel match', response);
          for (let index in response){
            tft.match.push(
              {
                idMatch: response[index]
              })
            ;
            this.httpClient
              .get<any>('https://europe.api.riotgames.com/tft/match/v1/matches/' + response[index] + '?api_key=' + this.apiKey)
              .subscribe(
                (response2) => {
                 tft.match[index].date = response2.info.game_datetime;
                },
                (error) => {
                  console.log('Erreur datetime ! : ' , error);

                },
                () => {  }
              );
          }
          console.log('la apres 2eme requete : ', tft.match);
        },
        (error) => {
          console.log('Erreur match ! : ' , error);
        },
        () => {
          this.fin = true;
        }
      );
  }

  appelAPIDetailMatch(num: string, tft: Tfts){
    this.fin = false;
    this.tft.participant = [];
    this.httpClient
      .get<any>('https://europe.api.riotgames.com/tft/match/v1/matches/' + num + '?api_key=' + this.apiKey)
      .subscribe(
        (response) => {
          tft.date = response.info.game_datetime;
          console.log('resultat appel match', response);
          for (let index in response.info.participants){
            tft.participant.push(
              {
                puuid: response.info.participants[index].puuid,
                placement: response.info.participants[index].placement,
                kill: response.info.participants[index].players_eliminated,
                tempEliminer: Math.floor(response.info.participants[index].time_eliminated / 60).toString() + ':' + response.info.participants[index].time_eliminated % 60 , // transforme milliseconde en minute et seconde
                trait: response.info.participants[index].traits.sort((a, b) => b.num_units - a.num_units), // tri par num_units
                units: response.info.participants[index].units,
                round: this.getRound(response.info.participants[index].last_round),
                gold: response.info.participants[index].gold_left
              })
            ;
            console.log('nbre : ', response.info.participants[index].puuid);
            this.appelAPIByPuuid(response.info.participants[index].puuid, tft.participant[index]);
          }
        },
        (error) => {
          console.log('Erreur detail ! : ' , error);

        },
        () => {
          tft.participant.sort((a, b) => a.placement - b.placement); // tri placement
        }
      );
  }

  getRound(nbre: number){
   return (((nbre - 4) / 7) + 2).toString().substring(0, (((nbre - 4) / 7) + 2).toString().indexOf('.')) + '.' + (nbre - 4) % 7; // affichage round
  }
}
