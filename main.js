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
    if(lines[i].indexOf("Dropout") != -1){
      layersType.push("dropout");
    }
    if(lines[i].indexOf("Flatten") != -1){
      layersType.push("flat");
    }
    if(lines[i].indexOf("Reshape") != -1){
      layersType.push("reshape");
    }
    //Images
    if(lines[i].indexOf("Conv1D") != -1){
      layersType.push("conv1");
    }
    if(lines[i].indexOf("Conv2D") != -1){
      layersType.push("conv2");
    }
    if(lines[i].indexOf("Conv3D") != -1){
      layersType.push("conv3");  
    }
    if(lines[i].indexOf("MaxPooling1D") != -1){
      layersType.push("maxp1");
    }
    if(lines[i].indexOf("MaxPooling2D") != -1){
      layersType.push("maxp2");
    }
     if(lines[i].indexOf("MaxPooling3D") != -1){
      layersType.push("maxp3");
    }
    if(lines[i].indexOf("AveragePooling1D") != -1){
      layersType.push("avep1");
    }
    if(lines[i].indexOf("AveragePooling2D") != -1){
      layersType.push("avep2");
    }
     if(lines[i].indexOf("AveragePooling3D") != -1){
      layersType.push("avep3");
    }
    //RNN
     if(lines[i].indexOf("Recurrent") != -1 || lines[i].indexOf("SimpleRNN") != -1 ){
      layersType.push("rnn");
     }
     if(lines[i].indexOf("GRU") != -1){
      layersType.push("gru");
     }
     if(lines[i].indexOf("LSTM") != -1){
       layersType.push("lstm");
     }
     //Embedding
     if(lines[i].indexOf("Embedding") != -1){
       layersType.push("wembed");
     }


  }
}
function getTFlearn(inputText){
  var lines = inputText.split("\n");
  for(var i = 0;i != lines.length;i++){
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
    

  }
}
function getText(inputText){
  var lines = inputText.split("\n");

}

function buildChart(){

}
