import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  filter: string = '';

  users: User[] = [];

  user: User = Object();

  currentIndex: number = -1;

  userDialog: boolean = false;

  selectedUsers: User[] = [];

  submitted: boolean = false;

  statuses: any[] = [];

  loading: boolean = true;

  totalRecords: number = 0;

  allRoles: string[] = [];

  dispRoles: string[] = [];

  adminUser: boolean = false;

  @ViewChild('usuariosTable') table: Table = Object();

  constructor(
    private usuariosService: UsuariosService,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.usuariosService.findRoles().subscribe({
        next: (data) => {
          this.allRoles = data;
        },
        error: (err) => {
          console.log('Error cargando roles' + err);
        }
      });
    }, 1000);

    this.adminUser = this.authenticationService.isAdmin;
  }

  async openNew() {

    this.createUser();

    this.submitted = false;

    this.editUser(this.user);
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.selectedUsers = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      }
    });
  }

  editUser(user: User) {
    // Crea una copia del usuario que viene como par??metro
    this.user = { ...user };
    this.user.roles = Object.assign([], user.roles);

    this.dispRoles = [];

    console.log('los roles para el usuario son: ' + this.user.roles);
    for (let i = 0; i < this.allRoles.length; i++) {
      if (!this.user.roles.includes(this.allRoles[i])) {
        console.log('agregando para elegir rol: ' + this.allRoles[i]);
        this.dispRoles.push(this.allRoles[i]);
      }
    }

    this.userDialog = true;
  }

  async deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.usuariosService.delete(user).subscribe({
          next: (data) => {
            this.users = this.users.filter(val => val.id !== user.id);
            this.user = new User();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          },
          error: (err) => {
            console.log('Error eliminando usuario' + err);
          }
        });

      }
    });
  }

  hideDialog() {
    this.createUser();
    this.userDialog = false;
    this.submitted = false;
  }

  async saveUser() {
    this.submitted = true;

    if (this.user.nombre.trim()) {
      if (this.user.id > 0) {
        this.usuariosService.update(this.user).subscribe({
          next: (data) => {
            // this.users[this.findIndexById(this.user.id)] = data;
            // this.users = [...this.users];
            this.saveSucceful('Usuario Actualizado');
          },
          error: (err: HttpErrorResponse) => {
            console.log('Error actualizando usuario' + err.error);
            this.messageService.add({ severity: 'error', summary: 'Error al actualizar', detail: err.error, life: 3000 });
          }
        });
      }
      else {

        this.usuariosService.create(this.user).subscribe({
          next: (data) => {
            // this.users.push(data);
            // this.users = [...this.users];
            this.saveSucceful('Usuario Creado');
          },
          error: (err: HttpErrorResponse) => {
            console.log('Error creando usuario' + err.message);
            this.messageService.add({ severity: 'error', summary: 'Error al crear', detail: err.error, life: 3000 });
          }
        });
      }

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error al crear', detail: 'El nombre no puede ser vacio', life: 3000 });
    }
  }

  saveSucceful(saveMessage: string) {
    this.loadUsers(this.table.createLazyLoadMetadata());
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: saveMessage, life: 3000 });
    this.userDialog = false;
    this.createUser();
  }

  async createUser() {
    this.user = new User();
    this.user.codigo = await this.createCodigo();
    this.user.roles = ['USER'];
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  async createCodigo(): Promise<number> {
    const nextId: number = await lastValueFrom(this.usuariosService.nextCodigo());
    return nextId;
  }

  loadUsers(event: LazyLoadEvent) {

    this.loading = true;
    setTimeout(() => {
      this.usuariosService.getAllPaginated(event).subscribe({
        next: (data) => {
          this.totalRecords = data.totalElements;
          this.users = data.elements;
          this.loading = false;
        },
        error: (err) => {
          console.log('Error cargando usuarios' + err);
          this.loading = false;
        }
      });
    }, 1000);
  }

  clear(table: Table) {
    table.clear();
  }

  export() {
    this.usuariosService.downloadExcel(this.table.createLazyLoadMetadata());
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      delete (worksheet['07']);
      delete (worksheet['06']);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "usuarios");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
