function calcImpedancia(){
    let inp_l = document.getElementById("imp_L");
    let inp_c = document.getElementById("imp_C");
    let inp_r = document.getElementById("imp_r");
    let L = inp_l.value;
    let C = inp_c.value;

    let r = Math.sqrt( (L*0.000001) / (C*0.000000000001));

    inp_r.innerHTML = r.toFixed(4) + " Ω";
}

function calcArmonicos(){
    let arm_f = document.getElementById("arm_f");
    let arm_r = document.getElementById("arm_r");
    let f = arm_f.value;

    let r = "";

    for (let index = 1; index < 20; index++) {
        if(index>1)
            r += (index-1<10 ? "0"+index-1:index-1) + "| " + (f*index) + " Mhz <br>";
    }

    arm_r.innerHTML = r;   
}
function calcPotenciaRF() {
    let pRF_V = document.getElementById("pRF_V");
    let pRF_R = document.getElementById("pRF_R");
    let pRF_VF = document.getElementById("pRF_VF");
    let pRF_RES = document.getElementById("pRF_RES");
    
    let v = Number(pRF_V.value);
    let r = Number(pRF_R.value);
    let vf = Number(pRF_VF.value);

    let vrms = (v+vf)/Math.sqrt(2);
    p = Math.pow(vrms,2) / r;

    let res = "0.00 W";

    if(p >= 0.1){
        res = p.toFixed(3) + " W";
    }
    else if(p >= 0.001){
        res = (p*1000).toFixed(2) + " mW";
    }
    else if(p >= 0.000001){
        res = (p*1000000).toFixed(2) + " µW";
    }

    res += "<br> " + (10*Math.log10(1000*p)).toFixed(4) + " dBm";

    pRF_RES.innerHTML = res;
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}