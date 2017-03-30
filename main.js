//General vars
var layersTypes = ["fc","dropout","flat","reshape","conv1","conv2","conv3","maxp1","maxp2","maxp3","avep1","avep2","avep3","rnn","gru","lstm","wembed"];
var kerasLayers = ["Dense","Dropout","Flatten","Reshape","Conv1D","Conv2D","Conv3D","MaxPooling1D","MaxPooling2D","MaxPooling3D","AveragePooling1D","AveragePooling2D","AveragePooling3D","SimpleRNN","GRU","LSTM","Embedding"];
var layers =  new Array();
var layersOutput = new Array();



$("#btn").click(function(){
  layers = new Array();
  layersOutput = new Array();
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
  console.log(layers)
  console.log(layersOutput)
});


//Function to parse keras syntax
function getKeras(inputText){
  var lines = inputText.split("\n");
  for(var i = 0;i != lines.length;i++){
    for(var t = 0;t != layersTypes.length;t++){
      if(lines[i].indexOf(kerasLayers[t]) != -1){
        layers.push(layersTypes[t]);
        var str = lines[i].split(",");

        if(kerasLayers[t] != "Flatten" && kerasLayers[t] != "Reshape"){
            for(var p in str){
              var search = kerasLayers[t]+"(";
              if(str[p].indexOf(search) != -1){
                try{
                  layersOutput.push(parseInt(str[p].slice(str[p].indexOf(kerasLayers[t]+"(")+(kerasLayers[t].length+1),str[p].length).replace(")",""))) // )
                }catch(o){
                  alert(o);
                }
              }
            }
        }else if (kerasLayers[t] == "Flatten") {
            layersOutput.push(-1)
        }
        else if(kerasLayers[t] == "Reshape"){
          layersOutput.push(null)
        }
    }

  }
}
}


//Function To parse tflearn syntax
function getTFlearn(inputText){
var tfLayers = ["fully_connected","dropout","flatten","reshape","conv_1d","conv_2d","conv_3d","max_pool_1d","max_pool_2d","max_pool_3d","avg_pool_1d","avg_pool_2d","avg_pool_3d"];
  var lines = inputText.split("\n");
  for(var i = 0;i != lines.length;i++){
    for(var t = 0;t != tfLayers.length;t++){
      if(lines[i].indexOf(tfLayers[t]) != -1){
        layers.push(layersTypes[t]);
      }
    }
  }
}

//Funtction to implement text like description(in the future...)
function getText(inputText){
  var lines = inputText.split("\n");

}

function buildChart(){

}
