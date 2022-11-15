let canvas = window.canvas;
canvas.width= 1000;
canvas.height=1000;
let ctx = canvas.getContext("2d");

// Configuracion de vista
let voltaje = 0;
let tiempoPorDivision = 1;

// Captura de controles
let inp_numeroCuadriculas = document.getElementById("numeroCuadriculas");
let inp_voltiosPorDivision = document.getElementById("voltiosPorDivision");
let inp_posicionVoltaje0 = document.getElementById("posicionVoltaje0");
let inp_tiempoPorDivision = document.getElementById("tiempoPorDivision");



let posX = 0;
let posY = 1000/2;


function init(){
    animarVoltaje();
    dibujarCuadricula();
    leerControles();
}
init();

function leerControles(cleanScreen = false, resetearValores=false) {
    if(resetearValores){
        posX = 1000/numeroCuadriculas;
        posY = 1000/numeroCuadriculas;
    }
    if(cleanScreen){
        limpiarPantalla();
    }

    numeroCuadriculas = Number(inp_numeroCuadriculas.value);
    voltiosPorDivision = inp_voltiosPorDivision.value;
    posicionVoltaje0 = inp_posicionVoltaje0.value;
    tiempoPorDivision = Number(inp_tiempoPorDivision.value);

    //dibujarCuadricula(numeroCuadriculas);
    dibujarOffsetVoltaje0();  
}

function limpiarPantalla(){
    ctx.clearRect(0,0,1000,1000);
}
function animarVoltaje(){
        // Animacion de voltaje
        let subida = true;
        setInterval(()=>{
            if(subida){
                voltaje += 0.025;
                voltaje += (0.3-voltaje)*0.70;
                if(voltaje>=0.300){
                    subida=false;
                }
            }
            else {
                voltaje -= 0.025;
                voltaje -= (0.3-voltaje)*0.70;
                if(voltaje<=-0.300){
                    subida=true;
                }
            }
        },1000/60);
}

function dibujarCuadricula(numeroCuadriculas){
  let anchoCuadricula = 1000 / numeroCuadriculas;
  for(let i=0;i<numeroCuadriculas;i++){
    ctx.beginPath();
    ctx.moveTo(0, i*anchoCuadricula);
    ctx.lineTo(1000, i*anchoCuadricula);
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = "#05c46b";
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(i*anchoCuadricula, 0);
    ctx.lineTo(i*anchoCuadricula, 1000);
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = "#05c46b";
    ctx.stroke();
  }  
}

function dibujarOffsetVoltaje0(){
    ctx.beginPath();
    ctx.moveTo(0, 1000/2 + (posicionVoltaje0 * (1000/numeroCuadriculas)));
    ctx.lineTo(1000, 1000/2 + (posicionVoltaje0 * (1000/numeroCuadriculas)));
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#2ecc71";
    ctx.stroke();
}


function animacion(){  
  setInterval(()=>{  
    let offsetVoltaje = 1000/2 + (posicionVoltaje0 * (1000/numeroCuadriculas));
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    posX += tiempoPorDivision;
    posY = offsetVoltaje + (posicionVoltaje0 / (1000/numeroCuadriculas)) + ((1000/numeroCuadriculas / voltiosPorDivision) * voltaje);
    
    ctx.lineTo(posX, posY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffd32a";
    ctx.stroke();

    if(posX>=1000-50) {
        posX = 50;
        voltaje=0;
        limpiarPantalla();
        dibujarCuadricula(numeroCuadriculas);
        dibujarOffsetVoltaje0();
    }
  },1000/60);
}
animacion();