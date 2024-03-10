import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TitlesComponent } from './components/titles/titles.component'; // Importa HeaderComponent

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TitlesComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'titles', component: TitlesComponent },
      // Agrega las rutas de los otros componentes aquí
    ], { scrollPositionRestoration: 'disabled' }) // Desactiva el scroll por defecto
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }