// main.component.ts

import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  headerData: any;
  showButtons: boolean = true;
  selectedComponent: string = ''; // Variable para almacenar el componente seleccionado
  titlesData: any;
  projectsData: any;
  experiencesData: any;
  certificatesData: any;

  constructor(private headerService: HeaderService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getHeaderData();
  }

  getButtonKeys(): string[] {
    if (this.headerData && this.headerData.main_content && this.headerData.main_content.buttons) {
      return Object.keys(this.headerData.main_content.buttons);
    }
    return [];
  }

  getHeaderData(): void {
    this.headerService.getHeaderData().subscribe(
      data => {
        this.headerData = data ?? [];
      },
      error => {
        console.error('Error al obtener los datos del encabezado:', error);
      }
    );
  }

  handleButtonClick(key: string): void {
    this.showButtons = false; // Oculta los botones
      // Establece el componente seleccionado según el botón clickeado
      this.selectedComponent = key;
  
      // Recupera los datos del componente si aún no se han recuperado
      switch(key) {
        case 'titles':
          if (!this.titlesData) {
            this.apiService.getTitlesData().subscribe(data => {
              this.titlesData = data;
            });
          }
          break;
        case 'projects':
          if (!this.projectsData) {
            this.apiService.getProjectsData().subscribe(data => {
              this.projectsData = data;
            });
          }
          break;          
        case 'experiences':
          if (!this.experiencesData) {
            this.apiService.getExperiencesData().subscribe(data => {
              this.experiencesData = data;
            });
          }
          break;
         case 'certificates':
          if (!this.certificatesData) {
            this.apiService.getCertificatesData().subscribe(data => {
              this.certificatesData = data;
            });
          }
          break;
        default:
          console.error('Botón no reconocido:', key);
      }
    }
}
