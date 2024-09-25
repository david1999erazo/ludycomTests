import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersFormModalComponent } from '../modals/users-form-modal/users-form-modal.component';
import { User } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      },
    });
  }

  openModal(isEditMode: boolean, userData?: User) {
    const modalRef = this.modalService.open(UsersFormModalComponent);
    modalRef.componentInstance.isEditMode = isEditMode;

    if (userData) {
      modalRef.componentInstance.userData = userData;
    }

    modalRef.result.then((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deteleUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      },
    });
  }
}
