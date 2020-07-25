import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../feedback.service';
import {Feedback} from '../feedback';
import {Observable, Subject} from 'rxjs';


import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  constructor(private feedbackservice: FeedbackService) {
  }

  feedbackArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  feedbacks: Observable<Feedback[]>;
  feedback: Feedback = new Feedback();
  deleteMessage = false;
  feedbacklist: any;
  isupdated = false;


  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All']],
      processing: true
    };
    this.feedbackservice.getFeedbackList().subscribe(data => {
      console.log('view data::', data.valueOf());
      console.log('list data::', data['feedbacks']);
      this.feedbacks = data['feedbacks'];
      console.log('converted data::', this.feedback);
      this.dtTrigger.next();
    })
  }

  deleteFeedback(id: string) {
    this.feedbackservice.deleteFeedback(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.feedbackservice.getFeedbackList().subscribe(data => {
            this.feedbacks = data['feedbacks'];
          })
        },
        error => console.log(error));
  }


  updateFeedback(id: string) {
    this.feedbackservice.getFeedback(id)
      .subscribe(
        data => {
          this.feedbacklist = data['feedbacks'];
        },
        error => console.log(error));
  }

  feedbackupdateform = new FormGroup({
    id: new FormControl(),
    feedback_learnerempid: new FormControl(),
    feedback_learnername: new FormControl(),
    feedback_coursename: new FormControl(),
    feedback_commets: new FormControl(),
    feedback_proficiencylevel: new FormControl(),
    feedback_isrelevanthandson: new FormControl(),
    feedback_isrelevantcontent: new FormControl(),
    feedback_ratingoncontent: new FormControl(),
    feedback_ratingonhandson: new FormControl()
  });

  updateStu(updstu) {
    this.feedback = new Feedback();
    this.feedback.id = this.FeedbackId.value;
    this.feedback.employeeId = this.FeedbackLearnerEmpid.value;
    this.feedback.name = this.FeedbackLearnerName.value;
    this.feedback.courseName = this.FeedbackCourseName.value;
    this.feedback.isContentRelevant = this.FeedbackIsRelevantContent.value;
    this.feedback.contentHandsOn = this.FeedbackIsReLevantHandson.value;
    this.feedback.proficiencyLevel = this.FeedbackProficiencyLevel.value;
    this.feedback.ratingContent = this.FeedbackRatingonContent.value;
    this.feedback.ratingHandsOn = this.FeedbackRatingonHandson.value;
    this.feedback.comment = this.FeedbackCommets.value;
    this.feedbackservice.updateFeedback(this.feedback.id, this.feedback).subscribe(
      data => {
        this.isupdated = true;
        this.feedbackservice.getFeedbackList().subscribe(data => {
          console.log('struden data::' + data)

          this.feedbacks = data['feedbacks'];
        })

      },
      error => console.log(error));
  }

  get FeedbackId() {
    return this.feedbackupdateform.get('id');
  }

  get FeedbackLearnerEmpid() {
    return this.feedbackupdateform.get('feedback_learnerempid');
  }

  get FeedbackLearnerName() {
    return this.feedbackupdateform.get('feedback_learnername');
  }

  get FeedbackCourseName() {
    return this.feedbackupdateform.get('feedback_coursename');
  }

  get FeedbackCommets() {
    return this.feedbackupdateform.get('feedback_commets');
  }

  get FeedbackProficiencyLevel() {
    return this.feedbackupdateform.get('feedback_proficiencylevel');
  }

  get FeedbackIsReLevantHandson() {
    return this.feedbackupdateform.get('feedback_isrelevanthandson');
  }

  get FeedbackIsRelevantContent() {
    return this.feedbackupdateform.get('feedback_isrelevantcontent');
  }

  get FeedbackRatingonContent() {
    return this.feedbackupdateform.get('feedback_ratingoncontent');
  }

  get FeedbackRatingonHandson() {
    return this.feedbackupdateform.get('feedback_ratingonhandson');
  }

  changeisUpdate() {
    this.isupdated = false;
  }
}
