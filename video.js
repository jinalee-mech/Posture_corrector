let videofeed;
let posenet;
let poses = [];
let started = false;
let LeftEarPosition = [];
let RightEarPosition = [];
let LeftEyePosition = [];
let RightEyePosition = [];
let angles = [];
let angle;
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
function wri(){ //
    // creates a file called 'newFile.txt'
  let writer = createWriter('허리구부정.txt');
  // write 'Hello world!'' to the file
  writer.write(['angle:']);
  writer.write([angles]);

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
function calcAngle(a, b){
        angleMode(DEGREES);
        if (a.x == b.x)
            return 1.570796
        return atan2(b.y-a.y, b.x-a.x)
}

var rightEye,
    leftEye,
    leftear,
    rightear,
    lefthip
    defaultRightEarPosition = [],
    defaultLeftEarPosition = [],
    defaultRightEyePosition = [],
    defaultLeftEyePosition = [];


function calEyes() {
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
            rightear = pose.keypoints[4].position;
            leftear = pose.keypoints[3].position;
            rightshoulder = pose.keypoints[6].position;
            rightEye = pose.keypoints[2].position;
            lefthip = pose.keypoints[11].position;
          while (defaultRightEyePosition.length < 1) { //start를 눌렀을때의 기준 눈의 높이
                defaultRightEyePosition.push(rightEye.y);
            }
            angle = calcAngle(leftear, lefthip); //귀와 엉덩이의 각도측정
          stroke('red')
         strokeWeight(10);
        point(leftear.x, leftear.y);
         point(lefthip.x, lefthip.y);
          noStroke();
          text('Angle: '+ angle, 50, 50, 100, 100)
          //눈 detection
          if (Math.abs(rightEye.y - defaultRightEyePosition[0]) > 20) {
                blur();}
            
          //등 detection
          if(angle < 83) //굽은등일때
          {blur();
           angles.push(angle); //굽은등일때의 각도를 txt저장
          }
          else
            removeblur();
        
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
