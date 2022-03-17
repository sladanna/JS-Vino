var k: any;
let vinoteke: Vinoteka[] = [];
let aktivnaVinoteka: Vinoteka = null;

function promeniAktivnu(selekt: HTMLSelectElement){
    aktivnaVinoteka = vinoteke.filter((elem) => elem.id == Number(selekt.value))[0]; 
    refreshIspis();
}

class Vino {
    naziv: string;
    cena: number;
    varijanta: string;
    constructor(naziv: string, cena: number, varijanta: string){
        this.naziv = naziv;
        this.cena = cena;
        this.varijanta = varijanta;
    }
}

class Vinoteka {
    private _naziv: string;
    private _id: number;
    private _vina: Vino[];

    constructor(id: number, naziv: string) {
        this._id = id;
        this._naziv = naziv;
        this._vina = [];        
    }

    get naziv(): string{
        return this._naziv;
    }

    set naziv(param: string) {
        this._naziv = param;
    }

    get id(): number{
        return this._id;
    }

    set id(param: number) {
        this._id = param;
    }

    get vina(): Vino[] {
        return this._vina;
    }

    dodajVino(vino: Vino): void {
        this._vina.push(vino);
    }

    getNajskuplje(): Vino {
        return this._vina.reduce((prev, next) => {
            if(prev.cena > next.cena)
                return prev;
            else
                return next;
        });
    }

    getNajjeftnije(): Vino {
        return this._vina.reduce((prev, next) => {
            if(prev.cena < next.cena)
                return prev;
            else
                return next;
        });
    }

    najzastupljenijaVarijanta(): void {
        let outDiv: HTMLElement = document.getElementById("varijante");
        let crno: Vino[] = this._vina.filter((el) => el.varijanta == "Crno");
        let belo: Vino[] = this._vina.filter((el) => el.varijanta == "Belo");
        let rose: Vino[] = this._vina.filter((el) => el.varijanta == "Rose");
        let kat: Vino[] = [];
        
        if(crno.length >= belo.length && crno.length >= rose.length){
            kat = crno;
        }else if(belo.length >= rose.length){
            kat = belo;
        }else{
            kat = rose;
        }

        if(kat.length == 0){
            outDiv.innerHTML = `<h3>Vinoteka ${aktivnaVinoteka.naziv} jos uvek nema vina za prodaju!!<h3>`;
        }else{
            outDiv.innerHTML = `<h3>Najzastupljenija varijanta za vinoteku ${aktivnaVinoteka.naziv} je: <br/>` +
                               `${kat[0].varijanta} sa ukupno ${kat.length} vina.</h3>`;
        }

    }

    najskupljaVarijanta(): void {
        let outDiv: HTMLElement = document.getElementById("varijante");
        let telefon: Vino[] = this._vina.filter((el) => el.varijanta == "Crno");
        let laptop: Vino[] = this._vina.filter((el) => el.varijanta == "Belo");
        let konzola: Vino[] = this._vina.filter((el) => el.varijanta == "Rose");
        let kat: Vino[] = [];

         if(telefon.reduce((prev, next) => prev + next.cena, 0) >= laptop.reduce((prev, next) => prev + next.cena, 0) && telefon.reduce((prev, next) => prev + next.cena, 0) >= konzola.reduce((prev, next) => prev + next.cena, 0)){
            kat = telefon;
        }else if(laptop.reduce((prev, next) => prev + next.cena, 0) >= konzola.reduce((prev, next) => prev + next.cena, 0)){
            kat = laptop;
        }else{
            kat = konzola;
        }

        if(kat.length == 0){
           outDiv.innerHTML = `<h3>Vinoteka ${aktivnaVinoteka.naziv} jos uvek nema vina za prodaju!!<h3>`;
        }else{
            outDiv.innerHTML = `<h3>Najskuplja varijanta u vinoteci ${aktivnaVinoteka.naziv} je : <br/>` +
                               `${kat[0].varijanta} sa prosecnom cenom po vinu: ${kat.reduce((prev, next) => prev + next.cena, 0) / kat.length}.`;
        }
    }
}

function refreshIspis(): void {
    let output: string = '<ul class="list-group">';

    for(let i = 0; i < aktivnaVinoteka.vina.length; i++){
        
        let klasa = "";
        if(aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajskuplje().naziv){
            klasa = "list-group-item-danger";
        }
        if(aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajjeftnije().naziv){
            klasa = "list-group-item-success";
        }

        output += `<li class="list-group-item ${klasa}">${aktivnaVinoteka.vina[i].naziv}` + 
                  ` (${aktivnaVinoteka.vina[i].varijanta}) `+
                  `<span class="badge">${aktivnaVinoteka.vina[i].cena}</span></li>`;
    }

    output += "</ul>"
    let outDiv: HTMLElement = document.getElementById("vina");
    outDiv.innerHTML = output;
}

function wireEvents(): void {
    document.getElementById("dodajVino").addEventListener("click", ()=>{
        let naziv: HTMLInputElement = document.getElementById("naziv") as HTMLInputElement; 
        let cena: HTMLInputElement = document.getElementById("cena") as HTMLInputElement;
        let varijanta: HTMLSelectElement = document.getElementById("varijanta") as HTMLSelectElement;
        let p: Vino = new Vino(naziv.value, Number(cena.value), varijanta.value);
        aktivnaVinoteka.dodajVino(p);
        refreshIspis();
    });

    document.getElementById("najzastupljenijaVarijanta").addEventListener("click", ()=>{
        aktivnaVinoteka.najzastupljenijaVarijanta();
    });

     document.getElementById("najskupljaVarijanta").addEventListener("click", ()=>{
        aktivnaVinoteka.najskupljaVarijanta();
    });


}


window.onload = function() {
    k.forEach((elem) => {
        let s: Vinoteka = new Vinoteka(Number(elem.id), elem.naziv);
        elem.vina.forEach((elem) => {
            let p: Vino = new Vino(elem.naziv, Number(elem.cena), elem.varijanta);
            s.dodajVino(p);
        });
        vinoteke.push(s);
        if(aktivnaVinoteka == null){
            aktivnaVinoteka = s;
        }
    });
 
    let selekt: HTMLElement = document.getElementById("vinoteka");
    let output: string = "";
    for(let i = 0; i < vinoteke.length; i++){
        let optionElem = `<option value=${vinoteke[i].id}>${vinoteke[i].naziv}</option>`;
        output += optionElem;         
    }
    selekt.innerHTML = output;
    refreshIspis();
    wireEvents();
}
