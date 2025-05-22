import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AutorisationService } from "./autorisation.service";
  @Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private userAuthService:AutorisationService,private router:Router){
	
}
     
 
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const addToken = req.headers.get('No-Auth') !== 'True';
  
    let authReq = req;
    if (addToken && this.userAuthService.isAuthentifi()) {
      const token = this.userAuthService.getToken();
      if (token) {
        authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
    }
  
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.userAuthService.deconnecter();
        }
        return throwError(error);
      })
    );
  }
    private addToken(request:HttpRequest<any>, token:string){ // ajout token
        return request.clone(
            {
                setHeaders:{
                    Authorization :`Bearer ${token}` 
                }
            }
        );
    }
    }
    
    