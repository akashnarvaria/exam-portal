import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle:string='';
  questions:any=[];

  constructor(private route:ActivatedRoute,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params.qid;
    this.qTitle=this.route.snapshot.params.title;
    this.questionService.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      this.questions=data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

  deleteQuestion(qId:any){
    Swal.fire({
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure?'
    }).then(result=>{
      if(result.isConfirmed){
        this.questionService.deleteQuestion(qId).subscribe(data=>{
          Swal.fire("Deleted !!","Question deleted successfully !!","success");
          this.questions=this.questions.filter((q:any)=>q.quesId!=qId);
        },error=>{
          Swal.fire("Error","Error in deleting quetion","error");
        });
      }
    });
  }

}
