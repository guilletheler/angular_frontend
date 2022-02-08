import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
//PrimeNG Components
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {PickListModule} from 'primeng/picklist';


@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
    RadioButtonModule,
    RippleModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    PickListModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
    RadioButtonModule,
    RippleModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    PickListModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class PrimengModules { }
