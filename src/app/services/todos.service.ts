import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateTodo, ITodo } from '../constance/types';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private SERVER_URL = environment.serverUrl;
  constructor(private readonly http: HttpClient) { }

  public getAllTodos(): Observable<ITodo[]>{
    return this.http.get<ITodo[]>(`${this.SERVER_URL}/todos`)
  }

  public createTodo(body: ICreateTodo): Observable<ITodo>{
    return this.http.post<ITodo>(`${this.SERVER_URL}/todos`, body)
  }

  public completedTodo(id: string): Observable<ITodo>{
    return this.http.patch<ITodo>(`${this.SERVER_URL}/todos/${id}`, {completed: true})
  }
}
