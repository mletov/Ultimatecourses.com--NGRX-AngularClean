import { Component, ViewChild, Input } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'ngx-jquery-slider',
  template: `
      <div #location></div>
  `,
  styles: ['div {width: 100px}'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NgxJquerySliderComponent,
    multi: true
  }]
})
export class NgxJquerySliderComponent implements ControlValueAccessor {

  @Input()
  public control:FormControl;

  @ViewChild('location') location : any;
  widget: any;
  onChange : any;
  value : any;

  ngAfterViewInit() {
    this.widget = $(this.location.nativeElement).slider(this.value);

    this.widget.on('slidestop', (event : any, ui : any) => {
      this.onChange([1, 2, 3]);
     // this.onChange(ui.value);
    });
  }


  writeValue(value : any) {
   
    this.value = value;
    if (this.widget && value) {
      this.widget.slider('value', value);
    }    
  }

  registerOnChange(fn : any) {
    this.onChange = fn;
    console.log("registerOnChange Called");
  }

  registerOnTouched(fn : any) {
  }
}
