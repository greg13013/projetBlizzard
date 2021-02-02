import { Component, OnInit } from '@angular/core';
import { PersonnageService } from '../service/personnage.service';


@Component({
  selector: 'app-list-personnage',
  templateUrl: './list-personnage.component.html',
  styleUrls: ['./list-personnage.component.css']
})
export class ListPersonnageComponent implements OnInit {
  color: string;

  constructor(public personnageService: PersonnageService) {

  }

  ngOnInit(): void {
    this.personnageService.tokenAcquisPersonnage = false;
    if (this.personnageService.tokenService.accessToken){
      console.log('token : ' + this.personnageService.tokenService.accessToken);
      this.personnageService.appelAPI();
      this.personnageService.tokenAcquisPersonnage = true;
    }
  }

  getFaction(faction: string): string{
    if (faction === 'Alliance'){
      this.color = 'blue';
    }
    else {
      this.color = 'red';
    }
    return this.color;
  }



}
