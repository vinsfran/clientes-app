import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Region} from './region';


@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) {
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  // getRegiones(): Observable<Region[]> {
  //   return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
  //     catchError(e => {
  //       this.isNoAutorizado(e);
  //       return throwError(e);
  //     })
  //   );
  // }

  getClientes(page: number): Observable<any> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        this.router.navigate(['/clientes']);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  // subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
  //   let formData = new FormData();
  //   formData.append('archivo', archivo);
  //   formData.append('id', id);
  //
  //   const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
  //     reportProgress: true
  //   });
  //
  //   return this.http.request(req).pipe(
  //     catchError(e => {
  //       this.isNoAutorizado(e);
  //       return throwError(e);
  //     })
  //   );
  // }

}
