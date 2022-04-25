import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  constructor(private route:ActivatedRoute,private quizService:QuizService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.catId=params.catId;
      if(this.catId==0){
        this.quizService.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes=data;
        },error=>{
          Swal.fire("Error","Error in loading all quizzes","error");
        });
      }else{
        this.quizzes=[];
        this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes=data;
          console.log(data);
        });
      }
    })
    

    
  }

}
