// certificates.component.ts
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  @Input() certificates: Record<string, any> = {}; // Cambia el tipo de certificates a un objeto
  @ViewChild('slidesContainer') slidesContainer: ElementRef | undefined;
  positions = ['Front', 'Back', 'BD', 'Architecture'];
  selectedPosition: string | undefined;
  filteredCertificates: Record<string, any>[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCertificates();
  }

  getCertificates(): void {
    this.apiService.getCertificatesData().subscribe(
      (data: any) => {
        this.certificates = data; // Asigna los datos recibidos a certificates
        console.log('Datos de Certificados:', this.certificates);
      },
      (error: any) => {
        console.error('Error al obtener los certificados:', error);
      }
    );
  } 

  filterCertificates(position: string): void {
    if (this.certificates[position]) { // Verifica si hay certificados para la posición
      this.selectedPosition = position;
      this.filteredCertificates = this.certificates[position]; // Obtiene los certificados correspondientes a la posición
    } else {
      console.error('No hay certificados para la posición:', position);
    }
  }
  
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

  toggleVisibility(title: any): void {
    title.isVisible = !title.isVisible;
  }

  scrollLeft(): void {
    if (this.slidesContainer) {
      this.slidesContainer.nativeElement.scrollLeft -= 300;
    }
  }

  scrollRight(): void {
    if (this.slidesContainer) {
      this.slidesContainer.nativeElement.scrollLeft += 300;
    }
  }
}
