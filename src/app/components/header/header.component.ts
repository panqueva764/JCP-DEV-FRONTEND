import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData: any; // Aquí almacenaremos los datos del API
  showMainComponent: boolean = false;
  mainComponentActivated: boolean = false; // Bandera para indicar si se ha detectado el primer scroll

  constructor(private headerService: HeaderService) { }

  /**
   * Inicializa el componente y obtiene los datos del encabezado.
   */
  ngOnInit(): void {
    this.getHeaderData();
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
   * Maneja el clic y realiza el desplazamiento al componente principal.
   * Activa el componente principal.
   */
  handleClickAndScroll(): void {
    console.log('Click detectado');
    this.showMainComponent = true;
    setTimeout(() => {
      this.scrollToMain();
    }, 100); // Pequeña espera para asegurarse de que showMainComponent se haya actualizado
  }

  /**
   * Realiza el desplazamiento al componente principal.
   * Desplaza la página hacia la sección principal.
   */
  scrollToMain(): void {
    const mainSection = document.getElementById('mainSection');
    if (mainSection) {
      const topOffset = 100; // Ajusta este valor según sea necesario
      const desiredPosition = mainSection.offsetTop - topOffset;
      const increment = 10; // Ajusta el incremento de desplazamiento según sea necesario
      const interval = 10; // Ajusta el intervalo de tiempo entre cada incremento
  
      let currentPosition = window.scrollY || window.pageYOffset;
      const scrollTowardsMain = () => {
        if (currentPosition < desiredPosition) {
          window.scrollTo(0, currentPosition);
          currentPosition += increment;
          if (currentPosition >= desiredPosition) {
            window.scrollTo(0, desiredPosition);
            return;
          }
          setTimeout(scrollTowardsMain, interval);
        } else {
          window.scrollTo(0, desiredPosition);
        }
      };
  
      scrollTowardsMain();
    }
  }
  

  /**
   * Maneja el evento de scroll de la ventana.
   * Activa el componente principal cuando se desplaza a una posición específica.
   */
  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log('Scroll detectado');
    const scrollPosition = window.scrollY || window.pageYOffset;
    const threshold = 5; // Umbral de sensibilidad
  
    if (scrollPosition > threshold && !this.mainComponentActivated) {
      console.log('Primer scroll detectado');
      this.showMainComponent = true;
      this.mainComponentActivated = true; // Marca el primer scroll como detectado
  
      setTimeout(() => {
        this.scrollToMain();
      }, 100); // Pequeña espera para asegurarse de que showMainComponent se haya actualizado
    }
    }
  }

