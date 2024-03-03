import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData: any; // Aquí almacenaremos los datos del API

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.getHeaderData();
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
}
