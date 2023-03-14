import { CommonModule } from '@angular/common';
import { ClassProvider, Component, inject, InjectionToken } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface Search<T> {
  search: (search: string) => T[];
}

export const SEARCH = new InjectionToken<Search<object>>('search');

export const getSearchServiceProvider = <T, C extends Search<T>>(clazz: new () => C): ClassProvider => ({
  provide: SEARCH,
  useClass: clazz
})

@Component({
  selector: 'app-shareable',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <input type="text" [formControl]="searchInput" />
    <button (click)="search()">Search</button>
    <div *ngFor="let d of data | async">{{ d | json }}</div>
  `,
})
export class ShareableComponent {
  searchService = inject(SEARCH, {optional: true});
  data = new BehaviorSubject<object[]>([]);

  searchInput = new FormControl('', { nonNullable: true });

  constructor() {
    if (!this.searchService) {
      throw new Error(`Search Token must be PROVIDED`);
    }
  }

  search() {
    if (this.searchService) {
      this.data.next(this.searchService?.search(this.searchInput.value));
    }
  }
}
