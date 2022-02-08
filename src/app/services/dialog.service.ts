import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogosService {
  dialogos:any = {};
  constructor() { }

  GetDialogs(nombre : string) : any{
    return this.dialogos[nombre];
  }

  AddDialogo<Type>(nombre : string, dialog : MatDialogRef<Type>){
    this.dialogos[nombre] = dialog;
  }

  CloseDialog(nombre: string) : void{
    this.dialogos[nombre].close();
  }
}

/*
//USO:
marcaDenunciaAlConsumidor() {
    const cambioLocalDialog = this.dialog.open(MarcarDenunciaConsumidorComponent, {
      data: {
        nroReclamo: this.reclamo.Numero
      }, disableClose: true
    });
    this.dialogosService.AddDialogo<MarcarDenunciaConsumidorComponent>('MarcarDenunciaConsumidorComponent', cambioLocalDialog);
  }
*/
