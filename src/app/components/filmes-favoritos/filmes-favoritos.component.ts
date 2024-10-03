import { Component, Input } from '@angular/core';
import { FilmeFavorito } from '../../models/filme-favorito.model';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-filmes-favoritos',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './filmes-favoritos.component.html',
  styleUrl: './filmes-favoritos.component.scss',
})
export class FilmesFavoritosComponent {
  @Input({ required: true }) filmes!: FilmeFavorito[];
}
