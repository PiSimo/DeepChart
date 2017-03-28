//General vars
var layersType = new Array();
var layersName = new Array();
var outputNumb = new Array();



$("#btn").click(function(){
  layersType = new Array();
  outputNumb = new Array();
  layersName = new Array()

  var p = $(".enter_stuff").val();
  var e = $('input[type="radio"]:checked').val();
  switch(e){
    case "plaintxt":
    getText(p);
    break;
    case "keras":
    getKeras(p);
    break;
    case "tflearn":
    getTFlearn(p);
    break;
  }

});


function getKeras(inputText){
  var lines = inputText.split("\n");
  for(var i = 0;i != lines.length;i++){
    if(lines[i].indexOf("Dense") != -1){
        layersType.push("fc");
    }
    if(lines[i].indexOf("GRU") != -1){
      layersType.push("gru");
    }
    if(lines[i].indexOf("Dropout") != -1){
      layersType.push("dropout");
    }
  }
}
function getTFlearn(inputText){
  var lines = inputText.split("\n");

}
function getText(inputText){
  var lines = inputText.split("\n");

}

function buildChart(){

}
