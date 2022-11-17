let videofeed;
let posenet;
let poses = [];
let started = false;
let LeftEarPosition = [];
let RightEarPosition = [];
let Leftshoulderosition = [];
let RightshoulderPosition = [];
let LeftEyePosition = [];
let RightEyePosition = [];
//p5.js

function setup() {
    const canvas = createCanvas(500, 500);
    canvas.parent("video"); //div with id video in index.html

    //video
    videofeed = createCapture(VIDEO); //contains the audio/video feed from a webcam.
    videofeed.size(width, height);
    console.log("setup");
    posenet = ml5.poseNet(videofeed);

    posenet.on("pose", function (results) {
        poses = results;
    });

    videofeed.hide();
    noLoop();

}



function draw() {
    if (started) {
        image(videofeed, 0, 0, width, height);
        calEyes();

    }
}
function wri(){
    // creates a file called 'newFile.txt'
  let writer = createWriter('허리구부정.txt');
  // write 'Hello world!'' to the file
  writer.write(['defaultRightEarPosition:']);
  writer.write([500-defaultRightEarPosition]); //start 눌렀을때
  writer.write(['\n']);
  writer.write(['RightEarPosition:']);
  writer.write([500-RightEarPosition]);
  writer.write(['\n']);
  writer.write(['defaultRightShoulderPosition:']);
  writer.write([500-defaultRightshoulderPosition]);
  writer.write(['\n']);
  writer.write(['RightshoulderPosition']);
  writer.write([500-RightshoulderPosition]);
  writer.write(['\n']);
  writer.write(['defaultRightEyePosition:']);
  writer.write([500-defaultRightEyePosition]);
  writer.write(['\n']);
  writer.write(['RightEyePosition']);
  writer.write([500-RightEyePosition]);
  writer.write(['\n']);
  writer.write(['defaultear - defaultshoulder: ']);
  writer.write([defaultRightshoulderPosition-defaultRightEarPosition]);
  writer.write(['\n']);
  writer.write(['ear - shoulder: ']);
  writer.write([RightshoulderPosition-RightEarPosition]);
  // close the PrintWriter and save the file
  writer.close();
  
}

function start() {
    select("#startstop").html("stop");
    document.getElementById("startstop").addEventListener("click", stop);
    started = true;
    loop();
}

function stop() {
    select("#startstop").html("start");
    document.getElementById("startstop").addEventListener("click", start);
    removeblur();
    started = false;
  
    noLoop();
}

var rightEye,
    leftEye,
    leftear,
    rightear,
    leftshoulder,
    rightshoulder,
    defaultRightEarPosition = [],
    defaultLeftEarPosition = [],
    defaultRightshoulderPosition = [],
    defaultLeftshoulderPosition = [],
    defaultRightEyePosition = [],
    defaultLeftEyePosition = [];


function calEyes() {
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            rightear = pose.keypoints[4].position;
            rightshoulder = pose.keypoints[6].position;
            rightEye = pose.keypoints[2].position;


            while (defaultRightEyePosition.length < 1) {
                defaultRightEyePosition.push(rightEye.y);
            }

            while (defaultRightEarPosition.length < 1) {
                defaultRightEarPosition.push(rightear.y);
            }

            while (defaultRightshoulderPosition.length < 1) {
                defaultRightshoulderPosition.push(rightshoulder.y);
            }
          







            if (Math.abs(rightEye.y - defaultRightEyePosition[0]) > 20) {
                blur();
              
            while (RightEarPosition.length < 1) {
                RightEarPosition.push(rightear.y);
            }
              while (RightshoulderPosition.length < 1) {
                RightshoulderPosition.push(rightshoulder.y);
            }
              
              while (RightEyePosition.length < 1) {
                RightEyePosition.push(rightEye.y);
            }
              

            }
            if (Math.abs(rightEye.y - defaultRightEyePosition[0]) <= 20) {
                removeblur();
            }
        }
    }
}



function blur() {
    // document.getElementById("audioElement").play();
    document.body.style.filter = "blur(5px)";
    document.body.style.transition = "1s";
    console.log("Change");
}

function removeblur() {
    document.body.style.filter = "blur(0px)";
    // var audio = document.getElementById("audioElement").pause();
}

function start() {
    select("#startstop").html("stop");
    document.getElementById("startstop").addEventListener("click", stop);
    started = true;
    loop();
}

function stop() {
    select("#startstop").html("start");
    document.getElementById("startstop").addEventListener("click", start);
    removeblur();
    started = false;
    noLoop();
}

var rightEye,
    leftEye,
    leftear,
    rightear,
    leftshoulder,
    rightshoulder,
    defaultRightEarPosition = [],
    defaultLeftEarPosition = [],
    defaultRightshoulderPosition = [],
    defaultLeftshoulderPosition = [],
    defaultRightEyePosition = [],
    defaultLeftEyePosition = [];


function calEyes() {
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            rightear = pose.keypoints[4].position;
            rightshoulder = pose.keypoints[6].position;
            rightEye = pose.keypoints[2].position;


            while (defaultRightEyePosition.length < 1) {
                defaultRightEyePosition.push(rightEye.y);
            }

            while (defaultRightEarPosition.length < 1) {
                defaultRightEarPosition.push(rightear.y);
            }

            while (defaultRightshoulderPosition.length < 1) {
                defaultRightshoulderPosition.push(rightshoulder.y);
            }


            RightEarPosition.push(rightear.y);
            RightEyePosition.push(rightEye.y);
            RightshoulderPosition.push(rightshoulder.y);

            text(RightEarPosition, 100, 100);






            if (Math.abs(rightEye.y - defaultRightEyePosition[0]) > 20) {
                blur();
            }
            if (Math.abs(rightEye.y - defaultRightEyePosition[0]) <= 20) {
                removeblur();
            }
        }
    }
}



function blur() {
    document.getElementById("audioElement").play();
    document.body.style.filter = "blur(5px)";
    document.body.style.transition = "1s";
    console.log("Change");
}

function removeblur() {
    document.body.style.filter = "blur(0px)";
    var audio = document.getElementById("audioElement").pause();
}
