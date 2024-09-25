import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Area } from 'src/app/interfaces/areaInterface';
import { AreaService } from 'src/app/services/areaService/area-service.service';

@Component({
  selector: 'app-areas-form-modal',
  templateUrl: './areas-form-modal.component.html',
  styleUrls: ['./areas-form-modal.component.css'],
})
export class AreasFormModalComponent {
  @Input() areaData!: Area;
  @Input() isEditMode!: boolean;

  areaForm!: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private areaService: AreaService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.areaData) {
      this.fillFormWithAreaData();
    }
  }

  close() {
    const result = true;
    this.activeModal.close(result);
  }

  createForm() {
    this.areaForm = this.fb.group({
      cod: ['', [Validators.required, this.twoDigitValidator]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      leader: ['', [Validators.required, this.sevenDigitValidator]],
      status: ['Activo', Validators.required],
    });
  }

  fillFormWithAreaData() {
    if (this.areaData) {
      this.areaForm.patchValue({
        cod: this.areaData.cod,
        name: this.areaData.name,
        leader: this.areaData.leader,
        status: this.areaData.status,
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.areaForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  twoDigitValidator(control: AbstractControl) {
    const value = control.value;
    if (value === null || value === '') {
      return null;
    }
    const isNumber = !isNaN(value);
    const isTwoDigits = /^\d{2}$/.test(value);
    return isNumber && isTwoDigits ? null : { twoDigits: true };
  }

  sevenDigitValidator(control: AbstractControl) {
    const value = control.value;
    if (value === null || value === '') {
      return null;
    }
    const isNumber = !isNaN(value);
    const isTwoDigits = /^\d{7}$/.test(value);
    return isNumber && isTwoDigits ? null : { twoDigits: true };
  }

  onSubmit() {
    if (this.areaForm.valid) {
      if (this.isEditMode) {
        this.loading = true;
        this.areaService
          .updateArea(this.areaData.id, this.areaForm.value)
          .subscribe({
            next: () => {
              this.loading = false;
              this.close();
            },
            error: (error) => {
              console.error('Error al actualizar area:', error);
            },
          });
      } else {
        this.loading = true;
        this.areaService.addArea(this.areaForm.value).subscribe({
          next: () => {
            this.loading = false;
            this.close();
          },
          error: (error) => {
            console.error('Error al crear el area:', error);
          },
        });
      }
    } else {
      this.areaForm.markAllAsTouched();
    }
  }
}
