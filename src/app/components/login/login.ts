import { Component } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Header } from "../../header/header";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
 
@Component({
  selector: 'app-login',
  imports: [FormsModule, Header, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // details={
  //   username:'',
  //   password:''
  // }
 
  // errorMessage: string = '';
 
  // constructor(private loginService: PersonService, private router: Router) {}
 
  // onLogin(form:NgForm) {
  //   if (form.valid) {
  //     this.loginService.validateUser(this.details).subscribe({
  //       next: (response) => {
  //         console.log('Successfully logged in', response);
  //         localStorage.setItem('token', response.token);
  //         localStorage.setItem('personId', response.personId.toString());
  //         this.router.navigate(['/register']);
  //       },
  //       error: (err) => {
  //         console.error('Login failed', err);
  //         this.errorMessage = 'Invalid username or password';
  //       }
  //     });
  //   }
  // }
 details={
    username:'',
    password:''
 }
constructor(private http:HttpClient,private router:Router,private auth:AuthService){}
onLogin(form:NgForm){
 this.http.post<any>('https://localhost:7270/api/person/login',form.value).subscribe({
   next:(res)=>{
     this.auth.setToken(res.token); 
     const role=this.auth.getUserRole();
    //  console.log('id',this.auth.getUserId());
  localStorage.setItem('personId', res.personId.toString());
    
     if(role==='Admin'){
       this.router.navigate(['/update-profile']);
     }
     else if(role==='Doctor'){
       this.router.navigate(['/aboutus']);
     }
     else if(role==='Patient'){
       this.router.navigate(['/register']);
     }
   },
   error: err=>{
     alert('Invalid Credentials');
   }
 });
 }
}  
  
