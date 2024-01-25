import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Archivio } from './archivio';

@Injectable({
  providedIn: 'root',
})
export class ServizioBibliotecaService {

  URL: string = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
  constructor() {}
  public getData(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.URL + '/get?key=5d15cc38',
      crossDomain: true,
  });
  }

  public setData(new_archivio: Archivio): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.URL + '/set?key=5d15cc38',
      crossDomain: true,
      body: new_archivio,
  });
  }
}