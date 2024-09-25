import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AreasFormModalComponent } from '../modals/areas-form-modal/areas-form-modal.component';
import { Area } from 'src/app/interfaces/areaInterface';
import { AreaService } from 'src/app/services/areaService/area-service.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],
})
export class AreasComponent {
  areas: Area[] = [];

  constructor(
    private modalService: NgbModal,
    private areaService: AreaService
  ) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.areaService.getAreas().subscribe({
      next: (areas) => {
        this.areas = areas;
      },
      error: (error) => {
        console.error('Error al cargar areas:', error);
      },
    });
  }

  openModal(isEditMode: boolean, areaData?: Area) {
    const modalRef = this.modalService.open(AreasFormModalComponent);
    modalRef.componentInstance.isEditMode = isEditMode;

    if (areaData) {
      modalRef.componentInstance.areaData = areaData;
    }

    modalRef.result.then((result) => {
      if (result) {
        this.loadAreas();
      }
    });
  }

  deteleArea(area: Area) {
    this.areaService.deleteArea(area.id).subscribe({
      next: () => {
        this.loadAreas();
      },
      error: (error) => {
        console.error('Error al eliminar area:', error);
      },
    });
  }
}
