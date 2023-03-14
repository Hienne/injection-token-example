import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import {
  getSearchServiceProvider,
  Search,
  ShareableComponent
} from '../shareable/shareable.component';

@Injectable()
export class DetailSearchService implements Search<any> {
  search = (search: string): any[] => {
    console.log(`run parent service with: ${search}`);
    return [];
  };
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ShareableComponent],
  template: ` <app-shareable></app-shareable> `,
  providers: [getSearchServiceProvider(DetailSearchService)],
})
export class ParentComponent {}
