import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-users-form-modal',
  templateUrl: './users-form-modal.component.html',
  styleUrls: ['./users-form-modal.component.css'],
})
export class UsersFormModalComponent {
  @Input() userData!: User;
  @Input() isEditMode!: boolean;

  userForm!: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.userData) {
      this.fillFormWithUserData();
    }
  }

  close() {
    const result = true;
    this.activeModal.close(result);
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      birthdayDate: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      documentNumber: [0, [Validators.required, this.sevenDigitValidator]],
      area: ['', [Validators.required, this.twoDigitValidator]],
      salary: [
        '',
        [Validators.required, Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)],
      ],
      status: ['Activo', Validators.required],
    });
  }

  twoDigitValidator(control: AbstractControl, digitLimit: number) {
    const value = control.value;
    if (value === null || value === '') {
      return null;
    }
    const isNumber = !isNaN(value);
    const isTwoDigits = /^\d{2}$/.test(value);
    return isNumber && isTwoDigits ? null : { twoDigits: true };
  }

  sevenDigitValidator(control: AbstractControl, digitLimit: number) {
    const value = control.value;
    if (value === null || value === '') {
      return null;
    }
    const isNumber = !isNaN(value);
    const isTwoDigits = /^\d{7}$/.test(value);
    return isNumber && isTwoDigits ? null : { twoDigits: true };
  }

  fillFormWithUserData() {
    if (this.userData) {
      this.userForm.patchValue({
        name: this.userData.name,
        lastName: this.userData.lastName,
        birthdayDate: this.userData.birthdayDate,
        email: this.userData.email,
        documentNumber: this.userData.documentNumber,
        area: this.userData.area,
        salary: this.userData.salary,
        status: this.userData.status,
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.loading = true;
        this.userService
          .updateUser(this.userData.id, this.userForm.value)
          .subscribe({
            next: () => {
              this.loading = false;
              this.close();
            },
            error: (error) => {
              console.error('Error al actualizar usuario:', error);
            },
          });
      } else {
        this.loading = true;
        this.userService.addUser(this.userForm.value).subscribe({
          next: () => {
            this.loading = false;
            this.close();
          },
          error: (error) => {
            console.error('Error al crear el usuario:', error);
          },
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
