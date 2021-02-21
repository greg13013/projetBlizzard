import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TftService} from '../service/tft.service';

@Component({
  selector: 'app-tft',
  templateUrl: './tft.component.html',
  styleUrls: ['./tft.component.css']
})
export class TftComponent implements OnInit {

  constructor(public tftService: TftService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    document.getElementById('envoyer').setAttribute('disabled', 'true');
    console.log(form.value);
    this.tftService.appelAPIByNom(form.value['nom']);
  }

  Desactiver(){
      setTimeout(() =>{
        console.log('ici');
        document.getElementById('envoyer').removeAttribute('disabled');
      },3000);

  }


}
