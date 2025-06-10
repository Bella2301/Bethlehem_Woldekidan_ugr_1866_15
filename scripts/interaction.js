import * as THREE from "three";

export function enableInteraction(renderer, camera, scene) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const originalScales = new WeakMap();

  function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const part = intersects[0].object;

      if (!originalScales.has(part)) {
        originalScales.set(part, part.scale.clone());
      }

      // Enlarge briefly
      part.scale.set(
        part.scale.x * 1.2,
        part.scale.y * 1.2,
        part.scale.z * 1.2
      );

      setTimeout(() => {
        const original = originalScales.get(part);
        if (original) part.scale.copy(original);
      }, 300);

      console.log("Clicked part:", part.name || "Unnamed");
    }
  }

  renderer.domElement.addEventListener("click", onClick);
}
