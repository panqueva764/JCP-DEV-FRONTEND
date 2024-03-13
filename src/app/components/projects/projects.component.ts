import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Input() projects: any[] = []; // Asegúrate de agregar la entrada @Input() aquí
  @ViewChild('slidesContainer') slidesContainer: ElementRef | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProjects(); // Llama al método para obtener los títulos
  }
  getProjects(): void {
    this.apiService.getProjectsData().subscribe(
      (data: any) => {
        this.projects = data; // Asigna los datos recibidos a la propiedad projects
        console.log('Datos de títulos:', this.projects);
      },
      (error: any) => {
        console.error('Error al obtener los títulos:', error);
      }
    );
  }

  toggleVisibility(title: any): void {
    title.isVisible = !title.isVisible; // Alternar la visibilidad del título
}

scrollLeft(): void {
  if (this.slidesContainer) {
    this.slidesContainer.nativeElement.scrollLeft -= 300; // Ajusta el valor de acuerdo al ancho de tus slides
  }
}

scrollRight(): void {
  if (this.slidesContainer) {
    this.slidesContainer.nativeElement.scrollLeft += 300; // Ajusta el valor de acuerdo al ancho de tus slides
  }
}
}