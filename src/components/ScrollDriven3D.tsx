import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Quiet, scroll-driven 3D object.
 * - A wireframe icosahedron pinned to the right side of the viewport.
 * - Rotation and scale are driven by window scroll progress (no autoplay).
 * - Uses semantic foreground color so it adapts to theme.
 */
export default function ScrollDriven3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Read foreground color from CSS for theme consistency
    const fg = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();
    const color = new THREE.Color(`hsl(${fg})`);

    const geometry = new THREE.IcosahedronGeometry(1.4, 1);
    const wire = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.28,
    });
    const mesh = new THREE.LineSegments(wire, material);
    scene.add(mesh);

    // Smooth scroll-driven targets
    let targetRotX = 0;
    let targetRotY = 0;
    let targetScale = 1;
    let curRotX = 0;
    let curRotY = 0;
    let curScale = 1;

    const updateTargets = () => {
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollMax > 0 ? window.scrollY / scrollMax : 0;
      targetRotX = p * Math.PI * 1.4;
      targetRotY = p * Math.PI * 2.2;
      targetScale = 1 - p * 0.25;
    };

    let frame = 0;
    const tick = () => {
      curRotX += (targetRotX - curRotX) * 0.06;
      curRotY += (targetRotY - curRotY) * 0.06;
      curScale += (targetScale - curScale) * 0.08;
      mesh.rotation.x = curRotX;
      mesh.rotation.y = curRotY;
      mesh.scale.setScalar(curScale);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTargets();
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    updateTargets();
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      wire.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed top-0 right-0 h-screen w-[55vw] max-w-[720px] -z-[5] pointer-events-none hidden md:block"
    />
  );
}
