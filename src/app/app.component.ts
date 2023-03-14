import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, FactoryProvider, inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParentComponent } from './components/parent/parent.component';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

export const TODO = new InjectionToken<Observable<ITodo>>('todo');

// export const getTodoProvider = (index: number): FactoryProvider => ({
//   provide: TODO,
//   useFactory: (): Observable<ITodo> => inject(HttpClient).get<ITodo>(`https://jsonplaceholder.typicode.com/todos/${index}`)
// })

export const getTodoProvider = (index: number): FactoryProvider => ({
  provide: TODO,
  useFactory: (http: HttpClient): Observable<ITodo> => http.get<ITodo>(`https://jsonplaceholder.typicode.com/todos/${index}`),
  deps: [HttpClient]
})
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ParentComponent],
  templateUrl: './app.component.html',
  providers: [
    getTodoProvider(1)
  ]
})
export class AppComponent {
  todo$: Observable<ITodo> = inject(TODO);
  constructor() {
    console.log(environment.apiUrl);
  }
}
