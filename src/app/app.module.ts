import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { SetComponent } from './set/set.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OtherCardComponent } from './other-card/other-card.component';
import { SetCardComponent } from './set-card/set-card.component';
import { PagerService } from './service/index';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    TarjetaComponent,
    SetComponent,
    NotFoundComponent,
    OtherCardComponent,
    SetCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [HttpClientModule, 
  PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
