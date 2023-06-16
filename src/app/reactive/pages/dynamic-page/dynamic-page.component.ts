import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    favoriteGames: this.fb.array([
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding', Validators.required ],
    ])
  })

  public newFavorite: FormControl = this.fb.control('', [Validators.required])

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field )
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

  isValidFieldInArray( formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();

  }

  onDeletedFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched()
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([])
    this.myForm.reset();

  }

}
