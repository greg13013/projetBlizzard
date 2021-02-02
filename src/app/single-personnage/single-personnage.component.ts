import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonnageService} from '../service/personnage.service';

@Component({
  selector: 'app-single-personnage',
  templateUrl: './single-personnage.component.html',
  styleUrls: ['./single-personnage.component.css']
})
export class SinglePersonnageComponent implements OnInit, OnDestroy {

  index: number;


  constructor(private route: ActivatedRoute, public personnageService: PersonnageService, private router: Router) { }

  ngOnInit(): void {
    if (this.personnageService.tokenAcquisPersonnage === true) {
    this.index = this.route.snapshot.params['id'];
    this.personnageService.appelAPISinglePersonnage(this.personnageService.personnagesObject[this.index]);

    console.log('single component, resultat post single', this.personnageService.personnagesObject[this.index]);
    }
    else {
      this.router.navigate(['list-personnage']);
    }
  }

  ngOnDestroy(): void {
  }

}
