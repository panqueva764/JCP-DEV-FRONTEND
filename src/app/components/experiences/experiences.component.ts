import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent {
  @Input() experiences: any[] = []; // Asegúrate de agregar la entrada @Input() aquí
  @ViewChild('slidesContainer') slidesContainer: ElementRef | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getExperiences(); // Llama al método para obtener los títulos
  }
  getExperiences(): void {
    this.apiService.getExperiencesData().subscribe(
      (data: any) => {
        this.experiences = data; // Asigna los datos recibidos a la propiedad experiences
        console.log('Datos de títulos:', this.experiences);
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

  parseLanguages(languageString: string): string[] {
    // Elimina los corchetes y las comillas del string
    const cleanString = languageString.replace(/[\[\]"]+/g, '');
    // Divide el string en un array de strings utilizando la coma como separador
    return cleanString.split(',').map(lang => lang.trim());
}

  
}
