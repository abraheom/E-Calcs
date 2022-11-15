class HFECanvas {
	FPS = 60; // Intervalo de actualizacion por segundo en el canvas
	canvas = undefined;
	ctx = undefined;
	numeroCuadriculas = 12;
	tamanioCuadricula = 0;
	punto0X = 0;
	punto0Y = 0;
	amperiosPorDivision = 0.005;
	voltiosPorDivision = 0.00;
	Ic_sat = 0.00;
	Vce = 0.00;

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		console.log("Se inicio HFECanvas");

		this.init();
	}

	// Setter y Getters
	setTamanio = (w,h) => { 
		this.canvas.width = w;
		this.canvas.height = h;
	}

	setNumeroCuadriculas = (n) => {
		this.numeroCuadriculas = n;
		this.tamanioCuadricula = this.canvas.width / this.numeroCuadriculas;
		this.punto0X = this.tamanioCuadricula;
		this.punto0Y = this.canvas.height-this.tamanioCuadricula;
	}

	setAmperiosPorDivision(i){
		this.amperiosPorDivision = i;
	}


	setVoltiosPorDivision(v){
		this.voltiosPorDivision = v;
	}

	// Funciones
	dibujarLinea = (config) => {
		this.ctx.beginPath();
		this.ctx.moveTo(config.x1,config.y1);
		this.ctx.lineTo(config.x2,config.y2);
		this.ctx.lineWidth = config.size;
		this.ctx.strokeStyle = config.color;
		this.ctx.stroke();
	}

	dibujarTexto = (texto, posX, posY) => {
		this.ctx.font = "20px Arial";
		this.ctx.fillStyle = "#f1c40f";
		this.ctx.fillText(texto, posX, posY);
	}

	limpiarPantalla = () => {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	};

	dibujarCuadriculas = () => {
		for (let i = 0; i < this.numeroCuadriculas; i++) {
			this.dibujarLinea({
				x1:0,
				y1:this.tamanioCuadricula*i,
				x2:this.canvas.width,
				y2:this.tamanioCuadricula*i,
				size: 0.2,
				color:"#aaa"});
			
			this.dibujarLinea({
				x1:this.tamanioCuadricula*i,
				y1:0,
				x2:this.tamanioCuadricula*i,
				y2:this.canvas.height,
				size: 0.2,
				color:"#aaa"});
		}
	};

	dibujarEjes = () => {
		// Eje de I
		this.dibujarLinea({
			x1:this.punto0X,
			y1:this.tamanioCuadricula,
			x2:this.punto0X,
			y2:this.punto0Y,
			size: 1,
			color:"#f1c40f"
		});

		// Eje de Vce
		this.dibujarLinea({
			x1:this.punto0X,
			y1:this.punto0Y,
			x2:this.canvas.width - this.tamanioCuadricula,
			y2:this.punto0Y,
			size: 1,
			color:"#f1c40f"
		});

		// Textos de I
		for (let i = 1; i < this.numeroCuadriculas; i++) {
			this.dibujarTexto((i*this.amperiosPorDivision*1000).toFixed(2), this.punto0X -45,this.punto0Y - (i*this.tamanioCuadricula));
		}
		this.dibujarTexto("Isat", this.punto0X - 25,this.tamanioCuadricula -25);
		
		// Textos de Vce
		for (let i = 0; i < this.numeroCuadriculas; i++) {
			this.dibujarTexto(i*this.voltiosPorDivision, this.punto0X + (this.tamanioCuadricula * i),this.punto0Y + 25);
		}
		this.dibujarTexto("Vce", this.canvas.width-this.tamanioCuadricula,this.punto0Y + 50);
	}
	dibujarRectaCarga = (Ic_sat,Vce)=> {
		this.Ic_sat = Ic_sat;
		this.Vce = Vce;
	}

	dibujarRectaCarga = ()=> {
		this.Ic_sat = Ic_sat;
		this.Vce = Vce;

		this.dibujarLinea({
			x1:this.punto0X,
			y1:this.punto0Y - ((this.Ic_sat*1000)*this.tamanioCuadricula/(this.amperiosPorDivision*1000)),
			x2:this.punto0X + (this.Vce*this.tamanioCuadricula/this.voltiosPorDivision),
			y2:this.punto0Y,
			size: 1,
			color:"#16a085"
	});
	}

	init = () => {
		this.drawer(this.FPS);
	};

	drawer = ()=> {
		setInterval(()=>{
			this.limpiarPantalla();

			this.dibujarCuadriculas();
			this.dibujarEjes();
			this.dibujarRectaCarga();
		}, 1000 / this.FPS);
	}

}