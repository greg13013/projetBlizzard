import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TftService} from '../service/tft.service';

@Component({
  selector: 'app-tft-detail',
  templateUrl: './tft-detail.component.html',
  styleUrls: ['./tft-detail.component.css']
})
export class TftDetailComponent implements OnInit {
  numMatch: string;
  nom: string;
  @Input() idMatch: string;

  constructor(private route: ActivatedRoute, public tftService: TftService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('item : ' , this.idMatch);
    if (this.route.snapshot.params['name']) {
      this.numMatch = this.route.snapshot.params['name'];
      console.log(this.numMatch);
      this.tftService.appelAPIDetailMatch(this.numMatch, this.tftService.tft);
    }
    else if (this.idMatch){
      this.tftService.appelAPIDetailMatch(this.idMatch, this.tftService.tft);
    }
    else {
      this.router.navigate(['tft']);
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


