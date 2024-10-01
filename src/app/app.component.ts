import { Component, OnInit } from '@angular/core';
import { FilmeService } from './services/filme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.filmeService.selecionarFilmesPopulares().subscribe((f) => {
      console.log(f);
    });
  }
}
