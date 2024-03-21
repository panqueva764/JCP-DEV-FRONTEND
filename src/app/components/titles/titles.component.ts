import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent {
  @Input() titles: any[] = []; // Almacena los datos de los títulos

  constructor(private apiService: ApiService) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los datos de los títulos.
   */
  ngOnInit(): void {
    this.getTitles();
  }

  /**
   * Obtiene los datos de los títulos mediante el servicio ApiService.
   */
  getTitles(): void {
    this.apiService.getTitlesData().subscribe(
      (data: any) => {
        this.titles = data;
        console.log('Datos de títulos:', this.titles);
      },
      (error: any) => {
        console.error('Error al obtener los títulos:', error);
      }
    );
  }

  /**
   * Alterna la visibilidad de un título.
   * @param title El título a modificar.
   */
  toggleVisibility(title: any): void {
    title.isVisible = !title.isVisible;
  }

}
