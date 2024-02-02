import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServizioBibliotecaService } from '../servizio-biblioteca.service';
import { AjaxResponse } from 'rxjs/ajax';
import { Archivio } from '../archivio';
import { Libro } from '../libro';

@Component({
  selector: 'app-inserimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
  providers: [ServizioBibliotecaService],
})
export class InserimentoComponent implements OnInit {
  Titolo: string = 'Inserimento di un nuovo volume';
  @Input() selezione: string | undefined;

  return() {
    this.selezione = undefined;
  }
  insert() {
    var autore: HTMLInputElement = document.getElementById(
      'autore'
    ) as HTMLInputElement;
    var titolo: HTMLInputElement = document.getElementById(
      'titolo'
    ) as HTMLInputElement;
    var posizione: HTMLInputElement = document.getElementById(
      'posizione'
    ) as HTMLInputElement;
    var output: HTMLElement = document.getElementById('errore') as HTMLElement;
    var biblio: Archivio;
    var new_libro: Libro;
    var i: number = 0;
    if (autore.value != '' || titolo.value != '' || posizione.value != '') {
      this.bs.getData().subscribe({
        next: (res: AjaxResponse<any>) => {
          const archivioData = JSON.parse(res.response);
          biblio = new Archivio(archivioData.libri);
          new_libro = new Libro(
            autore.value,
            titolo.value,
            posizione.value,
            undefined
          );
          biblio.libri.map((valore) => {
            if (new_libro.posizione == valore.posizione) {
              output.innerHTML = 'Posizione già occupata';
              i++;
            }
          });
          if (i == 0) {
            biblio.libri.push(new_libro);
            this.bs.setData(biblio).subscribe({
              next: (res: AjaxResponse<any>) => {
                output.innerHTML = 'Libro inserito!';
              },
              error: (err) => {
                console.error('Observer got an error: ' + JSON.stringify(err));
                output.innerHTML = "Errore nell'inserimento";
              },
            });
          }
        },
        error: (err) => {
          console.error('Observer got an error: ' + JSON.stringify(err));
          output.innerHTML = 'Biblioteca non trovata';
        },
      });
    } else {
      output.innerHTML = 'I campi non possono essere vuoti!';
    }
  }
  constructor(private bs: ServizioBibliotecaService) {}

  ngOnInit() {}
}
