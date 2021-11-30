import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ITodo } from 'src/app/constance/types';
import { AuthService } from 'src/app/services/auth.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {
  public allTodos: ITodo[] | undefined;
  public completedTodos: ITodo[] | undefined;
  public activeTodos: ITodo[] | undefined;
  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe(data => {
      this.allTodos = data;
      if(data && data.length>0){
        this.completedTodos = data.filter(todo => todo.completed);
        this.activeTodos = data.filter(todo => !todo.completed)
      }else{
        this.completedTodos = [];
        this.activeTodos = [];
      }
      console.log("Todos ", data)
    });
  }
  onComplete(todo: ITodo){
    this.todoService.completedTodo(todo._id)
    .pipe(
      take(1)
    )
    .subscribe(data =>{
      this.activeTodos = this.activeTodos?.filter(found => found._id !== todo._id);
      this.completedTodos= [...this.completedTodos!, todo];
    });

  }
}
