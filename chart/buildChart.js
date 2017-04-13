//["fc","dropout","flat","reshape","conv1","conv2","conv3",
//"maxp1","maxp2","maxp3","avep1","avep2","avep3","rnn"*3,"wembed"];

var topDistance = 150;   //Starting from 200px from the top
var centerLine = 150;    //The main line is 600px from the left
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width=1200        //Canvas basic width
canvas.height=0;       //Canvas basic height


//Function to generate random number among a range
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawImage(){
  var img = new Image();
  img.addEventListener('load',function(){
      ctx.drawImage(img,centerLine-250,200,500,500);
  });
  img.src = './imgs/inputs/image.png';
  topDistance += 700;
}
//Draw CNN
function drawCNN(wid,hei,nlayer){
  var p = [centerLine,topDistance];
  p[0 ] -= 250;
  var names = ["CnnRed.png","CnnYellow.png","CnnBlue.png","CnnGreen.png"];
  var img = new Image();
  img.addEventListener('load', function() {
    ctx.drawImage(img,p[0],p[1],500,500);
  });

  var c = getRandomInt(0,4);
  img.src = "./imgs/"+names[c];
  ctx.font = '30px Monospace';
  ctx.textColor = "#ffffff";
  ctx.fillText(String(wid),p[0]+210,p[1]+540);    //width text
  ctx.fillText(String(hei),p[0]-80,p[1]+270);     //length text
  ctx.fillText(String(nlayer),p[0]+490,p[1]+500); //Number of f.maps
  topDistance+=700;
}

//Drawing dense layers
function drawFc(n_layers){
  //general vars
  var pos = [centerLine,topDistance];
  var img = new Image();
  var width = 0;
  var height = 200;
  var colors = ["blue/","green/","red/"];
  var name = "./imgs/neurons/";
  name += colors[getRandomInt(0,3)];
	switch(n_layers){        //change width  for the numbers of neurons
		case 1:
		name += "nn1.png";
		width = 170;
		break;
		case 2:
		name += "nn2.png";
		width= 300;
    break;
		case 3:
		name += "nn3.png";
		width=500;
    break;
		default:
		name += "nn4.png";
		width = 800;
	}
 height /= 1.5;
 width  /= 1.5;
 pos[0] = pos[0] -(width/2);
  img.addEventListener('load', function() {
    ctx.drawImage(img,pos[0],pos[1],width,height);
  });

	img.src = name;
  if(n_layers > 3){ //for all those layers with more then 3 neurons
    var centerX = ((pos[0]+(pos[0]+width))/2) -(String(n_layers).length*10);
    var centerY = pos[1] +50;
    ctx.font = '30px Monospace';
    ctx.fillText(String(n_layers),centerX,centerY);
  }
  topDistance += 300;
}

//draw RNN
function drawRnn(n_layers){
  var color = ['orange.png',"pink.png","green.png","purple.png"];
  var height = 140.333;
  var width  = 1100 / 1.5;
  var pos = [centerLine,topDistance];
  pos[0] -= ((1100/1.5)/2)+140;
  var img = new Image();

  img.addEventListener('load',function(){
    ctx.drawImage(img,pos[0],pos[1],width,height);
  });
  img.src = './imgs/rnn/'+color[getRandomInt(0,4)];
  console.log('./imgs/rnn/'+color[getRandomInt(0,4)]);

  var centerX  = ((pos[0] +(pos[0]+width)) / 2)+100+(40/String(n_layers).length);
  var centerY  = pos[1]+50;
  ctx.font = '30px Monospace';
  ctx.fillText(String(n_layers),centerX,centerY);
  topDistance += 300;
}

//Draw Conv1
function drawCNN1(elements,n_layers){
  var pos = [centerLine,topDistance];
  pos[0] -= (500/2);
  var img = new Image();
  var color = ['blue.png','green.png','red.png','yellow.png'];
  var height = 170;
  var width  = 500;
  img.addEventListener('load',function(){
      ctx.drawImage(img,pos[0],pos[1],width,height);
  });
  img.src = './imgs/cnn1/'+color[getRandomInt(0,4)];
  var centerX = (pos[0] + (pos[0]+width))/2-(10*String(n_layers).length);
  ctx.font  = '30px Monospace';
  ctx.fillText(String(elements),centerX,pos[1]+height+50);
  ctx.fillText(String(n_layers),pos[0]+width+30,pos[1]+100);
  topDistance += 400;
}

