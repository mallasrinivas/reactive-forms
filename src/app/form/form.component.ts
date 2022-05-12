import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  validateForm: FormGroup;
  user:any = []
  object:any ={}
  id: string = uuid();

  submitForm(): void {
    // console.log('submit', this.validateForm.value);
    this.object = this.validateForm.value;
    this.object.id = this.id;
    this.user.push(this.validateForm.value);
    console.log("User ",this.user);
    // var userDetails = this.validateForm.value;
    // var item:any = localStorage.getItem('userDetails')
    // // console.log('item:', JSON.parse(item));
    // console.log("id",this.object.id);
    // let pre = this.object.id;
    localStorage.setItem(`userDetails`,JSON.stringify(this.user));
    // var a:any = localStorage.getItem(`userDetails`)
    // // console.log(JSON.parse(a));
    // console.log("after",a);
    // console.log("PARSED",JSON.parse(a));
    // let values = [];
    // values.push(JSON.parse(a));

    // console.log("arrayval",values)
    // this.store();
  }
  //  store(){
  //    console.log("pre",localStorage.getItem('pre'));
  //    if(localStorage.getItem('pre')!==localStorage.getItem(`${this.object.id}`)){
  //     localStorage.setItem(`${this.object.id}`,JSON.stringify(this.object));
  //    }
  //  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  
  // onDelete(data:any){
  //   var item:any = localStorage.getItem('userDetails')
  //   console.log('item:', JSON.parse(item));

  //   for(let i=0;i<this.user.length;i++){
  //     if(i ==this.user.indexOf(data)){
  //       this.user.splice(i,1);
  //       // this.user.filter('getdetails', function(eachdata:any){
  //       //   console.log(eachdata);
  //       // })
  //       localStorage.removeItem('userDetails')
  //     }
  //   }
  //   this.user =[]
  // };
  deleteRow(id: string): void {
    this.user = this.user.filter((d:any) => d.id !== id);
    localStorage.removeItem(`${this.object.id}`);
  }
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      comment: ['', [Validators.required]]
    });
  }
}
function item(arg0: string, item: any) {
  throw new Error('Function not implemented.');
}

