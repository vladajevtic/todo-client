import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IRegisterUserReq, IRegisterUserRes, IUser } from 'src/app/constance/types';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { Router } from "@angular/router";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public readonly user$ = this.authService.user$;
  userRegisterForm: FormGroup | undefined;
  public user: IUser | undefined;
  public userError = false;
  @ViewChild('f') registerForm: NgForm | undefined;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private router: Router,
              private notifier: NotifierService) { }


  ngOnInit(): void {
    this.authService.getAllUsers()
    .subscribe((data) => {
      console.log(data);
      
    });
    this.initForm();
  }

  onSubmit() {
    const payload = this.userRegisterForm?.value as IRegisterUserReq;
    this.notifier.notify('info', 'Registering...');
    this.authService.registerUser(payload)
    .pipe(
      catchError(e => {
        this.notifier.notify('error', `${e.error.message}`)
        this.userError = true;
          return EMPTY;
      })
    )  
    .subscribe(data => {
      this.notifier.notify('success',`redister with name ${data.user.name}`);
      this.user = data.user;
      this.tokenService.saveToken(data.token);
      this.tokenService.saveUser(data.user);
      this.user$.next(data.user);
      this.router.navigate(['/user']);
      
    })
    //console.log(this.userRegisterForm?.value)
  }
  onClear(){
    this.registerForm?.reset();
  }

  private initForm(){
    this.userRegisterForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
    })
  }
}


