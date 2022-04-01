object_name = "";
Status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects"; 
 object_name =  document.getElementById("superstar").value;
}

function modelLoaded()
{
    console.log(" It is working again!! ");
    Status = true;
}

function draw()
{
    image(video, 0, 0, 380, 380);
    if(Status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
       document.getElementById("status").innerHTML = "Status : Object Detected";
       
       fill("red");
       percent = floor(objects[i].confidence * 100);
       text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
       noFill();
       stroke("red");
       rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
       if(objects[i].label == object_name){
         video.stop();
         objectDetector.detect(gotResult); 
         document.getElementById("SFN").innerHTML = "Object Found" + object_name;
         synth = window.speechSynthesis;
         utterThis = new SpeechSynthesisUtterance(object_name + "found");
         synth.speak(utterThis);
       }
       else{
           document.getElementById("SFN").innerHTML = object_name + " not found ";
       }
        } 
       }       
}

function gotResult(error, results)
{
if(error){
  console.log(error);
}
console.log(results);
objects = results;
}
