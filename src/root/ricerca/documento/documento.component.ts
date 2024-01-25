import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ServizioBibliotecaService } from '../../servizio-biblioteca.service';
import { AjaxResponse } from 'rxjs/ajax';
import { Archivio } from '../../archivio';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css'],
  imports: [ CommonModule ],
  standalone: true,
  providers: [ ServizioBibliotecaService ],
})
export class DocumentoComponent implements OnInit {
  Titolo : string = "Descrizione del documento";
  @Input() selezione : string | undefined;
  @Input() risultato!: string | string[];

  debitore(){
    var nominativo: HTMLInputElement = document.getElementById('nominativo') as HTMLInputElement;
    var campo_nome:  HTMLElement = document.getElementById('campo_nome') as HTMLElement;
    var posizione: HTMLElement = document.getElementById('posizione') as HTMLElement;
    var output: HTMLElement = document.getElementById('output') as HTMLInputElement;
    var biblio: Archivio;
    this.bs.getData().subscribe({
      next: (res: AjaxResponse<any>) => {
        const archivioData = JSON.parse(res.response);
        biblio = new Archivio(archivioData.libri);
        biblio.libri.map((valore) => {
          if (valore.posizione==posizione.innerHTML) {
            valore.debitore = nominativo.value;
            this.bs.setData(biblio).subscribe({
              next: (res: AjaxResponse<any>) =>{
                output.innerHTML = "Presito eseguito";
                campo_nome.setAttribute('hidden','true');
              },
              error: (err) =>{
                console.error('Observer got an error: ' + JSON.stringify(err));
                output.innerHTML = "Errore nell'inserimento";
              },
            });
          }
        })
        
      },
      error: (err) =>{
        console.error('Observer got an error: ' + JSON.stringify(err));
        output.innerHTML = "Biblioteca non trovata";
      },
    });
  }
  
  rimozione(){
    var posizione: HTMLElement = document.getElementById('posizione') as HTMLElement;
    var output: HTMLElement = document.getElementById('output') as HTMLInputElement;
    var biblio: Archivio;
    var new_biblio: Archivio;
    this.bs.getData().subscribe({
      next: (res: AjaxResponse<any>) => {
        const archivioData = JSON.parse(res.response);
        biblio = new Archivio(archivioData.libri);
        new_biblio = new Archivio(biblio.libri.filter((value)=>value.posizione!=posizione.innerHTML));
        this.bs.setData(new_biblio).subscribe({
          next: (res: AjaxResponse<any>) =>{
            this.selezione = undefined;
          },
          error: (err) =>{
            console.error('Observer got an error: ' + JSON.stringify(err));
            output.innerHTML = "Errore nell'inserimento";
          },
        });
      },
      error: (err) =>{
        console.error('Observer got an error: ' + JSON.stringify(err));
        output.innerHTML = "Biblioteca non trovata";
      },
    });
  }

  restituzione(){
    var button: HTMLElement = document.getElementById('bottone_restituzione') as HTMLElement;
    var posizione: HTMLElement = document.getElementById('posizione') as HTMLElement;
    var output: HTMLElement = document.getElementById('output') as HTMLInputElement;
    var biblio: Archivio;
    this.bs.getData().subscribe({
      next: (res: AjaxResponse<any>) => {
        const archivioData = JSON.parse(res.response);
        biblio = new Archivio(archivioData.libri);
        biblio.libri.map((valore) => {
          if (valore.posizione==posizione.innerHTML) {
            valore.debitore = undefined;
            this.bs.setData(biblio).subscribe({
              next: (res: AjaxResponse<any>) =>{
                output.innerHTML = "Libro restituito";
                button.setAttribute("hidden","true")
              },
              error: (err) =>{
                console.error('Observer got an error: ' + JSON.stringify(err));
                output.innerHTML = "Errore nell'inserimento";
              },
            });
          }
        })
        
      },
      error: (err) =>{
        console.error('Observer got an error: ' + JSON.stringify(err));
        output.innerHTML = "Biblioteca non trovata";
      },
    });
  }

  constructor(private bs: ServizioBibliotecaService) {}

  ngOnInit() {
  }

}