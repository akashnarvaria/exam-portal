import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.user.username=='' || this.user.username==null){
      this.snack.open("Username is required !! ","OK",{
        duration:5000
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(data=>{
      console.log(data);
      Swal.fire("Success","User is registered !!","success");
    },error=>{
      console.log(error);
      this.snack.open("Something went wrong !!","OK",{
        duration:5000
      });
    });

  }

}
