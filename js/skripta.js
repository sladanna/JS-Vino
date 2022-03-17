var upozorenje = {
	crveno: ["Prokupac", "Cabernet Sauvignon"],
	belo: "Sauvignon blanc"
};

var vina = [{naziv: "Svb Rosa", drzava: "Srbija"}, {naziv: "Port", drzava: "Portugal"}, 
					{naziv: "Dom", drzava:"Francuska"}];

function validiraj(forma){
	var retVal = true;

	if(forma.naziv.value.trim() == ""){
		retVal = false;
	}

	if(forma.drzava.value.trim() == ""){
		retVal = false;
	}

	if(forma.cena.value.trim() == "" || isNaN(forma.cena.value) || Number(forma.cena.value) < 0){
		retVal = false;
	}

	if(forma.varijanta.value.trim() == ""){
		retVal = false;
	}

	if(forma.sorta.value == "Prazno") {
		retVal = false;
	}

	if((forma.varijanta.value == "belo" && forma.sorta.value != "Sauvignon blanc") || (forma.varijanta.value == "crveno" && forma.sorta.value == "Sauvignon blanc")){
		retVal = false;
	}

	var pronasaoVinoIzNiza = false;
	for(var i = 0; i < vina.length; i++){
		if(forma.naziv.value.trim() == vina[i]["naziv"] && forma.drzava.value.trim() == vina[i]["drzava"]){
			pronasaoVinoIzNiza = true;
		}
	}

	if(pronasaoVinoIzNiza == false){
		retVal = false;
	}//Umesto ovog if-a mogli bi da stavimo samo u returnu: return retVal && pronasaoVinoIzNiza;

	return retVal;
}

function promenaVarijante(selekt){
	//Po potrebi mozete uvek dodati id u odgovarajuci span tag.
	var span = document.querySelector("#select_sorta").querySelector("span");
	if(selekt.value == "crveno"){
		span.innerHTML = upozorenje[selekt.value].join(", ");
	}else{
		span.innerHTML = upozorenje[selekt.value];
	}

}