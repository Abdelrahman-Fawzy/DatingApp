import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error) {
          switch (error.status) {
            case 400:
              if(error.error.errors) {
                const ModalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    ModalStateErrors.push(error.error.errors[key])
                  }
                }
                throw ModalStateErrors.flat();
              } else {
                this.toast.error(error.status + " Bad Request")
              }
              break;
            case 401:
              this.toast.error(error.status + " Unauthorized")
              break;
            case 404:
              this.router.navigateByUrl("/Not-Found")
              break;
            case 500:
              const navigationExtras : NavigationExtras = { state: {error: error.error} }
              this.router.navigateByUrl('/Server-Error', navigationExtras)
              break;
            default:
              this.toast.error("Something went wrong")
              console.log(error);
              break;
          }
        }
        return throwError(error)
      })
    )
  }
}
