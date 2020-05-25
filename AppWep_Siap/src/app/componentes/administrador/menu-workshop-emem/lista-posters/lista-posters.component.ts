import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/general.service';
import { Poster } from '../../../../interfaces/interfaces.interfaces';

@Component({
  selector: 'app-lista-posters',
  templateUrl: './lista-posters.component.html',
  styles: []
})
export class ListaPostersComponent implements OnInit {

  posters: Poster[] = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.obtenerListaPosters();
  }

  obtenerListaPosters() {
    this.generalService.getObtenerListaPosters().subscribe((rListaPosters: any) => {
      console.log(rListaPosters);
      this.posters = rListaPosters.Poster;
    });
  }

}
