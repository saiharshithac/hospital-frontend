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
 details={
    username:'',
    password:''
 }
constructor(private http:HttpClient,private router:Router,private auth:AuthService){}
onLogin(form:NgForm){
 this.http.post<any>('https://localhost:7270/api/person/login',form.value).subscribe({
   next:(res)=>{
     this.auth.setToken(res.token); 
     const role = this.auth.getUserRole() ?? '';
  localStorage.setItem('personId', res.personId.toString());
     localStorage.setItem('role', role);
       
      if(role==='Doctor'){
       this.router.navigate(['/aboutus']);
     }
     else if(role==='Patient'){
       this.router.navigate(['/appointment']);
     }
     else if(role ==='Staff'){
      this.router.navigate(['/dashboard-admin']);
     }
   },
   error: err=>{
     alert('Invalid Credentials');
   }
 });
 }
}  
  
