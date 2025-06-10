export function autoRotateCamera(camera, controls, time) {
  if (!controls.mouseButtons.LEFT) {
    const radius = 5;
    const speed = 0.0015;
    const angle = time * speed;

    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(0, 1.5, 0);
  }
}
