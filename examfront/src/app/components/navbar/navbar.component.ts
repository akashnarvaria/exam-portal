import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user:any;

  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.loginService.isLoggedIn();
      this.user=this.loginService.getUser();
      console.log(this.isLoggedIn + " "+ this.user);
    });
  }

  logout(){
    this.loginService.logout();
    this.loginService.loginStatusSubject.next(false);
  }
}
