import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private readonly urlApi: string = 'https://api.themoviedb.org/3/movie';

  constructor(private http: HttpClient) {}

  public selecionarFilmesPopulares(pagina: number): Observable<any> {
    const urlCompleto = `${this.urlApi}/popular?page=${pagina}&language=pt-BR`;

    return this.http.get<any>(urlCompleto, this.obterHeadersDeAutorizacao());
  }

  private obterHeadersDeAutorizacao() {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: environment.API_KEY,
      },
    };
  }
}
