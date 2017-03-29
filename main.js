//General vars
var layersTypes = ["fc","dropout","flat","reshape","conv1","conv2","conv3","maxp1","maxp2","maxp3","avep1","avep2","avep3","rnn","gru","lstm","wembed"];


var layers =  new Array();



$("#btn").click(function(){
  layers = new Array();

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
    for(var t = 0;t != layersTypes.length;t++){
      if(lines[i].indexOf(layersTypes[t]) != -1){
        layers.push(layersTypes[i]);
        break;
      }
    }

  }
}

function getTFlearn(inputText){
  var lines = inputText.split("\n");
 /* for(var i = 0;i != lines.length;i++){
    if(lines[i].indexOf("fully_connected") != -1){
        layersType.push("fc");
    }
    if(lines[i].indexOf("dropout") != -1){
        layersType.push("dropout");
    }
    if(lines[i].indexOf("reshape") != -1){
        layersType.push("reshape");
    }
    if(lines[i].indexOf("flatten") != -1){
        layersType.push("flat");
    }
    //IMAGES
    if(lines[i].indexOf("conv_1d") != -1){
        layersType.push("conv1");
    }
    if(lines[i].indexOf("conv_2d") != -1){
        layersType.push("conv2");
    }
    if(lines[i].indexOf("conv_3d") != -1){
        layersType.push("conv3");
    }
    if(lines[i].indexOf("max_pool_1d") != -1){
      layersType.push("maxp1");
    }
    if(lines[i].indexOf("max_pool_2d") != -1){
      layersType.push("maxp2");
    }
    if(lines[i].indexOf("max_pool_3d") != -1){
      layersType.push("maxp3");
    }
    if(lines[i].indexOf("avg_pool_1d") != -1){
      layersType.push("avgp1");
    }
    if(lines[i].indexOf("avg_pool_2d") != -1){
      layersType.push("avgp2");
    }
    if(lines[i].indexOf("avg_pool_3d") != -1){
      layersType.push("avgp3");
    }
    

  }*/
}
function getText(inputText){
  var lines = inputText.split("\n");

}

function buildChart(){

}
