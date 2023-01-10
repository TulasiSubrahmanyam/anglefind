import { TWEEN } from "../../../node_modules/three/examples/jsm/libs/tween.module.min.js";
import * as THREE from 'three'

var clock = new THREE.Clock();
var delta = 0;

async function ChairControls(chair,camera,colValue,prompt) {

    var chairPos = chair.position;
    var chairRot = chair.rotation;

    var position0 = { y: 0.33368271589279175 };
    var position1 = { y: 0.45 };

    var rotation0 = { y: 0 };
    var rotation1 = { y: 2 };
    var rotation2 = { y: -2 };

    var rotation3 = { x: -0.15 };
    var rotation4 = { x: 0 };

    var posTween0 = new TWEEN.Tween(chairPos).to(position1, 600);
    var posTween1 = new TWEEN.Tween(chairPos).to(position0, 600);

    var rotTween0 = new TWEEN.Tween(chairRot).to(rotation1, 1000);
    var rotTween1 = new TWEEN.Tween(chairRot).to(rotation2, 1500);
    var rotTween2 = new TWEEN.Tween(chairRot).to(rotation0, 1000);

    var rotTween3 = new TWEEN.Tween(chairRot).to(rotation3, 600);
    var rotTween4 = new TWEEN.Tween(chairRot).to(rotation4, 600);

    const tweens = [
      posTween0,
      posTween1,
      rotTween0,
      rotTween1,
      rotTween2,
      rotTween3,
      rotTween4,
    ];

    tweens.forEach(function (tween) {
      tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    });


     async function Height_Fun() {
      const Height = document.getElementById("Height");
      let myPromise = new Promise(function(resolve) {
        resolve(
          Height.addEventListener("change", (e) => {
            if (e.target.checked) {
              posTween0.chain(posTween1);
              posTween0.start();

              delta = clock.getDelta();
              console.log("chair height enabled "+delta);
            }
          })
        );
      });
      await myPromise;
    }  
    Height_Fun();

    async function Rotate1_Fun() {
      const Rotate = document.getElementById("Rotate");
      let myPromise = new Promise(function(resolve) {
        resolve(
          Rotate.addEventListener("change", (e) => {
            if (e.target.checked) {
              rotTween0.chain(rotTween1);
              rotTween1.chain(rotTween2);
              rotTween0.start();

              delta = clock.getDelta();
              console.log("chair rotation enabled "+delta);
            }
          })
        );
      });
      await myPromise;
    }
    Rotate1_Fun();

    async function Backrest_Fun() {
      const Backrest = document.getElementById("backIncline");
      let myPromise = new Promise(function(resolve) {
        resolve(
          Backrest.addEventListener("change", (e) => {
            if (e.target.checked) {
              rotTween3.chain(rotTween4);
              rotTween3.start();

              delta = clock.getDelta();
              console.log("chair back incline enabled "+delta);
            }
          })
        );
      });
      await myPromise;
    }
    Backrest_Fun();         


//Chair
var modal1 = document.getElementById("myModal1");
var btn1 = document.getElementById("ErgonomicChair");
var span1 = document.getElementById("close1");
btn1.onclick =async function() {
    prompt.style.display="none";
    modal1.style.display = "block";
    delta = clock.getDelta();
    console.log("chair controls opened "+delta);
    if(parseInt(colValue)>="400"){
      
      var tween = new TWEEN.Tween(camera.position).to({
        x: -15.2,
        y: 3.7,
        z: -15.8 
        }, 1500);
      tween.easing(TWEEN.Easing.Sinusoidal.InOut);
      tween.start();
      
    }else{
      var tween = new TWEEN.Tween(camera.position).to({
        x: 10.0,
        y: 1.0,
        z: -10.0 
        }, 1500);
      tween.easing(TWEEN.Easing.Sinusoidal.InOut);
      tween.start();
     
      }
}
span1.onclick =async function() {
    modal1.style.display = "none";

    delta = clock.getDelta();
    console.log("chair controls closed "+delta);
}




  
}

export { ChairControls };