function calcular(){
    // Obtener componentes de entrada y salida de texto
    let inp_Vcc = document.getElementById("inp_Vcc");
    let inp_beta = document.getElementById("inp_beta");
    let inp_Ic = document.getElementById("inp_Ic");

    let inp_r1 = document.getElementById("inp_r1");
    let inp_r2 = document.getElementById("inp_r2");
    let inp_r3 = document.getElementById("inp_r3");
    let inp_r4 = document.getElementById("inp_r4");

    // Obtener valores de entrada
    let Vcc  = inp_Vcc.value;
    let beta = inp_beta.value;
    let Ic = inp_Ic.value;
    let r1 = inp_r1.value;
    let r2 = inp_r2.value;
    let r3 = inp_r3.value;
    let r4 = inp_r4.value;

    // Resolucion de operaciones
    // Corriente de base
    let voltajeMedio = Vcc / 2;

    let Ib = Ic / beta;

    let vR1 = voltajeMedio / (Ib*100);
    let vR2 = voltajeMedio / (Ib*100);
    let vR3 = voltajeMedio / Ic;
    let vR4 = (voltajeMedio - 0.7) / Ic;

    inp_r1.value = vR1 + " Ω";
    inp_r2.value = vR2 + " Ω";
    inp_r3.value = vR3 + " Ω";
    inp_r4.value = vR4 + " Ω";

    console.log("Voltaje medio: ", voltajeMedio);
    console.log("Ib:", Ib);
    console.log("R1:", vR1);
    console.log("R2:", vR2);
    console.log("R4:", vR4);
};