// paginator.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() totalItems: any;
  @Input() itemsPerPage: number = 12;
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  getRange(): number[] {
    const range = [];
    const totalPages = this.totalPages;
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }
}
