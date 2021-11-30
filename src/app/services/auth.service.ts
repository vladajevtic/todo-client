import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginUserReq, IPatchUser, IRegisterUserReq, IRegisterUserRes, IUser } from '../constance/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVER_URL = environment.serverUrl;
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  constructor(private http: HttpClient,
              private notifier: NotifierService) {}
   
  public getAllUsers(): Observable<any>{
    return this.http.get( `${this.SERVER_URL}/users`)
  }

  public registerUser(body: IRegisterUserReq): Observable<IRegisterUserRes>{
    
    return this.http.post<IRegisterUserRes>(`${this.SERVER_URL}/users`, body);   
  }

  public loginUser(body:ILoginUserReq): Observable<IRegisterUserRes>{
    return this.http.post<IRegisterUserRes>(`${this.SERVER_URL}/users/login`, body);
  }

  public getUser(): Observable<IUser>
  {
    return this.http.get<IUser>(`${this.SERVER_URL}/users/me`);
  }

  public logoutUser(): Observable<any>{
    this.notifier.notify('info', 'loging out');
    return this.http.post( `${this.SERVER_URL}/users/logout`, {})
  }

  public updateUsers(body: IPatchUser){
    
    return this.http.patch(`${this.SERVER_URL}/users/me`, body)
  }

  public addAvatar(formData: FormData){
    return this.http.post(`${this.SERVER_URL}/users/me/avatar`, formData);
  }
}


