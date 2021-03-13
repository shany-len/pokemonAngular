import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  @Input() elemento = {
    name:null,
    superType:null,
    hp:null,
    desc:null,
    type:null,
    imgType:null,
    attacks:null,
    evolves:null,
    retreatCost:null,
    setId: null,
    set:null,
    setImg: null,
    number:null,
    artist:null,
    rarity:null,
    pokedex:null,
    cardImg:null,
    weaknesses:null,
    resistances:null
  };

  busquedaInput: string = '';
  tipoInput: string = '';
  condicion: boolean = false;
  showCard: boolean = true;
  showBusqueda: boolean = true;


  @Input() isSet:boolean;

  valor: object = {
    "width.px":"0",
  };



  constructor() { }

  calcularValor(){
    console.log(this.elemento.attacks[0].costo);
    if((this.elemento.attacks).length==1){
      let a = this.elemento.attacks[0].costo.length;
      let b= (a*28)+24;
      this.valor = {
        "width.px":b,
      }
    }
    else{
      let max = 0;
      for(let i =0; i<(this.elemento.attacks).length; i++){
        if(max<this.elemento.attacks[i].costo.length){
          max=this.elemento.attacks[i].costo.length;
        }        
      }
      let t = (max*28)+24;
      this.valor = {
        "width.px":t,
      }
    }
  }

  ngOnInit(): void {
    console.log(this.elemento);
    this.calcularValor();
  }

  click(){
    console.log(this.elemento.setId);
    this.busquedaInput = '';
    this.tipoInput = '';
    this.busquedaInput = this.elemento.setId;
    this.tipoInput="set";
    this.condicion = true;
    this.showCard = true;
    this.showBusqueda = false;
  }

}
