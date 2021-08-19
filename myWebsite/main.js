import '/style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

// Field of view, aspect ratio (width/height), view to determine what visible to camera itself
// .1 and 1000 allows us to see everything
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



const geometry = new THREE.TorusGeometry(30, .4, 10, 100);
const material = new THREE.MeshStandardMaterial({ color:0x03245});
const torus = new THREE.Mesh( geometry, material);


scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(5,5,5);

const ambient = new THREE.AmbientLight(0xFFFFFF)
pointLight.position.set(5,5,5);
scene.add(pointLight, ambient);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement)
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 'rgb(250, 250,250)'});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 300 ));
  star.position.set( x, y, z)
  scene.add( star )
}

Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('high-resolution-space-image-09.jpg')
scene.background = spaceTexture;




const jakeTexture = new THREE.TextureLoader().load('me.jpg')
const jake = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: jakeTexture} )
);

scene.add(jake)

const moonTexture = new THREE.TextureLoader().load('moon.png')
const normalTexture = new THREE.TextureLoader().load('texture.jpeg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( { 
      map: moonTexture,
      normalMap : normalTexture,
    })
);

scene.add(moon)

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,28,28),
  new THREE.MeshStandardMaterial( { color: 0xFFFF})
);
var sphereContainer = new THREE.Object3D();
sphereContainer.add( moon, earth );

scene.add( sphereContainer );

const geometry_cone = new THREE.ConeGeometry( 8, 16, 4 );
const material_cone = new THREE.MeshBasicMaterial( {color: 0x808080} );
const cone = new THREE.Mesh( geometry_cone, material_cone );

scene.add(cone)
const cone_torus_z = -70;
const cone_torus_x = -150;
const cone_torus_y = -50;

cone.position.z = cone_torus_z;
cone.position.x = cone_torus_x;
cone.position.y = cone_torus_y;

torus.position.z = cone_torus_z;
torus.position.x = cone_torus_x;
torus.position.y = cone_torus_y;

earth.position.setZ(-20);
earth.position.setX(-30);
earth.position.setY(0);
moon.position.setZ(50);
moon.position.setX(-30);
moon.position.setY(0);

jake.position.z = -5;
jake.position.x = 2;



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.005;
  moon.rotation.z += .001;

  jake.rotation.x += 0.01;
  jake.rotation.z += 0.01;

  camera.position.z = -t*0.01;
  camera.position.x = t*0.02;
  camera.position.y = -t*0.0002;
}
var lastScrollTop = 0;


document.body.onscroll = moveCamera;
moveCamera();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


var render = function () {
    requestAnimationFrame( render );

    sphere.rotation.y += 0.01; // rotate around its own axis
    sphereContainer.rotation.y += 0.01; // rotate around cube

    renderer.render(scene, camera);
};

function animate() {
  requestAnimationFrame( animate);
  cone.rotation.x -= 0.001;
  cone.rotation.y -= 0.005;
  cone.rotation.z -= 0.001;

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;
  if (moon.position.x>=3){

  }
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.001;
  sphereContainer.rotation.y+= 0.001;
  // sphereContainer.rotation.z+= 0.01;
  // sphereContainer.rotation.x+= 0.01;

  jake.rotation.x += 0.001;
  jake.rotation.z += 0.001;
  // controls.update()
  renderer.render(scene, camera);
};

animate();
