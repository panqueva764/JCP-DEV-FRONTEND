import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent {
  @Input() experiences: any[] = []; // Almacena los datos de las experiencias
  @ViewChild('slidesContainer') slidesContainer: ElementRef | undefined; // Referencia al contenedor de diapositivas

  constructor(private apiService: ApiService) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los datos de las experiencias.
   */
  ngOnInit(): void {
    this.getExperiences();
  }

  /**
   * Obtiene los datos de las experiencias mediante el servicio ApiService.
   */
  getExperiences(): void {
    this.apiService.getExperiencesData().subscribe(
      (data: any) => {
        this.experiences = data;
        console.log('Datos de experiencias:', this.experiences);
      },
      (error: any) => {
        console.error('Error al obtener las experiencias:', error);
      }
    );
  }

  /**
   * Alterna la visibilidad de un título de experiencia.
   * @param title El título de la experiencia.
   */
  toggleVisibility(title: any): void {
    title.isVisible = !title.isVisible;
  }

  scrollRight() {
    if (this.slidesContainer) {
    const container = this.slidesContainer.nativeElement;
    const slideWidth = container.querySelector('.carousel-slide').offsetWidth;
    container.scrollLeft += slideWidth + 13; // 13px es el margen derecho
    }
  }
  
  scrollLeft() {
    if (this.slidesContainer) {
    const container = this.slidesContainer.nativeElement;
    const slideWidth = container.querySelector('.carousel-slide').offsetWidth;
    container.scrollLeft -= slideWidth + 13; // Ajusta el desplazamiento
    }
  }
  

  /**
   * Obtiene la URL correspondiente a la experiencia.
   * @param name El nombre de la experiencia.
   * @returns La URL asociada a la experiencia.
   */
  getExperienceUrl(name: string): string {
    switch (name) {
      case 'Motor Flash':
        return 'https://motorflash.com';
      case 'Asesoftware':
        return 'https://asesoftware.com/';
      case 'Bits Americas':
        return 'https://www.bitsamericas.com/es';
      default:
        return '#';
    }
  }

  /**
   * Analiza una cadena de lenguajes separados por comas y la convierte en un array de strings.
   * @param languageString La cadena de lenguajes.
   * @returns Un array de strings que representan los lenguajes.
   */
  parseLanguages(languageString: string): string[] {
    const cleanString = languageString.replace(/[\[\]"]+/g, '');
    return cleanString.split(',').map(lang => lang.trim());
  }
}
