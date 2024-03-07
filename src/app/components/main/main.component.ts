import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  headerData: any; // Aquí almacenaremos los datos del encabezado
  showButtons: boolean = true; // Variable para controlar la visibilidad de los botones

  constructor(private headerService: HeaderService, private router: Router) {}

  /**
   * Método ngOnInit.
   * Se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.getHeaderData();
  }
  
  /**
   * Método getButtonKeys.
   * Retorna las claves de los botones del encabezado.
   * 
   * @returns {string[]} Claves de los botones del encabezado.
   */
  getButtonKeys(): string[] {
    if (this.headerData && this.headerData.main_content && this.headerData.main_content.buttons) {
        return Object.keys(this.headerData.main_content.buttons);
    }
    return [];
  }

  /**
   * Método getHeaderData.
   * Obtiene los datos del encabezado a través del servicio.
   */
  getHeaderData(): void {
    this.headerService.getHeaderData().subscribe(
      data => {
        this.headerData = data ?? [];
        console.log(this.headerData);
      },
      error => {
        console.error('Error al obtener los datos del encabezado:', error);
      }
    );
  }

  /**
   * Método handleButtonClick.
   * Se ejecuta cuando se hace clic en alguno de los botones.
   * Aplica la clase 'move-to-top-left' para mover los botones hacia la parte superior izquierda.
   */
  handleButtonClick(url: string): void {
    this.showButtons = false; // Oculta los botones
    this.router.navigate([url]);
  }
}
