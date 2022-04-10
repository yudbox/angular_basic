import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  /*
   *
   * ------> TEPLATE-DRIVEN APPROACH
   *
   */
  @ViewChild('form') signinForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };
  formSubmitted = false;
  constructor() {}

  ngOnInit(): void {}

  // onSubmit(form: NgForm) {
  //   console.log('form', form);
  // }
  onSubmit() {
    console.log('form', this.signinForm);
    this.user.username = this.signinForm.value.userData.username;
    this.user.email = this.signinForm.value.userData.email;
    this.user.secretQuestion = this.signinForm.value.secretQuestion;
    this.user.answer = this.signinForm.value.questionAnswer;
    this.user.gender = this.signinForm.value.gender;
    this.formSubmitted = true;

    this.signinForm.reset();
  }
  suggestUserName() {
    const sugestedName = 'SuperUser';
    // Предоставляет возможность заполнить чать формы в один клик не трогая другие контролы
    this.signinForm.form.patchValue({
      userData: {
        username: sugestedName,
        email: 'SuperUser@gmail.com',
      },
    });

    // Предоставляет возможность заполнить всю форму в один клик
    // Нужно заполнить все поля формы обязательно!!!!
    // this.signinForm.setValue({
    //   userData: {
    //     username: sugestedName,
    //     email: '',
    //   },
    //   secretQuestion: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });
  }
}
