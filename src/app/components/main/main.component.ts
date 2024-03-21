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
  selectedComponent: string = '';
  titlesData: any;
  projectsData: any;
  experiencesData: any;
  certificatesData: any;
  infoData: any;

  constructor(private headerService: HeaderService, private apiService: ApiService) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los datos del encabezado.
   */
  ngOnInit(): void {
    this.getHeaderData();
  }

  /**
   * Obtiene las claves de los botones del encabezado.
   * @returns Un array de strings que representa las claves de los botones.
   */
  getButtonKeys(): string[] {
    if (this.headerData && this.headerData.main_content && this.headerData.main_content.buttons) {
      return Object.keys(this.headerData.main_content.buttons);
    }
    return [];
  }

  /**
   * Obtiene los datos del encabezado mediante el servicio HeaderService.
   */
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

  /**
   * Maneja el clic en un botón del encabezado y carga el componente correspondiente.
   * @param key La clave del botón seleccionado.
   */
  handleButtonClick(key: string): void {
    this.showButtons = false;
    this.selectedComponent = key;
  
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
      case 'info':
        if (!this.infoData) {
          this.apiService.getInfoData().subscribe(data => {
            this.infoData = data;
          });
        }
        break;
      default:
        console.error('Botón no reconocido:', key);
    }
  }
}
