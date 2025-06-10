import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { initScene } from "./scripts/initScene.js";
import { createLamp } from "./scripts/createProduct.js";
import { addLighting } from "./scripts/addLighting.js";
import { enableInteraction } from "./scripts/interaction.js";

let scene, camera, renderer, controls;
let autoRotateAngle = 0;

init();
animate();

function init() {
  // === Init Scene ===
  const sceneSetup = initScene();
  scene = sceneSetup.scene;
  camera = sceneSetup.camera;
  renderer = sceneSetup.renderer;

  // === Controls ===
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = false;

  // === Lighting ===
  addLighting(scene);

  // === Product (Lamp) ===
  const lamp = createLamp();
  scene.add(lamp);

  // === Ground ===
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "#1a1a2f", roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // === Interaction ===
  enableInteraction(renderer, camera, scene);

  // === Resize ===
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Auto-rotate
  autoRotateAngle += 0.0015;
  if (!controls.mouseButtons.LEFT) {
    camera.position.x = 5 * Math.sin(autoRotateAngle);
    camera.position.z = 5 * Math.cos(autoRotateAngle);
    camera.lookAt(0, 1.5, 0);
  }

  controls.update();
  renderer.render(scene, camera);
}
