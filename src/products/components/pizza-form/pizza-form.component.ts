//https://indepth.dev/posts/1055/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms

/*
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'pizza-form',
  template: `
      <span>Current slider value: {{ctrl.value}}</span>
      <ngx-jquery-slider [formControl]="ctrl"></ngx-jquery-slider>
      <input [value]="ctrl.value" (change)="updateSlider($event)">
  `
})
export class PizzaFormComponent {
  ctrl = new FormControl(11);

  updateSlider($event: any) {
  //  console.log($event.currentTarget.value);
    this.ctrl.setValue($event.currentTarget.value, {emitModelToViewChange: true});
    
  }
}*/


import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { map } from 'rxjs/operators';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'pizza-form',
  styleUrls: ['pizza-form.component.scss'],
  template: `
    <div class="pizza-form">
      <form [formGroup]="form">
      
        <label>
          <h4>Pizza name</h4>

  
          <input 
            type="text" 
            formControlName="name"
            placeholder="e.g. Pepperoni"
            class="pizza-form__input"
            [class.error]="nameControlInvalid">
          <div
            class="pizza-form__error"
            *ngIf="nameControlInvalid">
            <p>Pizza must have a name</p>
          </div>
        </label>

   

        <ng-content></ng-content>

        <label>
          <h4>Select toppings</h4>
        </label>

        <div class="pizza-form__list">
              

           <pizza-toppings
            [toppings]="toppings"
            [formControl]="toppingsControl">
          </pizza-toppings>

        </div>

        <div class="pizza-form__actions">
          <button
            type="button"
            class="btn btn__ok"
            *ngIf="!exists"
            (click)="createPizza(form)">
            Create Pizza
          </button>

          <button
            type="button"
            class="btn btn__ok"
            *ngIf="exists"
            (click)="updatePizza(form)">
            Save changes
          </button>

          <button
            type="button"
            class="btn btn__warning"
            *ngIf="exists"
            (click)="removePizza(form)">
            Delete Pizza
          </button>
        </div>

      </form>
    </div>
  `,
})
export class PizzaFormComponent implements OnChanges {

  exists = false;

  @Input() pizza: Pizza = {};
  @Input() toppings: Topping[] = [];

  @Output() selected = new EventEmitter<number[]>();
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();



  form = this.fb.group({
    name: ['', Validators.required],
    //toppings: []
    //toppings:  new FormArray([])
    //toppings: this.fb.array([]) ,
    //toppings: [[]]
    //sliders: this.fb.array([]) 
    //sliders: new FormControl(),
    toppings: new FormControl()
  });

  constructor(private fb: FormBuilder) {}

  //trl = new FormControl(11);
  /*
  get slidersControl() {
    //console.log(this.form.get('sliders'));
    return this.form.get('sliders') as FormControl;
  }*/

  get toppingsControl() {
    //console.log(this.form.get('toppings'));
    return this.form.get('toppings') as FormControl;
  }



  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log("this.pizza", this.pizza);
    if (this.pizza && this.pizza.id) {
      
      this.exists = true;      
      this.form.patchValue(this.pizza);
    }

    this.toppingsControl
    .valueChanges
    .pipe(
      map((toppings: any) => { 
       // console.log("CHANGED", toppings);
        return (toppings ?? []) .map((topping: Topping) => topping.id);      
      })
    )
    .subscribe((value) => {
     // console.log("EMITED", value);
      this.selected.emit(value)
    });;

    
    /*
    this.form
      .get('toppings')!
      .valueChanges!
      .pipe(
        map((toppings: any) => toppings.map((topping: Topping) => topping.id))
      )
      .subscribe(value => this.selected.emit(value));*/
  }

  createPizza(form: FormGroup) {
    console.log("createPizza");
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updatePizza(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.pizza, ...value });
    }
  }

  removePizza(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.pizza, ...value });
  }
}
