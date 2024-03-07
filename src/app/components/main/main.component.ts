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
  headerData: any; // Aquí almacenaremos los datos del encabezado
  showButtons: boolean = true; // Variable para controlar la visibilidad de los botones

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
    this.apiService.navigateTo(key);
  }
}
