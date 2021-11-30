import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ICreateTodo } from 'src/app/constance/types';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  createTodoForm: FormGroup | undefined;
  constructor(private readonly todoService: TodosService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(){
    const payload = this.createTodoForm?.value as ICreateTodo;
    this.todoService.createTodo(payload).pipe(
      take(1),
    )
    .subscribe(data => {
      this.router.navigate(['/todos'])
      console.log(data)
    })
  }

  private initForm(){
    this.createTodoForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    })
  }

}
