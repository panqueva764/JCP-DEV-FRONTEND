import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component'; // Importa HeaderComponent

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent // Declara HeaderComponent aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Agrega HttpClientModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
