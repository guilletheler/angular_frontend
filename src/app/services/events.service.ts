import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  recargaReclamo = new EventEmitter<string>();
  recargaObservacionesReclamo = new EventEmitter<string>();
  recargaListadoReclamo = new EventEmitter<boolean>();
  logEvent = new EventEmitter<boolean>();

  // clienteSelected = new EventEmitter<Cliente>();
  // itemSelected = new EventEmitter<FacturaItem>();

  cargandoReclamosPriorizados = new EventEmitter<boolean>();

  constructor() {}

  fireLogEvent(login: boolean) {
    this.logEvent.emit(login);
  }

  recargarReclamo(nroReclamo: string){
    //Si el evente del componente tiene un procedimiento correcto se emite el
    //número del reclamo modificado. De lo contrario se emite un null
    this.recargaReclamo.emit(nroReclamo);
  }

  recargarObservaciones(nroReclamo: string){
    //Si el evente del componente tiene un procedimiento correcto se emite el
    //número del reclamo modificado. De lo contrario se emite un null
    this.recargaObservacionesReclamo.emit(nroReclamo);
  }

  recargarListadoReclamos(){
    this.recargaListadoReclamo.emit(true);
  }

  // clienteSeleccionado(cliente: Cliente){
  //   this.clienteSelected.emit(cliente);
  // }

  // facturaItemSeleccionado(item: FacturaItem){
  //   this.itemSelected.emit(item);
  // }

  loadReclamosPriorizados(cargando: boolean){
    this.cargandoReclamosPriorizados.emit(cargando);
  }
}

/*
USO:
ngOnInit() {
    this.eventService.recargaListadoReclamo
      .subscribe(nroReclamo => {
        this.cargarListado();
      })
}
*/
