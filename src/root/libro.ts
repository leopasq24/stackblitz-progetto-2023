export class Libro {
  autore: string;
  titolo: string;
  posizione: string | undefined;
  debitore: string | undefined;
  constructor(autore: string, titolo: string, posizione: string, debitore: string | undefined) {
    this.autore=autore;
    this.titolo=titolo;
    this.posizione=posizione;
    this.debitore=debitore;
  }

}