import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { PagerService } from '../service/index';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  @Input() busquedaQuery: string;
  @Input() condicion: boolean;
  @Input() showCard: boolean;
  @Input() tipoQuery: string;

  urlName = 'https://api.pokemontcg.io/v2/cards?q=name:';
  urlSet = 'https://api.pokemontcg.io/v2/cards?q=set.id:';
  lista = [];
  @Input() tipo: boolean;
  set:boolean;
  app:boolean = true;

  tarjeta = {};


   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];



  constructor(private http: HttpClient,  private pagerService: PagerService) { }

  cargarDatosName() {
    let url = this.urlName + this.busquedaQuery;
    this.http.get(url).toPromise().then(data => {
      console.log(data['count']);
      if (data['count'] > 0) {
        console.log(data['data']);
        this.lista = data['data'];
        this.condicion = true;
        console.log(this.lista.length);
        this.setPage(1);
      }
      else {
        alert("Can’t find any Pokémon with the name of " + this.busquedaQuery);
      }
      /* if(data['count']>0){
        this.algo=data['result'];
        for(let i in data['result']){        
          this.prov.id = data['result'][i]['id'];
          this.prov.nombre = data['result'][i]['nombre'];
          this.prov.descripcion = data['result'][i]['detalle'];
          this.prov.telefono = data['result'][i]['telefono'];
          console.log("antes")
          console.log("prov: " +this.prov.descripcion);
          this.proveedores.push(data['result'][i]);
          console.log("listo");
        }
      }
      else{
        alert("no es posible cargar los datos, revise su conexion a internet");
        this.router.navigate(['/home']);
      } */
    }).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      alert("503 Service Unavailable");

    });
  }

