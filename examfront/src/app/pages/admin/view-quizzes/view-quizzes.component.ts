import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'The word Core describes the basic concept of something, and here, the phrase Core Java defines the basic Java that covers the basic concept of Java programming language.',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }
    },
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'The word Core describes the basic concept of something, and here, the phrase Core Java defines the basic Java that covers the basic concept of Java programming language.',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }
    }
  ]
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
    },error=>{
      console.log(error);
      Swal.fire("ERROR !!","Error in loading data","error");
    });
  }

  deleteQuiz(qId:number){

    Swal.fire({
      icon:'info',
      title:"Are you sure?",
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then(result=>{
      if(result.isConfirmed){
        this.quizService.deleteQuiz(qId).subscribe((data:any)=>{
          this.quizzes=this.quizzes.filter(quiz=>quiz.qId!=qId);
          Swal.fire("Success !!","Quiz deleted","success");
        },error=>{
          console.log(error);
          Swal.fire("Error !!","Error in quiz deleting","error");
        });
      }
    });

    
  }


}
