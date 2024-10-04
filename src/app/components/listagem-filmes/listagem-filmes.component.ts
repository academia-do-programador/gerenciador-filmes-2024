import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilmeFavorito } from '../../models/filme-favorito.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { FilmesFavoritosComponent } from '../filmes-favoritos/filmes-favoritos.component';
import { BarraBuscaComponent } from '../barra-busca/barra-busca.component';
import { CardFilmeComponent } from '../shared/card-filme/card-filme.component';
import { BotaoPaginacaoComponent } from '../shared/botao-paginacao/botao-paginacao.component';

@Component({
  selector: 'app-listagem-filmes',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    RouterLink,
    FilmesFavoritosComponent,
    BarraBuscaComponent,
    CardFilmeComponent,
    BotaoPaginacaoComponent,
  ],
  templateUrl: './listagem-filmes.component.html',
})
export class ListagemFilmesComponent implements OnInit {
  public filmes: ListagemFilme[];

  public filmesFavoritos: FilmeFavorito[];

  public carregandoListagem: boolean;

  private pagina: number;

  constructor(
    private filmeService: FilmeService,
    private localStorageService: LocalStorageService
  ) {
    this.filmes = [];
    this.filmesFavoritos = [];
    this.pagina = 1;
    this.carregandoListagem = false;
  }

  ngOnInit(): void {
    this.buscarFilmesPopulares();

    this.filmesFavoritos = this.localStorageService.obterFavoritos();
  }

  public buscarFilmesPopulares() {
    this.carregandoListagem = true;

    this.filmeService.selecionarFilmesPopulares(this.pagina).subscribe((f) => {
      const resultados = f.results as any[];

      const filmesMapeados = resultados.map(this.mapearListagemFilme);

      this.filmes.push(...filmesMapeados);

      this.pagina++;

      this.carregandoListagem = false;
    });
  }

  private mapearListagemFilme(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: obj.vote_average * 10,
    };
  }
}
