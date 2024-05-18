function changeTuning() {
    var select = document.getElementById("tuning-select");
    var standardTuning = document.getElementById("standard-tuning");
    var dropDTuning = document.getElementById("drop-d-tuning");
    var dropBTuning = document.getElementById("drop-b-tuning");
    var dadGadTuning = document.getElementById("dad-gad-tuning");
    var openGTuning = document.getElementById("open-g-tuning");
    var ukuleleStandard = document.getElementById("ukulele-standard-tuning");
    var balalaikaStandard = document.getElementById("balalaika-standard-tuning");

    standardTuning.classList.add("hidden");
    dropDTuning.classList.add("hidden");
    dropBTuning.classList.add("hidden");
    dadGadTuning.classList.add("hidden");
    openGTuning.classList.add("hidden");
    ukuleleStandard.classList.add("hidden");
    balalaikaStandard.classList.add("hidden");

    if (select.value === "standard") {
      standardTuning.classList.remove("hidden");
    } else if (select.value === "drop-d") {
      dropDTuning.classList.remove("hidden");
    } else if (select.value === "drop-b") {
      dropBTuning.classList.remove("hidden");
    } else if (select.value === "dad-gad") {
      dadGadTuning.classList.remove("hidden");
    } else if (select.value === "open-g") {
      openGTuning.classList.remove("hidden");
    }else if (select.value === "ukulele-standard") {
      ukuleleStandard.classList.remove("hidden");
    } else if (select.value === "balalaika-standard") {
      balalaikaStandard.classList.remove("hidden");
    }
  }
  
/*var i = 0;
function f1(){
  i++;
  if(i%2) {var tune = document.getElementById("cont1");
  cont1.style.display = "none";}
  else  cont1.style.display = "flex";
}*/