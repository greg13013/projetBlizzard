import {Component, OnInit} from '@angular/core';
import {MonturesService} from '../service/montures.service';

@Component({
  selector: 'app-monture',
  templateUrl: './monture.component.html',
  styleUrls: ['./monture.component.css']
})
export class MontureComponent implements OnInit {


  constructor(public montureService: MonturesService) {
  }

  ngOnInit(): void {
    this.tokentAcquis();
  }

  tokentAcquis(): void{
    this.montureService.tokenAcquisMonture = false;
    if (this.montureService.gettokenService().accessToken){
      this.montureService.settokenAcquisMonture(true);

      console.log('token : ' + this.montureService.gettokenService().accessToken);
      this.montureService.appelAPIMonture();

      console.log('monture component: ', this.montureService.montureObject);
    }
  }
}
