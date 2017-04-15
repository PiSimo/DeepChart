//General vars
var layersTypes = ["fc","dropout","flat","reshape","conv1","conv2","conv3","maxp1","maxp2","maxp3","avep1","avep2","avep3","rnn","rnn","rnn","wembed"];
var kerasLayers = ["Dense","Dropout","Flatten","Reshape","Conv1D","Conv2D","Conv3D","MaxPooling1D","MaxPooling2D","MaxPooling3D","AveragePooling1D","AveragePooling2D","AveragePooling3D","SimpleRNN","GRU","LSTM","Embedding"];
var layers =  new Array();
var layersOutput = new Array();
var layersParameters = new Array();
var topDistance = 200;   //Starting from 200px from the top
var centerLine = 600;

function getPar( str, par){
	var pos = str.indexOf(par);
	if(pos == -1)return -1;
	str = str.slice(str.indexOf(par)+par.length,str.length);
	if(str.indexOf(",")){
		str=str.slice(0,str.indexOf(","))
	}else{
		str=str.slice(0,str.indexOf(")"))
	}

	return str
}

function getArrayPar( str, par){
	var pos = str.indexOf(par);
	if(pos == -1)return -1;
	str = str.slice(str.indexOf(par)+par.length,str.length);
	str = str.slice(str.indexOf("("),str.indexOf(")")+1)
	return str
}
$("#canvas").click(function(){
		to_image();

});

$(".press").click(function(){


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  topDistance = 200;   //Starting from 200px from the top
  centerLine = 600;
  layers = ["input"];
  layersOutput = new Array();
  layersParameters = new Array();
  layersParameters.push(null);
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
  console.log("Network architecture:["+layers+"]")


  buildChart(layers,layersOutput,layersParameters);

});


//Function to parse keras syntax
function getKeras(inputText){
  var lines = inputText.split("\n");
  for(var i = 0;i != lines.length;i++){
    lines[i] = lines[i].split(" ").join("") //OK

    if(lines[i][0] != '#'){
    for(var t = 0;t != layersTypes.length;t++){
      if(lines[i].indexOf(kerasLayers[t]) != -1){
        layers.push(layersTypes[t]);

		//Define input shape
		if(layers.length == 2){
			if(lines[i].indexOf("input_dim") != -1){
				ris = getPar(lines[i],"input_dim=")
				layersOutput.push(parseFloat(ris))
			}
			else if(lines[i].indexOf("input_shape") != -1){
				ris = getArrayPar(lines[i],"input_shape=")
				layersOutput.push(ris)
			}
			else{
				layersOutput.push(-4);
			}
		}

		//Flatten handler
        if(kerasLayers[t] == "Flatten") {
            layersOutput.push(-1)
        }

	//Reshape handler
        else if(kerasLayers[t] == "Reshape"){
            layersOutput.push(lines[i].slice(lines[i].indexOf("Reshape(")+8,lines[i].indexOf(")")+1))

        }

		//Convolutional handler
		else if(kerasLayers[t].indexOf("Conv") != -1){
			if(lines[i].indexOf("filters=") != -1){
				ris = getPar(lines[i],"filters=")
				layersOutput.push(parseFloat(ris))

			}
			else{
				ris = getPar(lines[i],kerasLayers[t]+"(")
				layersOutput.push(parseFloat(ris))
			}

			//Kernel size
			if(lines[i].indexOf("kernel_size") != -1){
				ris = getArrayPar(lines[i],"kernel_size=")
				layersParameters.push(ris)
			}
			else if(lines[i].indexOf("Conv1D") == -1){
				var cannelloni = lines[i].slice(lines[i].indexOf(kerasLayers[t]+"(")+kerasLayers[t].length+1,lines[i].length)
				ris = cannelloni.slice(cannelloni.indexOf("("),cannelloni.indexOf(")")+1)
				layersParameters.push(ris)
			}
			else{
				var cannelloni = lines[i].slice(lines[i].indexOf(kerasLayers[t]+"(")+kerasLayers[t].length+1,lines[i].length);
				ris = cannelloni.slice(cannelloni.indexOf(",")+1,cannelloni.length);

				if(ris.indexOf(",") != -1){
								ris = ris.slice(0,cannelloni.indexOf(","));
				}else{
								ris = ris.slice(0,cannelloni.indexOf(")"));
				}
				layersParameters.push(ris);
			}
		}
		//Pooling layer
		else if(kerasLayers[t].indexOf("Pool") != -1){
			ris = getArrayPar(lines[i],"pool_size=")
			layersOutput.push(ris)
		}
		//All the other layers
    else{
      var str = lines[i].split(",");
			if(lines[i].indexOf("units") != -1){
					ris = getPar(lines[i],"units=")
					ris = parseFloat(ris)
					layersOutput.push(ris)
			}
			else{
				if(lines[i].indexOf(",") != -1){
				  layersOutput.push(parseFloat(lines[i].slice(lines[i].indexOf(kerasLayers[t]+"(")+(kerasLayers[t].length+1),lines[i].indexOf(",")).replace(")",""))) // )
			  }
				else{
					layersOutput.push(parseFloat(lines[i].slice(lines[i].indexOf(kerasLayers[t]+"(")+(kerasLayers[t].length+1),lines[i].indexOf(")")).replace(")",""))) // )

				}
			}
        }

		//If there are no special paramaters set to null
		if(lines[i].indexOf("Conv") == -1){
			layersParameters.push(null)
		}
		break;
    }
  }
  }
}
}


//Function To parse tflearn syntax(in the future...)
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
