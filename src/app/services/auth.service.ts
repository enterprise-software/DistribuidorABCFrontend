import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private urlBase = environment.urlBase;    
    userData = new BehaviorSubject<User>(new User());

    constructor(private http: HttpClient, private router: Router) { }

    login(userDetails: any) {
        return this.http.post<any>(`${this.urlBase.apiabc}/api/login`, userDetails)
        .pipe(map(response => {
            localStorage.setItem('authToken', response.token);
            this.setUserDetails();
            return response;
        }));
    }

    setUserDetails() {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const userDetails = new User();
            const decodeUserDetails = JSON.parse(window.atob(authToken.split('.')[1]));
            userDetails.userName = decodeUserDetails.sub;
            userDetails.firstName = decodeUserDetails.firstName;
            userDetails.isLoggedIn = true;
            userDetails.role = decodeUserDetails.role;
            this.userData.next(userDetails);        
        }
    }

    logout() {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
        this.userData.next(new User());
    }
}