//Connections between layers
//Handle text for special connections(dropout,flatten,reshape)
function specialConnection(types,mores,hei,isCNN){
  var h = 90;
  var distanceLeft = -20;
  if(isCNN){
    distanceLeft = 100;
  }
  for(var i in types){
    var type = types[i];
    if(type == 0){
      ctx.font  = '27px Monospace';
      ctx.fillText("Reshape"+"("+String(mores[i])+")",centerLine-distanceLeft,hei+h);

    }
    if(type == 1){
      ctx.font  = '27px Monospace';
      ctx.fillText("Flatten",centerLine-distanceLeft,hei+h);
    }
    if(type == 2){
      ctx.font  = '27px Monospace';
      console.log(":>"+mores[i])
      ctx.fillText("Dropout"+"("+String(parseFloat(mores[i])*100)+"%)",centerLine-distanceLeft,hei+h);
    }
    h += 30;
  }
}
//Connect cnn => cnn whatever the dimensions are
function connectCNN2CNN(dim_one,dim_two){//if type == 0:normal link, == 1 reshape, == 2 flatten, == 3 dropout
  var width = 500;
  var height_one = 700;
  var height_two = 700;
  var h1 = 500;
  var h2 = 500;
  if(dim_one == 1){height_one = 400;h1 = 170;}
  if(dim_two == 1){height_two = 400;h2 = 170;}
  var pos_one = [centerLine-250,(topDistance - (height_one+height_two))+h1];
  var pos_two = [centerLine-250,(topDistance - height_two)]
  ctx.beginPath()
  ctx.strokeStyle = "#c62828";
  ctx.moveTo(pos_one[0],pos_one[1]);
  ctx.lineTo(pos_two[0],pos_two[1]+50)

  ctx.moveTo(pos_one[0]+450,pos_one[1]);
  ctx.lineTo(pos_two[0]+500,pos_two[1]);
  ctx.lineWidth=5
  ctx.stroke()

  return pos_one[1];
}
//Connect neuron_type => neuron_type (rnn=>rnn,fc=>fc,fc=>rnn,rnn=>fc);
function connectNN2NN(isOneRNN){ //if type == 0:normal link, == 1 reshape, == 2 flatten, == 3 dropout
  var pos = [centerLine-35,topDistance-480];

  var img = new Image();
  img.addEventListener('load',function(){
      ctx.drawImage(img,pos[0],pos[1],70,200);
  });
  img.src = './imgs/arrow.png';
  return pos[1];
}
//Connect CNN => neuron_type
function connectCNN2NN(isFirst1D,secondNeurons){ // if secondNeurons == -1 then 2 layer must be rnn || if type == 0:normal link, == 1 reshape, == 2 flatten, == 3 dropout
  var getBack = 700;
  var h1      = 500;
  var w_one   = 500;
  var w_two   = 0;
  switch (secondNeurons) {
    case -1:
      w_two = 470;
      break;
    case 1:
      w_two = 170 / 1.5;
      break;
    case 2:
      w_two = 300 / 1.5;
      break;
    case 3:
      w_two = 500 /1.5;
      break;
    default:
      w_two = 800 /1.5;
  }

  if(isFirst1D){getBack = 400;h1 = 170};
  getBack += 300;
  var pos_one = [centerLine-250,(topDistance-(getBack)+h1)];
  var pos_two = [centerLine,(topDistance-(300))];
  ctx.beginPath()
  ctx.strokeStyle = "#311b92"
  ctx.moveTo(pos_one[0],pos_one[1]);
  ctx.lineTo(pos_two[0]-(w_two/2),pos_two[1]+15)

  ctx.moveTo(pos_one[0]+450,pos_one[1]);
  ctx.lineTo(pos_two[0]+(w_two/2)-15,pos_two[1]+15);
  ctx.lineWidth=5
  ctx.stroke()
  return pos_one[1];
}

//Connect neuron_type => CNN type
function connectNN2CNN(neurons,isSecond1D){ // if secondNeurons == -1 then 2 layer must be rnn || if type == 0:normal link, == 1 reshape, == 2 flatten, == 3 dropout
  var getBack = 500;
  var h1      = 150;
  var h2      = 700;
  var w_two   = 500;
  var w_one   = 0;
  switch (neurons) {
    case -1:
      w_one = 470;
      break;
    case 1:
      w_one = 170 / 1.5;
      break;
    case 2:
      w_one = 300 / 1.5;
      break;
    case 3:
      w_one = 500 /1.5;
      break;
    default:
      w_one = 800 /1.5;
  }
  console.log(w_one);
  if(isSecond1D){getBack =200;h2 = 500;};
  getBack += 370;
  var pos_one = [(centerLine-(w_one/2))+15,((topDistance-getBack))];
  var pos_two = [centerLine,(topDistance-(getBack))+h1];
  ctx.beginPath()
  ctx.strokeStyle = "#f00"
  ctx.moveTo(pos_one[0],pos_one[1]);
  ctx.lineTo(pos_two[0]-250,pos_two[1]+70)

  ctx.moveTo(pos_one[0]+(w_one-30),pos_one[1]-3);
  ctx.lineTo(pos_two[0]+(w_two/2),pos_two[1]+20);
  ctx.lineWidth=5
  ctx.stroke()
  return pos_one[1];
}



