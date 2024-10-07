import { CommonModule, NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' }
];


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})



export class TableComponent {
  elements: PeriodicElement[] = ELEMENT_DATA;
  paginatedElements: PeriodicElement[] = [];
  pageSize: number = 5; 
  currentPage: number = 0; 
  totalPages: number = Math.ceil(this.elements.length / this.pageSize);
  isMobile: boolean = false; 

  constructor() {}

  ngOnInit() {
    this.checkScreenSize(); 
    this.paginate();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

 
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; 
  }


  paginate() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedElements = this.elements.slice(start, end); 
  }


  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginate();
    }
  }


  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }
}
