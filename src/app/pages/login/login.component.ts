import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public readonly user$ = this.authService.user$;
  loginUserForm: FormGroup | undefined;
  loginError: string | undefined;
  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly tokenService: TokenStorageService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(){
    this.notifier.notify('info', 'Logging in...');
    const payload = this.loginUserForm?.value;
    
    this.authService.loginUser(payload).pipe(
      take(1),
      catchError((e) =>{
        this.loginError = e.error.message;
        this.notifier.notify('error', `${e.error.message}`);
        return EMPTY;
      })
    ).subscribe(data => {
      this.notifier.notify('success',`login with name ${data.user.name}`);
        this.router.navigate(['/user']);
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data.user);
        this.user$.next(data.user);
    })
  }

  private initForm(){
    this.loginUserForm = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(7)])
    })
  }

}
