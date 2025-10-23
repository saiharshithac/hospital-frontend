import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey='token';
 
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  getDecodedToken(): any | null {
    const token = this.getToken();  
    if(!token){
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
}
getUserRole(): string | null {
  const decodedToken = this.getDecodedToken();
  return decodedToken ? decodedToken.role : null;
 
}
getUserId(): number | null {
  const decodedToken = this.getDecodedToken();
  return decodedToken ? decodedToken.personId : null;
}
isLoggedIn(): boolean {
  const token = this.getToken();  
  if(!token){
    return false;
  }
  return !this.isTokenExpired();
}
isTokenExpired(): boolean {
  const decodedToken = this.getDecodedToken();
  if(!decodedToken || !decodedToken.exp){
    return true;
  }
  const now=Math.floor(Date.now()/1000);
  return decodedToken.exp < now;
}
logout(): void {
  this.removeToken();
}
}