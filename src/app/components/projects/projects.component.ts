import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Input() projects: any[] = []; // Almacena los datos de los proyectos
  @ViewChild('slidesContainer') slidesContainer: ElementRef | undefined; // Referencia al contenedor de diapositivas

  constructor(private apiService: ApiService) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los datos de los proyectos.
   */
  ngOnInit(): void {
    this.getProjects();
  }

  /**
   * Obtiene los datos de los proyectos mediante el servicio ApiService.
   */
  getProjects(): void {
    this.apiService.getProjectsData().subscribe(
      (data: any) => {
        this.projects = data;
        console.log('Datos de proyectos:', this.projects);
      },
      (error: any) => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }

  /**
   * Alterna la visibilidad de un proyecto.
   * @param project El proyecto a modificar.
   */
  toggleVisibility(project: any): void {
    project.isVisible = !project.isVisible;
  }

  /**
   * Desplaza el contenido del contenedor de diapositivas hacia la izquierda.
   */
  scrollLeft(): void {
    if (this.slidesContainer) {
      this.slidesContainer.nativeElement.scrollLeft -= 300;
    }
  }

  /**
   * Desplaza el contenido del contenedor de diapositivas hacia la derecha.
   */
  scrollRight(): void {
    if (this.slidesContainer) {
      this.slidesContainer.nativeElement.scrollLeft += 300;
    }
  }
}
