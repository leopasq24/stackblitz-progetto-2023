import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ Archivio } from '../archivio';
import { DocumentoComponent } from './documento/documento.component';
import { ServizioBibliotecaService } from '../servizio-biblioteca.service';
import { AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-ricerca',
  standalone: true,
  imports: [ CommonModule, DocumentoComponent ],
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  providers: [ ServizioBibliotecaService ],
})
export class RicercaComponent implements OnInit {
  @Input() selezione : string | undefined;
  Titolo: string = "Ricerca per titolo e autore";
  risultato : string | string[] = [];

  return(){
    this.selezione = undefined;
  }
  
  ricerca(){
    var input : HTMLInputElement =  document.getElementById('ricerca') as HTMLInputElement;
    var output : HTMLDivElement = document.getElementById('risposta') as HTMLDivElement;
    var stringa : string = input.value;
    var biblio: Archivio;
    this.bs.getData().subscribe({
      next: (res: AjaxResponse<any>) => {
        const archivioData = JSON.parse(res.response);
        biblio = new Archivio(archivioData.libri);
        if (biblio.cerca(stringa).includes("corrispondenze") || biblio.cerca(stringa).includes("Nessun risultato")){
          output.innerHTML = biblio.cerca(stringa).toString();
        }else{
          this.risultato = biblio.cerca(stringa);
          this.selezione = "Documento";
        }
      },
      error: (err) =>{
        console.error('Observer got an error: ' + JSON.stringify(err));
        output.innerHTML = "Errore";
      },
    });
    
  }

  constructor(private bs: ServizioBibliotecaService) { }

  ngOnInit() {
  }

}