import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories:any;

  constructor(private loginService:LoginService,private categoryService:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any)=>{
      this.categories=data;
    },error=>{
      this.snack.open('Error in loading categories from server','',{
        duration:3000
      });
    });
  }

  logout(){
    this.loginService.logout();
  }

}
