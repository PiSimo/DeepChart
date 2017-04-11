//["fc","dropout","flat","reshape","conv1","conv2","conv3",
//"maxp1","maxp2","maxp3","avep1","avep2","avep3","rnn"*3,"wembed"];

var topDistance = 200;   //Starting from 200px from the top
var centerLine = 600;    //The main line is 600px from the left
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width=1000        //Canvas basic width
canvas.height=500;       //Canvas basic height

canvas.height = 200+700*2+300*2;





//chart_


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
  p[0] -= 250;
  var names = ["CnnRed.png","CnnYellow.png","CnnBlue.png","CnnGreen.png"];
  var img = new Image();
  img.addEventListener('load', function() {
    ctx.drawImage(img,p[0],p[1],500,500);
  });

  var c = getRandomInt(0,4);
  img.src = "./imgs/"+names[c];
  ctx.font = '30px Monospace';
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
//Connect cnn => cnn whatever the dimensions are
function connectCNN2CNN(dim_one,dim_two,type,more){//if type == 0:normal link, == 1 reshape, == 2 flatten, == 3 dropout
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

  if(type == 1){
    ctx.font  = '30px Monospace';
    ctx.fillText("Reshape"+"("+String(more)+")",centerLine-200,pos_one[1]+130);

  }
  if(type == 2){
    ctx.font  = '30px Monospace';
    ctx.fillText("Flatten",centerLine-100,pos_one[1]+130);
  }
  if(type == 3){
    ctx.font  = '30px Monospace';
    ctx.fillText("Dropout"+"("+String(parseFloat(more)*100)+"%)",centerLine-200,pos_one[1]+130);
  }
}
//Connect neuron_type => neuron_type (rnn=>rnn,fc=>fc,fc=>rnn,rnn=>fc);
function connectNN2NN(isOneRNN,type,more){ //if type == 0:normal link, == 1 reshape, == 2 flatten, == 3 dropout
  var pos = [centerLine-35,topDistance-480];

  var img = new Image();
  img.addEventListener('load',function(){
      ctx.drawImage(img,pos[0],pos[1],70,200);
  });
  img.src = './imgs/arrow.png';
  if(type == 1){
    ctx.font  = '30px Monospace';
    ctx.fillText("Reshape",centerLine+50,pos[1]+70);
    ctx.fillText("("+String(more)+")",centerLine+70,pos[1]+110);
  }
  if(type == 2){
    ctx.font  = '30px Monospace';
    ctx.fillText("Flatten",centerLine+50,pos[1]+110);
  }
  if(type == 3){
    ctx.font  = '30px Monospace';
    ctx.fillText("Dropout",centerLine+50,pos[1]+70);
    ctx.fillText("("+String(parseFloat(more)*100)+"%)",centerLine+70,pos[1]+130);
  }
}
//Connect CNN => neuron_type
function connectCNN2NN(isFirst1D,secondNeurons,type,more){ // if secondNeurons == -1 then 2 layer must be rnn || if type == 0:normal link, == 1 reshape, == 2 flatten, == 3 dropout
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

  if(type == 1){
    ctx.font  = '30px Monospace';
    ctx.fillText("Reshape"+"("+String(more)+")",centerLine-150,pos_one[1]+130);

  }
  if(type == 2){
    ctx.font  = '30px Monospace';
    ctx.fillText("Flatten",centerLine-100,pos_one[1]+130);
  }
  if(type == 3){
    ctx.font  = '30px Monospace';
    ctx.fillText("Dropout"+"("+String(parseFloat(more)*100)+"%)",centerLine-150,pos_one[1]+130);
  }
}


/*
drawImage();
drawCNN(2,200,2);
connectCNN2CNN(3,3);
drawRnn(90);
connectCNN2NN(false,-1,1,[23,23])
drawFc(5);
connectNN2NN(true)
*/


function to_image(){
 // document.getElementById("theimage").src = canvas.toDataURL();
  //Canvas2Image.saveAsPNG(canvas);
  location.href=canvas.toDataURL("image/png");
}


//BUILD chart
function buildChart(layers,output,parameters){
  for(i in layers){
	  var cotica = layers[i];
	  switch(cotica){
		case "input":
		
		break;
	//Fully connected
		case "fc":
		var neurons = output[i];
		console.log("gugu");
		drawFc(neurons);
		break;
	//Dropout	
		case "dropout":
		
		break;
	//Flatten
		case "flat":
		
		break;
	//Reshape
		case "reshape":
		
		break;
	//CONVS:
		case "conv1":
		
		break;
		case "conv2":
		
		break;
		case "conv3":
		
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
		
		break;
	//Embedding text input
		case "wembed":
		
		break;
		default:
		alert("MY GODDDDDD AN ERRORRRRR OCCURED");
		
		
	  }

  }

}