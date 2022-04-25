import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  }

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open('Username is required !!','OK',{
        duration:3000
      });
      return;   
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('Password is required !!','OK',{
        duration:3000
      });
    }
    this.loginService.generateToken(this.loginData).subscribe((response:any)=>{
      console.log(response);
      this.loginService.loginUser(response.token);
      this.loginService.getCurrentUser().subscribe((user:any)=>{
        this.loginService.setUser(user);
        console.log(user);
        this.loginService.loginStatusSubject.next(true);
        if(this.loginService.getUserRole()=='ADMIN'){
          
          this.router.navigate(['/admin']);
        }else if(this.loginService.getUserRole()=='NORMAL'){
         
          this.router.navigate(['/user-dashboard/0']);
        }else{
          this.loginService.logout();
        }
      });
    },error=>{
      console.log(error);
      this.snack.open("Invalid Details, Try Again !!","OK",{
        duration:3000
      });
    });
  }

}
