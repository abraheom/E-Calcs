let canvas = window.canvas;

let Ic_sat = 0.02;
let Vce = 5;

// Libreria para manejo de canvas
let hfeCanvas = new HFECanvas(canvas);

hfeCanvas.setTamanio(700,700);
hfeCanvas.setNumeroCuadriculas(12);

hfeCanvas.setAmperiosPorDivision(0.002);
hfeCanvas.setVoltiosPorDivision(0.5);
hfeCanvas.setRectaCarga(Ic_sat, Vce);



/*
let ctx = canvas.getContext("2d");

let numeroCuadriculas = 12;
let cuadricula = canvas.width / numeroCuadriculas;
let posX = 0;
let posY = 0;
let mAPorDivision = 5;


// Variables para calculo electronico
let Vcc = 10;
let Rc = 220;
let beta = 175;

let R1 = 16666;
let R2 = 16666;
let RE = 143;
let Vbb = (R2/(R1+R2)) * Vcc;

let Ve = 0;
let Ic_sat =0;
let Ib =0;
let Ic =0;
let Vc=0;
let Vce =0;

let minVpp = Vcc;
let maxVpp = 0.00;
let minIpp = Ic_sat;
let maxIpp = 0.00;

////////////////////////////////////
let entradaAC_VPP = 0.2;
let entradaACValorActual = 0.0;
let historialVoltajeEntrada = [];

function init() {
	drawer();
	simularEntradaAC();
}
init();

function calcularCircuito() {
	Ic_sat = Vcc / Rc;
	Ve = Vbb + entradaACValorActual - 0.7;
	Ib = Ve / R2;
	Ie = Ve / RE;
	Ic = Ie;
	Vc = Vcc - (Ic * Rc);
	Vce = Vc;

	if(Vce>maxVpp){
		maxVpp = Vce;
		minIpp = Ic;
	}
	else{
		if(Vce<minVpp){
			minVpp = Vce;
			maxIpp = Ic;
		}
	}


	// console.log("Ic_sat: " + Ic_sat);
	// console.log("Ib:" + Ib);
	// console.log("Ie: " + Ie);
	// console.log("Ic: " + Ic);
	// console.log("Vc: "+Vc);
	// console.log("Vbb: " + Vbb);
	// console.log("Ve: " + Ve);
	// console.log("Vce: " + Vce);
}

function drawer() {
	setInterval(function () {
		ctx.clearRect(0, 0, 700, 700);		
		
		dibujarCuadricula(numeroCuadriculas);
		dibujarRecta();
		dibujarEjes(numeroCuadriculas);
		posicionarPuntoQ(Ic, Vce);
		dibujarEntradaAC();
	}, 1000 / 60);
}

function posicionarPuntoQ(_i=0.03,_vce=3.5){
	if(minVpp<0) return;


	let offsetX = cuadricula;
	let offsetY = (canvas.height-cuadricula);

	let posX = offsetX + (_vce * cuadricula);
	let posY = offsetY - (_i*1000*cuadricula/mAPorDivision);

	ctx.beginPath();
	ctx.arc(posX, posY,  5, 0, 2 * Math.PI);
	ctx.stroke();	

	ctx.beginPath();
	ctx.moveTo(cuadricula+(maxVpp*cuadricula), (canvas.height-cuadricula) - (maxIpp*1000*cuadricula/mAPorDivision));
	ctx.lineTo(cuadricula+(maxVpp*cuadricula), canvas.height - cuadricula);
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "#2ecc71";
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(cuadricula+(minVpp*cuadricula), (canvas.height-cuadricula) - (minIpp*1000*cuadricula/mAPorDivision));
	ctx.lineTo(cuadricula+(minVpp*cuadricula), canvas.height - cuadricula);
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "#2ecc71";
	ctx.stroke();


	ctx.fillText(minVpp.toFixed(3) + "v", cuadricula+(minVpp*cuadricula), (canvas.height-cuadricula) - (minIpp*1000*cuadricula/mAPorDivision));
	ctx.fillText(maxVpp.toFixed(3) + "v", cuadricula+(maxVpp*cuadricula), (canvas.height-cuadricula) - (maxIpp*1000*cuadricula/mAPorDivision));

}

function simularEntradaAC(){
	let subida = true;
	setInterval(function(){
		if(subida) {
			entradaACValorActual+= 0.01;
			if(entradaACValorActual>=entradaAC_VPP){
				subida = false;
			}
		}
		else {
			entradaACValorActual-= 0.01;
			if(entradaACValorActual<=entradaAC_VPP*-1){
				subida = true;
			}
		}
		historialVoltajeEntrada.push(entradaACValorActual);
		if(historialVoltajeEntrada.length>50){
			historialVoltajeEntrada.shift();
		}
		calcularCircuito();
	},1000/60);

}

function dibujarEntradaAC(){
		// Dibujar linea en el canvas
		for (let i = 0; i < historialVoltajeEntrada.length; i++) {
			let voltaje = historialVoltajeEntrada[i];
			let ultimoVoltaje = (i>0) ? historialVoltajeEntrada[i-1] : voltaje;
	
			ctx.beginPath();
			ctx.moveTo(500+((i-1)*3), 	cuadricula + (ultimoVoltaje*10));
			ctx.lineTo(500+(i*3), 		cuadricula + (voltaje*10));
			ctx.lineWidth = 2;
			ctx.strokeStyle = "red";
			ctx.stroke();
			ultimoVoltaje = voltaje;
		}
		ctx.font = "15px Console";	
		ctx.fillText("Imin: " + (minIpp*1000).toFixed(2), 500, cuadricula + 25);
		ctx.fillText("Imax: " + (maxIpp*1000).toFixed(2), 500, cuadricula + 50);
		ctx.fillText("Ipp: " + ((maxIpp-minIpp)*1000).toFixed(2), 500, cuadricula + 75);
}

function dibujarEjes(numeroCuadriculas) {
	ctx.font = "20px Console";
	ctx.fillStyle = "#f1c40f";
	ctx.fillText("Ic(mA)", canvas.height / numeroCuadriculas - 25, canvas.width / numeroCuadriculas - 25);
	ctx.fillText("Vce", canvas.height - (canvas.height / numeroCuadriculas), canvas.width - canvas.height / numeroCuadriculas + 45);

	ctx.beginPath();
	ctx.moveTo(700 / numeroCuadriculas, 700 / numeroCuadriculas);
	ctx.lineTo(700 / numeroCuadriculas, 700 - (700 / numeroCuadriculas));

	ctx.moveTo(700 - (700 / numeroCuadriculas), 700 - (700 / numeroCuadriculas));
	ctx.lineTo(700 / numeroCuadriculas, 700 - (700 / numeroCuadriculas));

	ctx.lineWidth = 2;
	ctx.strokeStyle = "#f1c40f";
	ctx.stroke();
}

function dibujarCuadricula(numeroCuadriculas) {
	let anchoCuadricula = 700 / numeroCuadriculas;
	for (let i = 0; i < numeroCuadriculas; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * anchoCuadricula);
		ctx.lineTo(700, i * anchoCuadricula);
		ctx.lineWidth = 0.1;
		ctx.strokeStyle = "#aaa";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(i * anchoCuadricula, 0);
		ctx.lineTo(i * anchoCuadricula, 700);
		ctx.lineWidth = 0.1;
		ctx.strokeStyle = "#aaa";
		ctx.stroke();

		// Texto para miliAmperios por division
		if(i>=1 && i < numeroCuadriculas){
			// Linea Vertical
			ctx.font = "20px Georgia";
			ctx.fillStyle = "#f1c40f";
			ctx.fillText((mAPorDivision*(numeroCuadriculas-2))-((i-1)*mAPorDivision), canvas.height / numeroCuadriculas - 25, i*cuadricula);

			// Linea Horizontal
			ctx.font = "20px Georgia";
			ctx.fillStyle = "#f1c40f";
			ctx.fillText((i-1), i*cuadricula, canvas.width-cuadricula + 20);
		}
	}
}

function dibujarRecta() {
	ctx.beginPath();
	ctx.moveTo(cuadricula, canvas.height - cuadricula - (Ic_sat*1000*cuadricula/mAPorDivision));
	ctx.lineTo(canvas.width-cuadricula, canvas.height - cuadricula);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#2ecc71";
	ctx.stroke();
}


*/