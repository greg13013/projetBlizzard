import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TftService} from '../service/tft.service';
import championJson from '../../assets/tft/json/champions.json';
import itemJson from '../../assets/tft/json/items.json';
import traitsJson from '../../assets/tft/json/traits.json';

@Component({
  selector: 'app-tft-detail',
  templateUrl: './tft-detail.component.html',
  styleUrls: ['./tft-detail.component.css']
})
export class TftDetailComponent implements OnInit {
  numMatch: string;
  nom: string;
  @Input() idMatch: string;
  championJson: any;
  itemJson: any;
  traitsJson: any;

  constructor(private route: ActivatedRoute, public tftService: TftService, private router: Router) {
    this.championJson = championJson;
    this.itemJson = itemJson;
    this.traitsJson = traitsJson;
  }

  ngOnInit(): void {
    console.log('item : ' , this.idMatch);
    if (this.route.snapshot.params['name'] && this.tftService.tft) {
      this.numMatch = this.route.snapshot.params['name'];
      console.log('route params : ' + this.numMatch);
      this.tftService.appelAPIDetailMatch(this.numMatch, this.tftService.tft);
    }
    else if (this.idMatch && this.tftService.tft){
      this.tftService.appelAPIDetailMatch(this.idMatch, this.tftService.tft);
    }
    else {
      this.router.navigate(['tft']);
    }
  }


  // lecture fichier json champion et return nom du champion sans TFT_
  getNameChampions(nom: string){
    for (let index in this.championJson){
      if (this.championJson[index].championId === nom){
        return this.championJson[index].name;
      }
    }
  }

  getNomItem(item: number){
    for (let index in this.itemJson){
      if (this.itemJson[index].id === item){
        return this.itemJson[index].name;
      }
    }
  }

  getImageItem(item: number){
    for (let index in this.itemJson){
      if (this.itemJson[index].id === item){
        return this.itemJson[index].id;
      }
    }
  }

  getRareter(nbre: number){
    if (nbre === 0) {
      return 'grey';
    }
    else if (nbre === 1){
      return 'green';
    }
    else if (nbre === 2){
      return 'blue';
    }
    else if (nbre === 3){
      return 'violet';
    }
    else if (nbre === 4){
      return 'orange';
    }
  }
}