function to_image(){
  location.href=canvas.toDataURL("image/png");
}


//BUILD chart
function buildChart(layers,output,parameters){
  //Updating canvas dimensions
  var new_height = 300;
  for(var i in layers){
    if(layers[i] == "fc" || layers[i] == "rnn" )
    {
      new_height += 300;
    }
    else if(layers[i] == "conv1"){
      new_height +=400;
    }
    else if(layers[i] == "conv2"){
      new_height += 700;
    }
  }
  canvas.height = new_height;
  len = new_height/2+"px";
  $("#canvas").css("height",len)
  var specialLayers = new Array();
  var specialParams = new Array();

  var lastType = null;
  for(i in layers){
	  var cotica = layers[i];
    var temp_last = null;

	  switch(cotica){
		case "input":

		break;
	//Fully connected
		case "fc":
		var neurons = output[i];
		drawFc(neurons);
    temp_last = 1;
		break;
	//Dropout
		case "dropout":
    specialLayers.push(2);
    specialParams.push(layersOutput[i]);
    temp_last = null
		break;
	//Flatten
		case "flat":
    specialLayers.push(1);
    temp_last = null
		break;
	//Reshape
		case "reshape":
    specialLayers.push(0);
    specialParams.push(layersOutput[i]);
    temp_last = null
		break;
	//CONVS:
		case "conv1":
    var nFilters = layersOutput[i];
    var dim      = parseFloat(layersParameters[i]);
    drawCNN1(dim,nFilters);
    temp_last = 2
    break;
		case "conv2":
    case "conv3":
    var nFilters = layersOutput[i];
    var dim      = layersParameters[i];

    var h = parseFloat(dim.slice(dim.indexOf("(")+1,dim.indexOf(",")));
    var w = parseFloat(dim.slice(dim.indexOf(",")+1,dim.indexOf(")")));
    drawCNN(w,h,nFilters)
    temp_last = 3

		break;
	//POOLING:
	//	MAX:
		case "maxp1": //Max pooling 1D

		break;

		case "maxp2":

		break;
		case "maxp3":

		break;
	//  AVERAGE
		case "avep1":

		break;
		case "avep2":

		break;
		case "avep3":

		break;
	// RNN (gru,lstm,SimpleRNN)
		case "rnn":
    var neurons = layersOutput[i];
    drawRnn(neurons);
    temp_last = 4
		break;
	//Embedding text input
		case "wembed":

		break;
		default:
		alert("MY GODDDDDD AN ERRORRRRR OCCURED");
   }
   //END of iterations
   //Connections between layers
   //NN => NN
   if(temp_last != null && i != 1){
     var hei = 0;
     if(temp_last == 1 || temp_last == 4){
       if(lastType == 2 || lastType == 3){
         var isOne1D = false;
         if(lastType == 4)isOne1D = true;
         var secondOutput = layersOutput[i];
         if(temp_last == 4)secondOutput= -1;
         hei = connectCNN2NN(isOne1D,secondOutput);
       }
       else{
         var isOneRNN = false;
         if(lastType ==4){isOneRNN = true;}
         hei = connectNN2NN(isOneRNN);
      }
     }
   //CNN
     else if(temp_last == 2 || temp_last == 3){
       //NN => CNN
       if(lastType == 1 || lastType == 4){
          var isSecond1D = false;
          var firstOut = layersOutput[i-1];
          if(lastType == 4){firstOut = -1;}
          if(temp_last == 2){isSecond1D = true;}
          console.log(layersOutput[i-1])
          hei = connectNN2CNN(firstOut,isSecond1D);
       }

       else{
         var dimOne = 0;
         var dimTwo = 0;
         if(lastType == 2){dimOne = 1;}
         if(lastType == 3){dimTwo = 2;}
         hei = connectCNN2CNN(dimOne,dimTwo);
      }
     }

     if(specialLayers.length > 0){
        var ty = false;
        console.log(lastType);
        if(lastType == 2 || lastType == 3 || temp_last == 2 || temp_last == 3){
          ty = true;
        }
        specialConnection(specialLayers,specialParams,hei,ty);
        specialLayers = new Array();
        specialParams = new Array();
     }
     lastType = temp_last;
  }

  }

}
