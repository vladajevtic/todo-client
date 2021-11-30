import { ChangeDetectorRef, Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/constance/types';
import { AuthService } from 'src/app/services/auth.service';
import { TodosService } from 'src/app/services/todos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  @Input() user: IUser | undefined;
  
  @Output() logout = new EventEmitter();
  public isLogin = false;
  constructor(){ }

  
  public onLogout(){
    this.logout.emit()
   
  }
}