clickBack(){ 
  this.busquedaQuery='';
  this.condicion=false;
  this.showCard=true;
  this.tipoQuery='';
  this.lista=[];
  this.tipo=true;
  this.set=false;
  this.app=false;
}

  cargarDatosSet() {
    let url = this.urlSet + this.busquedaQuery;
    this.http.get(url).toPromise().then(data => {
      console.log(data['count']);
      if (data['count'] > 0) {
        console.log(data['data']);
        this.lista = data['data'];
        this.condicion = true;
        console.log(this.lista.length);
        this.setPage(1);
      }
      else {
        alert("Can’t find any set");
      }
      /* if(data['count']>0){
        this.algo=data['result'];
        for(let i in data['result']){        
          this.prov.id = data['result'][i]['id'];
          this.prov.nombre = data['result'][i]['nombre'];
          this.prov.descripcion = data['result'][i]['detalle'];
          this.prov.telefono = data['result'][i]['telefono'];
          console.log("antes")
          console.log("prov: " +this.prov.descripcion);
          this.proveedores.push(data['result'][i]);
          console.log("listo");
        }
      }
      else{
        alert("no es posible cargar los datos, revise su conexion a internet");
        this.router.navigate(['/home']);
      } */
    }).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      alert("503 Service Unavailable");

    });
  }

  ngOnChanges(): void {
    if (this.tipoQuery == "name") {
      this.condicion = false;
      this.showCard = true;
      this.tipo = true;
      this.cargarDatosName();
      this.set=false;
      
    }
    else {
      this.condicion = false;
      this.showCard = true;
      this.tipo = true;
      this.cargarDatosSet();
      this.set=true;
      
    }
  }

  ngOnInit(): void {
    if (this.tipoQuery == "name") {
      this.condicion = false;
      this.showCard = true;
      this.tipo = true;
      this.cargarDatosName();
      this.set=false;
      
    }
    else {
      this.condicion = false;
      this.showCard = true;
      this.tipo = true;
      this.cargarDatosSet();
      this.set=true;
    }

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.lista.length, page);

    // get current page of items
    this.pagedItems = this.lista.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
}

  img(type) {
    switch (type) {
      case "Colorless":
        return ("/src/assets/tipos/normal.png");

      case "Darkness":
        return ("/src/assets/tipos/dark.png");

      case "Dragon":
        return ("/src/assets/tipos/dragon.png");

      case "Fairy":
        return ("/src/assets/tipos/fairy.png");

      case "Fighting":
        return ("/src/assets/tipos/fighting.png");

      case "Fire":
        return ("/src/assets/tipos/fire.png");

      case "Grass":
        return ("/src/assets/tipos/grass.png");

      case "Lightning":
        return ("/src/assets/tipos/electric.png");

      case "Metal":
        return ("/src/assets/tipos/steel.png");

      case "Psychic":
        return ("/src/assets/tipos/psichic.png");

      case "Water":
        return ("/src/assets/tipos/water.png");

    }
  }

  costo(cost) {
    let costo = [];
    for (let i = 0; i < cost.length; i++) {
      let c = {
        name: cost[i],
        img: this.img(cost[i])
      }
      costo.push(c);
    }
    return costo;
  }


  ataques(attacks) {
    let ata = [];
    for (let i = 0; i < attacks.length; i++) {
      let atq = {
        costo: this.costo(attacks[i].cost),
        name: attacks[i].name,
        text: attacks[i].text,
        damage: attacks[i].damage,
        convert: attacks[i].convertedEnergyCost
      }
      ata.push(atq);
    }
    return ata;
  }

  supertipo(subtypes) {
    let a = "";
    for (let i = 0; i < subtypes.length; i++) {
      a = a + subtypes[i] + " ";
    }
    return a;
  }

  debilidad(weaknesses) {
    if (weaknesses != undefined) {
      return {
        exist: true,
        name: weaknesses[0].type,
        img: this.img(weaknesses[0].type),
        value: weaknesses[0].value
      }
    }
    else {
      return {
        exist: false,
        value: "N/A",
      }
    }
  }

  retreat(retreatCost) {
    let a = [];
    for (let i = 0; i < retreatCost.length; i++) {
      let c = {
        img: this.img(retreatCost[i]),
        name: retreatCost[i]
      }
      a.push(c);
    }
    return a;
  }

  evolves(eveol) {
    if (eveol != undefined) {
      return eveol;
    }
    else {
      return "N/A";
    }
  }

  click(data) {
    this.busquedaQuery = null;
    console.log(data);
    console.log(data.rarity);
    this.busquedaQuery = null;
    if (data.supertype == 'Pokémon') {
      this.tipo = true;
      this.showCard = false;
      this.tarjeta = {
        name: this.evolves(data.name),
        superType: this.evolves(data.supertype) + " " + this.supertipo(this.evolves(data.subtypes)),
        hp: this.evolves(data.hp),
        desc: this.evolves(data.flavorText),
        type: this.evolves(data.types),
        imgType: this.img(data.types[0]),
        attacks: this.ataques(data.attacks),
        evolves: this.evolves(data.evolvesTo),
        retreatCost: this.retreat(data.retreatCost),
        setId: data.set.id,
        set: this.evolves(data.set.name),
        setImg: data.set.images.symbol,
        number: this.evolves(data.number) + "/" + this.evolves(data.set.total),
        artist: this.evolves(data.artist),
        rarity: this.evolves(data.rarity),
        pokedex: this.evolves(data.nationalPokedexNumbers),
        cardImg: data.images.large,
        weaknesses: this.debilidad(data.weaknesses),
        resistances: this.debilidad(data.resistances),
        legalities: data.legalities
      }
    }
    else {
      this.tarjeta = {
        name: this.evolves(data.name),
        superType: this.evolves(data.supertype) + " " + this.supertipo(this.evolves(data.subtypes)),
        rules: data.rules,
        setId: data.set.id,
        set: this.evolves(data.set.name),
        setImg: data.set.images.symbol,
        number: this.evolves(data.number) + "/" + this.evolves(data.set.total),
        artist: this.evolves(data.artist),
        rarity: this.evolves(data.rarity),
        cardImg: data.images.large,
        legalities: data.legalities
      }
      this.tipo = false;
      this.showCard = false;
    }
  }

  

}
