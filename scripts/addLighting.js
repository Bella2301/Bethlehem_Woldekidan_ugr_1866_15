import * as THREE from "three";

export function addLighting(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.15);
  scene.add(ambient);

  const pointLight = new THREE.PointLight("#ffc8f5", 2, 4, 2);
  pointLight.castShadow = true;
  pointLight.position.set(1.2, 2.6, 0);
  scene.add(pointLight);
}
