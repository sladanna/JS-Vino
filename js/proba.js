var k;
var vinoteke = [];
var aktivnaVinoteka = null;
function promeniAktivnu(selekt) {
    aktivnaVinoteka = vinoteke.filter(function (elem) { return elem.id == Number(selekt.value); })[0];
    refreshIspis();
}
var Vino = /** @class */ (function () {
    function Vino(naziv, cena, varijanta) {
        this.naziv = naziv;
        this.cena = cena;
        this.varijanta = varijanta;
    }
    return Vino;
}());
var Vinoteka = /** @class */ (function () {
    function Vinoteka(id, naziv) {
        this._id = id;
        this._naziv = naziv;
        this._vina = [];
    }
    Object.defineProperty(Vinoteka.prototype, "naziv", {
        get: function () {
            return this._naziv;
        },
        set: function (param) {
            this._naziv = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vinoteka.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (param) {
            this._id = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vinoteka.prototype, "vina", {
        get: function () {
            return this._vina;
        },
        enumerable: true,
        configurable: true
    });
    Vinoteka.prototype.dodajVino = function (vino) {
        this._vina.push(vino);
    };
    Vinoteka.prototype.getNajskuplje = function () {
        return this._vina.reduce(function (prev, next) {
            if (prev.cena > next.cena)
                return prev;
            else
                return next;
        });
    };
    Vinoteka.prototype.getNajjeftnije = function () {
        return this._vina.reduce(function (prev, next) {
            if (prev.cena < next.cena)
                return prev;
            else
                return next;
        });
    };
    Vinoteka.prototype.najzastupljenijaVarijanta = function () {
        var outDiv = document.getElementById("varijante");
        var crno = this._vina.filter(function (el) { return el.varijanta == "Crno"; });
        var belo = this._vina.filter(function (el) { return el.varijanta == "Belo"; });
        var rose = this._vina.filter(function (el) { return el.varijanta == "Rose"; });
        var kat = [];
        if (crno.length >= belo.length && crno.length >= rose.length) {
            kat = crno;
        }
        else if (belo.length >= rose.length) {
            kat = belo;
        }
        else {
            kat = rose;
        }
        if (kat.length == 0) {
            outDiv.innerHTML = "<h3>Vinoteka " + aktivnaVinoteka.naziv + " jos uvek nema vina za prodaju!!<h3>";
        }
        else {
            outDiv.innerHTML = "<h3>Najzastupljenija varijanta za vinoteku " + aktivnaVinoteka.naziv + " je: <br/>" +
                (kat[0].varijanta + " sa ukupno " + kat.length + " vina.</h3>");
        }
    };
    Vinoteka.prototype.najskupljaVarijanta = function () {
        var outDiv = document.getElementById("varijante");
        var telefon = this._vina.filter(function (el) { return el.varijanta == "Crno"; });
        var laptop = this._vina.filter(function (el) { return el.varijanta == "Belo"; });
        var konzola = this._vina.filter(function (el) { return el.varijanta == "Rose"; });
        var kat = [];
        if (telefon.reduce(function (prev, next) { return prev + next.cena; }, 0) >= laptop.reduce(function (prev, next) { return prev + next.cena; }, 0) && telefon.reduce(function (prev, next) { return prev + next.cena; }, 0) >= konzola.reduce(function (prev, next) { return prev + next.cena; }, 0)) {
            kat = telefon;
        }
        else if (laptop.reduce(function (prev, next) { return prev + next.cena; }, 0) >= konzola.reduce(function (prev, next) { return prev + next.cena; }, 0)) {
            kat = laptop;
        }
        else {
            kat = konzola;
        }
        if (kat.length == 0) {
            outDiv.innerHTML = "<h3>Vinoteka " + aktivnaVinoteka.naziv + " jos uvek nema vina za prodaju!!<h3>";
        }
        else {
            outDiv.innerHTML = "<h3>Najskuplja varijanta u vinoteci " + aktivnaVinoteka.naziv + " je : <br/>" +
                (kat[0].varijanta + " sa prosecnom cenom po vinu: " + kat.reduce(function (prev, next) { return prev + next.cena; }, 0) / kat.length + ".");
        }
    };
    return Vinoteka;
}());
function refreshIspis() {
    var output = '<ul class="list-group">';
    for (var i = 0; i < aktivnaVinoteka.vina.length; i++) {
        var klasa = "";
        if (aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajskuplje().naziv) {
            klasa = "list-group-item-danger";
        }
        if (aktivnaVinoteka.vina.length > 0 && aktivnaVinoteka.vina[i].naziv == aktivnaVinoteka.getNajjeftnije().naziv) {
            klasa = "list-group-item-success";
        }
        output += "<li class=\"list-group-item " + klasa + "\">" + aktivnaVinoteka.vina[i].naziv +
            (" (" + aktivnaVinoteka.vina[i].varijanta + ") ") +
            ("<span class=\"badge\">" + aktivnaVinoteka.vina[i].cena + "</span></li>");
    }
    output += "</ul>";
    var outDiv = document.getElementById("vina");
    outDiv.innerHTML = output;
}
function wireEvents() {
    document.getElementById("dodajVino").addEventListener("click", function () {
        var naziv = document.getElementById("naziv");
        var cena = document.getElementById("cena");
        var varijanta = document.getElementById("varijanta");
        var p = new Vino(naziv.value, Number(cena.value), varijanta.value);
        aktivnaVinoteka.dodajVino(p);
        refreshIspis();
    });
    document.getElementById("najzastupljenijaVarijanta").addEventListener("click", function () {
        aktivnaVinoteka.najzastupljenijaVarijanta();
    });
    document.getElementById("najskupljaVarijanta").addEventListener("click", function () {
        aktivnaVinoteka.najskupljaVarijanta();
    });
}
window.onload = function () {
    k.forEach(function (elem) {
        var s = new Vinoteka(Number(elem.id), elem.naziv);
        elem.vina.forEach(function (elem) {
            var p = new Vino(elem.naziv, Number(elem.cena), elem.varijanta);
            s.dodajVino(p);
        });
        vinoteke.push(s);
        if (aktivnaVinoteka == null) {
            aktivnaVinoteka = s;
        }
    });
    var selekt = document.getElementById("vinoteka");
    var output = "";
    for (var i = 0; i < vinoteke.length; i++) {
        var optionElem = "<option value=" + vinoteke[i].id + ">" + vinoteke[i].naziv + "</option>";
        output += optionElem;
    }
    selekt.innerHTML = output;
    refreshIspis();
    wireEvents();
};
//# sourceMappingURL=proba.js.map