import * as THREE from "three";

export function createLamp() {
  const lampGroup = new THREE.Group();

  // Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32),
    new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.6,
      roughness: 0.4,
    })
  );
  base.position.y = 0.05;
  lampGroup.add(base);

  // Pole
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1, 16),
    new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.3 })
  );
  pole.position.y = 0.6;
  lampGroup.add(pole);

  // Lampshade
  const shade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.15, 0.5, 32, 1, true),
    new THREE.MeshPhysicalMaterial({
      color: 0xffe4b5,
      transparent: true,
      opacity: 0.85,
      roughness: 0.5,
      transmission: 0.8,
      side: THREE.DoubleSide,
    })
  );
  shade.rotation.x = Math.PI;
  shade.position.y = 1.3;
  lampGroup.add(shade);

  // Inverted top cap
  const invertedCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xffe4b5, roughness: 0.5 })
  );
  invertedCap.rotation.x = Math.PI;
  invertedCap.position.y = 1.55;
  lampGroup.add(invertedCap);

  // Bulb
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xffffcc,
      emissive: 0xffffcc,
      emissiveIntensity: 3,
      metalness: 0.1,
      roughness: 0.2,
    })
  );
  bulb.position.y = 1.1;
  lampGroup.add(bulb);

  // Light
  const bulbLight = new THREE.PointLight(0xfff1c1, 2.5, 6);
  bulbLight.position.set(0, 1.1, 0);
  lampGroup.add(bulbLight);

  return lampGroup;
}
