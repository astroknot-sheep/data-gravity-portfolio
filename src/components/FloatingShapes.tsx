import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create floating shapes
    const shapes: THREE.Mesh[] = [];
    const primaryColor = new THREE.Color("hsl(38, 100%, 50%)");
    
    // Icosahedron (main shape)
    const icoGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(4, 0, -5);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.2, 8, 24);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 2, -4);
    scene.add(torus);
    shapes.push(torus);

    // Octahedron
    const octGeometry = new THREE.OctahedronGeometry(0.6, 0);
    const octMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const octahedron = new THREE.Mesh(octGeometry, octMaterial);
    octahedron.position.set(-2, -2, -3);
    scene.add(octahedron);
    shapes.push(octahedron);

    // Small floating dots
    const dotsGeometry = new THREE.BufferGeometry();
    const dotsCount = 50;
    const positions = new Float32Array(dotsCount * 3);
    
    for (let i = 0; i < dotsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    
    dotsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const dotsMaterial = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.03,
      transparent: true,
      opacity: 0.4
    });
    const dots = new THREE.Points(dotsGeometry, dotsMaterial);
    scene.add(dots);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll interaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate shapes based on time and mouse
      const time = Date.now() * 0.0005;
      
      icosahedron.rotation.x = time * 0.3 + mouseY * 0.3;
      icosahedron.rotation.y = time * 0.2 + mouseX * 0.3;
      icosahedron.position.y = Math.sin(time) * 0.5 - scrollY * 0.001;

      torus.rotation.x = time * 0.4 - mouseY * 0.2;
      torus.rotation.y = time * 0.3 - mouseX * 0.2;
      torus.position.y = 2 + Math.sin(time + 1) * 0.3 - scrollY * 0.0008;

      octahedron.rotation.x = time * 0.5 + mouseY * 0.4;
      octahedron.rotation.z = time * 0.3 + mouseX * 0.4;
      octahedron.position.y = -2 + Math.sin(time + 2) * 0.4 - scrollY * 0.0006;

      // Rotate dots slowly
      dots.rotation.y = time * 0.1;
      dots.rotation.x = mouseY * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      dotsGeometry.dispose();
      dotsMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
