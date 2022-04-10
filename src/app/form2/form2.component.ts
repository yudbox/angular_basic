import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

interface forbiddenNamesInterface {
  [key: string]: boolean;
}

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css'],
})
export class Form2Component implements OnInit, OnDestroy {
  /*
   *
   * ------> REACTIVE FORM APPROACH
   *
   */
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['chris', 'anna'];
  valueSubscription: Subscription;
  statusSubscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    // 1. FormGroup создает новую форму в памяти Ангуляра
    // 2. FormControl создает новый контрол в форме. Можно задавать дефолтное значение
    /*
    FormControl имеет три параметра
     FormControl(дефолтное значения, [валидаторы],[валидаторы с асинхронными запросами])
    */
    // 3. FormArray создает массив в который можно поместить массив FormControl'ов
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.forbidenAsyncEmails]
        ),
      }),

      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // подписка на события всей формы

    this.valueSubscription = this.signupForm.valueChanges.subscribe((value) =>
      console.log('valueChanges', value)
    );
    this.statusSubscription = this.signupForm.statusChanges.subscribe(
      (status) => console.log('statusChanges', status)
    );

    // как пропатчить форму

    // this.signupForm.patchValue({
    //   userData: {
    //     username: 'Alex',
    //   },
    // });

    // this.signupForm.setValue({
    //   userData: {
    //     username: 'Alex',
    //     email: 'email@test.com',
    //   },
    //   gender: 'mail',
    //   hobbies: [],
    // });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    /*
    при нажатии клика запускается данная функция которая пушит в сонтрол формы hobbies
    новый новый элемент массива с начальным значение null и необходимостью валидации
    его на какое-либо значение во время отправки Validators.required
    formControlName при этом привязывается к инпуту по имени индекса 0, 1, 2 и т.д.
    после onSubmit формы все эти данные в том числе инпутов с именами 0, 1, 2 считываются 
    и попадают в общий объект формы
    */
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.controls.hobbies).push(control);
    console.log(<FormArray>this.signupForm.controls.hobbies['controls']);
  }

  forbiddenNames(control: FormControl): forbiddenNamesInterface {
    if (
      this.forbiddenUsernames.filter(
        (name) =>
          !!control.value && name.toLowerCase() === control.value.toLowerCase()
      ).length !== 0
    ) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbidenAsyncEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        }
        resolve(null);
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    this.valueSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }
}
