import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-other-card',
  templateUrl: './other-card.component.html',
  styleUrls: ['./other-card.component.css']
})
export class OtherCardComponent implements OnInit {

  @Input() elemento = {
    name: null,
    superType: null,
    rules: null,
    setId: null,
    set: null,
    setImg: null,
    number: null,
    artist: null,
    rarity: null,
    cardImg: null,
    legalities: null,
  };


  constructor() { }

  ngOnInit(): void {
    console.log(this.elemento);
  }

}
