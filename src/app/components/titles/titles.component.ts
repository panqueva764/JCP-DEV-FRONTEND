import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent {
  @Input() titles: any[] = []; // Asegúrate de agregar la entrada @Input() aquí

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTitles(); // Llama al método para obtener los títulos
  }

  getTitles(): void {
    this.apiService.getTitlesData().subscribe(
      (data: any) => {
        this.titles = data; // Asigna los datos recibidos a la propiedad titles
        console.log('Datos de títulos:', this.titles);
      },
      (error: any) => {
        console.error('Error al obtener los títulos:', error);
      }
    );
  }

  toggleVisibility(title: any): void {
    title.isVisible = !title.isVisible; // Alternar la visibilidad del título
}

}

