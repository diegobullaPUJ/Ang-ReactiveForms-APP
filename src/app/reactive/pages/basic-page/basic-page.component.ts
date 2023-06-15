import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const RTX5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent{

  // public myForm: FormGroup = new FormGroup ({
  //   name: new FormControl(''),
  //   price: new FormControl('0'),
  //   inStorage: new FormControl('0'),
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: ['', [ Validators.required, Validators.min(0) ]],
    inStorage: ['', [ Validators.required, Validators.min(0) ]],
  })

  constructor(private fb: FormBuilder) {}


  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for( const key of Object.keys( errors ) ){
      switch( key ) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres. `
      };
    }
      return '';
  }

  onSave():void {
    if( this.myForm.invalid ) return;
    console.log( this.myForm.value )

    this.myForm.reset({ price: 10, inStorage: 0  });

  }

}
