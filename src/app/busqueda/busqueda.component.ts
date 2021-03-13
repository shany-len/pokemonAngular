import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  cargarDatosName() {
    let url = this.urlName + this.busquedaQuery;
    this.http.get(url).toPromise().then(data => {
      console.log(data['count']);
      if (data['count'] > 0) {
        console.log(data['data']);
        this.lista = data['data'];
        this.condicion = true;
      }
      else {
        alert("no fue posible encontrar información de " + this.busquedaQuery);
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
      alert("Servidor sin conexion");

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
      }
      else {
        alert("no fue posible encontrar información del set");
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
      alert("Servidor sin conexion");

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


  img(type) {
    switch (type) {
      case "Colorless":
        return ("../../assets/tipos/normal.png");

      case "Darkness":
        return ("../../assets/tipos/dark.png");

      case "Dragon":
        return ("../../assets/tipos/dragon.png");

      case "Fairy":
        return ("../../assets/tipos/fairy.png");

      case "Fighting":
        return ("../../assets/tipos/fighting.png");

      case "Fire":
        return ("../../assets/tipos/fire.png");

      case "Grass":
        return ("../../assets/tipos/grass.png");

      case "Lightning":
        return ("../../assets/tipos/electric.png");

      case "Metal":
        return ("../../assets/tipos/steel.png");

      case "Psychic":
        return ("../../assets/tipos/psichic.png");

      case "Water":
        return ("../../assets/tipos/water.png");

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
