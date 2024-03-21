// certificates.component.ts
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  @Input() certificates: Record<string, any> = {};
  @ViewChild('slidesContainer') slidesContainer: ElementRef | undefined;
  positions = ['Front', 'Back', 'BD', 'Architecture'];
  selectedPosition: string | undefined;
  filteredCertificates: Record<string, any>[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCertificates();
  }

  /**
   * Obtiene los datos de los certificados mediante la API.
   */
  getCertificates(): void {
    this.apiService.getCertificatesData().subscribe(
      (data: any) => {
        this.certificates = data;
        console.log('Datos de Certificados:', this.certificates);
      },
      (error: any) => {
        console.error('Error al obtener los certificados:', error);
      }
    );
  } 

  /**
   * Filtra los certificados según la posición especificada.
   * @param position La posición para filtrar los certificados.
   */
  filterCertificates(position: string): void {
    if (this.certificates[position]) {
      this.selectedPosition = position;
      this.filteredCertificates = this.certificates[position];
    } else {
      console.error('No hay certificados para la posición:', position);
    }
  }
  
  /**
   * Devuelve una versión formateada del título de la posición.
   * @param position La posición de los certificados.
   * @returns Una cadena formateada del título de la posición.
   */
  formattedCertificates(position: string): string  {
    switch (position) {
      case 'Front':
        return 'Certificaciones Frontend';
      case 'Back':
        return 'Certificaciones Backend';
      case 'BD':
        return 'Certificaciones de Base de Datos';
      case 'Architecture':
        return 'Certificaciones de Arquitectura y Clean Code';
      default:
        return '#';
    }
  }

  /**
   * Alterna la visibilidad del título.
   * @param title El título cuya visibilidad se va a alternar.
   */
  toggleVisibility(title: any): void {
    title.isVisible = !title.isVisible;
  }

  /**
   * Desplaza el contenedor de diapositivas hacia la izquierda.
   */
  scrollLeft(): void {
    if (this.slidesContainer) {
      this.slidesContainer.nativeElement.scrollLeft -= 300;
    }
  }

  /**
   * Desplaza el contenedor de diapositivas hacia la derecha.
   */
  scrollRight(): void {
    if (this.slidesContainer) {
      this.slidesContainer.nativeElement.scrollLeft += 300;
    }
  }
}
