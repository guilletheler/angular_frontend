import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { PageDto } from './pagedto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
    ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/`);
  }

  getAllPaginated(paginator: LazyLoadEvent): Observable<PageDto<User>> {

    const paginatorJson = JSON.stringify(paginator);

    // console.log(paginatorJson);

    const params = new HttpParams()
    .set('paginator', paginatorJson);

    return this.http.get<PageDto<User>>(`${environment.apiUrl}/users/`, { params });
  }

  nextCodigo(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/users/nextCodigo`);
  }

  findRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/enums/roles`);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/`, user);
  }

  delete(user: User): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/users/${user.id}`);
  }
}
