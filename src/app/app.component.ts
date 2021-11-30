import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { IUser } from './constance/types';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public readonly user$ = this.authService.user$;
  public pageTitle = 'login';
  public loading = false;
  constructor(private readonly authService: AuthService,
              private readonly tokenService: TokenStorageService,
              private readonly router: Router
              ){}
  ngOnInit(){
    if(!!this.tokenService.getToken()){
      this.user$.next(this.tokenService.getUser());
    }

    this.router.events.pipe(
      tap (() =>{
        this.loading= true;
      }),
      filter((evt:any) =>  
        evt instanceof NavigationEnd
      )
    ).subscribe((evt:any) =>{
      setTimeout(()=>{
        this.loading= false
      },1500)
      this.pageTitle = evt.url.split('/')[1].toUpperCase();
    })
  }
  
  logout(){
     this.authService.logoutUser().pipe(
      take(1)
    ).subscribe(() => {
      this.tokenService.logout();
      this.router.navigate(['/login']);
      
    })
  }
  
  name = 'vlada';
  shouldShow = true;
  arr = [1,3,5,2,4]
}
