import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId: any;
  questions: any;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

  constructor(private locationSt: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this.route.snapshot.params.qid;
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestionsOfQuizForTest(this.qId).subscribe((data: any) => {
      this.questions = data;
      this.timer = this.questions.length * 2 * 60;
      this.startTimer();
    }, error => {
      Swal.fire("Error !!", "Error in loading questions of quiz", "error");
    });
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      
      if (result.isConfirmed) {
        this.evalQuiz();
        
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return mm + ' min : ' + ss + ' sec';
  }

  evalQuiz() {
    // let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswer++;
    //     this.marksGot += marksSingle;
    //   }

    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    this.questionService.evalQuiz(this.questions).subscribe((data:any)=>{
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer=data.correctAnswer;
      this.attempted=data.attempted;
      this.isSubmit = true;
    },error=>{
      Swal.fire("Error !!","Error in evaluating quiz !!","error");
    });
  }
  printPage(){
    window.print();
  }
}
