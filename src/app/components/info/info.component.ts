import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() info: any[] = [];
  infoData: any;
  allSkills: string[] = [];

  constructor(private infoService: ApiService) { }

  ngOnInit(): void {
    this.getInfoData();
  }

  getInfoData(): void {
    this.infoService.getInfoData().subscribe(
      data => {
        this.infoData = data ?? {};
      },
      error => {
        console.error('Error al obtener los datos del encabezado:', error);
      }
    );
  }

  toArray(value: any): any[] {
    if (Array.isArray(value)) {
      return value;
    } else {
      return [];
    }
  }

  getAllSkills(): string[] {
    const allSkills: string[] = [];
    for (const [_, skillType] of Object.entries(this.infoData.sidebar.skills)) {
      if (Array.isArray(skillType)) {
        allSkills.push(...skillType);
      }
    }
    return allSkills;
  }

  getSkillImage(skill: string): string {
    return `assets/images/skills/${skill}.jpg`;
  }

  getSkillOfficialLink(skill: string): string {
    switch (skill) {
      case 'PHP':
        return 'https://www.php.net/';
      case 'Laravel':
        return 'https://laravel.com/';
      case 'Node':
        return 'https://nodejs.org/';
      case 'Java':
        return 'https://www.java.com/es/';
      case 'Spring Boot':
        return 'https://spring.io/';
      case 'HTML':
        return 'https://lenguajehtml.com/';
      case 'CSS':
        return 'https://lenguajecss.com/';
      case 'JavaScript':
        return 'https://lenguajejs.com/';
      case 'Angular':
        return 'https://nodejs.org/';
      case 'Vue':
        return 'https://vuejs.org/';
      case 'React':
        return 'https://es.react.dev/';
      case 'MySQL':
        return 'https://www.mysql.com/';
      case 'MongoDB':
        return 'https://www.mongodb.com/';
      case 'RESTful APIs':
        return 'https://aws.amazon.com/es/what-is/restful-api/';
      case 'Microservicios':
        return 'https://aws.amazon.com/es/microservices/';
      case 'AWS Cloud':
        return 'https://aws.amazon.com/es/';
      case 'Docker':
        return 'https://www.docker.com/';
      case 'Kubernetes':
        return 'https://www.docker.com/products/kubernetes/';
      case 'Lando':
        return 'https://lando.dev/';
      case 'Postman':
        return 'https://www.postman.com/';
      default:
        return '#';
    }
  }
  formatSkillKey(skillType: any): string {
    switch (skillType) {
      case 'backend':
        return 'Conocimientos Backend';
      case 'frontend':
        return 'Conocimientos Frontend';
      case 'databases':
        return 'Manejo de Bases de Datos';
      case 'architecture':
        return 'Conocimientos de Arquitectura';
      case 'cloudplatforms':
        return 'Conocimientos de la nube';
      case 'containerization':
        return 'Contenedorización';
      case 'developmenttools':
        return 'Herrimientas de desarollo';
      default:
        return '#';
    }
  }
}
