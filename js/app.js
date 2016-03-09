$(document).ready(function() {
	$('.progress').fadeOut('100', function() {
		$('.content').fadeIn();
	});

	$('.datepicker').pickadate({
		selectMonths: true,
		selectYears: 16,
		labelMonthNext: 'Próximo mes',
		labelMonthPrev: 'Mes anterior',
		labelMonthSelect: 'Seleccionar año',
		monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
		monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
		weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
		weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb' ],
		weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		today: 'Hoy',
		clear: 'Limpiar',
		close: 'Cerrar'		
	});

	//quitar decimales 
	jQuery('.numerosInput').keyup(function () { 
		this.value = this.value.replace(/[^0-9\.]/g,'');

	});
	
	// escribir números
	function converText(num){
		var num = parseFloat(num).toFixed(2);
		var decimales = num.toString().substring(num.toString().indexOf(".")+1);
		var entero = num.toString().substring(0,num.toString().indexOf("."));
		var entero = parseFloat(entero).toString().split("").reverse();
		var texto = "";

		for (var i=0; i<entero.length; i+=3){
			var completo = texto;
			var par = entero[i+1];
			if (entero[i+1] != undefined ) {
				par = parseFloat(entero[i+1].toString()+entero[i].toString());
			} else{
				par = parseFloat(entero[i].toString());
			};
			if ( entero[i+2] != undefined ) {
				texto = centena[entero[i+2]] + ' ';
			} else{
				texto = "";
			};

			if ( par<10 ) {
				texto += unidad[par];
			} else{
				if ( par<30 ) {
					texto += unicos[par-10];
				} else{
					texto += decena[entero[i+1]];
					if (decena[entero[i+1]]) {
						if (entero[i]=='0') {
							texto +='';	
						}else{
							texto += (" y "+unidad[entero[i]]);
						};
					};
				};
			};


			if (texto == 'ciento cero') {
				texto = 'cien';
			} else{
				texto = texto;
			};

			if ( 2 < i && i < 6 ){
				if (texto == "uno") {
					texto = "mil ";
				} else{
					texto = texto.replace("uno","un") + " mil ";
				};
			};
			if ( 5 < i && i < 9 ){
				if (texto == "uno" ) {
					texto = "un millón ";
				} else{
					texto = texto.replace("uno","un") + " millones ";
				};
			};

			texto = texto.replace("  "," ");
			texto = texto.replace(" cero","");

			texto += completo;
		}
		// console.log(texto);
		return texto;

	}
	// texto números
	var unicos = new Array("diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve");
	var unidad = new Array("cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve");
	var decena = new Array("", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa");
	var centena = new Array("", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos");	

	// formater dinero
	var formatNumber = {
		separador: ".",
		sepDecimal: ',',
		formatear:function (num){
			num +='';
			var splitStr = num.split('.');
			var splitLeft = splitStr[0];
			var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
			var regx = /(\d+)(\d{3})/;
			while (regx.test(splitLeft)) {
				splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
			}
			return this.simbol + splitLeft  +splitRight;
		},
		new:function(num, simbol){
			this.simbol = simbol ||'';
			return this.formatear(num);
		}
	}

	// print cheque
	$('#cursar').on('click', function(event) {
		// event.preventDefault();
		var montoNumerico = $('#monto').val();
		var destinatario = $('#nombre').val();
		var fecha = $('#fecha').val();
		var valorText = converText(montoNumerico);
		var valorNum = formatNumber.new(montoNumerico);

		if ($('#monto').hasClass('valid')) {
			$('#printFecha').html(fecha);
			$('#printMontoNum').html(valorNum);
			$('#printNombre').html(destinatario);
			$('#printMontoText').html(valorText + '.-');			
			$('#modalCheque').openModal();
		};
	});






});
