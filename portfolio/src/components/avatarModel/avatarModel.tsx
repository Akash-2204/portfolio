"use client";
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import styles from "./avatarModel.module.scss";

const AvatarModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    // Load 3D Avatar Model
    const loader = new GLTFLoader();
    let avatar: THREE.Object3D | null = null;
    loader.load('/models/avatar.glb', (gltf) => {
      avatar = gltf.scene;
      avatar.position.set(0, -1, 0);
      scene.add(avatar);
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });

    // Mouse movement interaction within container
    const onMouseMove = (event: MouseEvent) => {
      if (!avatar || !mount) return;
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      avatar.rotation.y = x * Math.PI; // Horizontal rotation
      avatar.rotation.x = y * Math.PI * 0.1; // Vertical rotation
    };
    
    const onMouseEnter = () => {
      mount.addEventListener('mousemove', onMouseMove);
    };

    const onMouseLeave = () => {
      mount.removeEventListener('mousemove', onMouseMove);
      if (avatar) {
        avatar.rotation.set(0, 0, 0); // Reset to default position
      }
    };

    mount.addEventListener('mouseenter', onMouseEnter);
    mount.addEventListener('mouseleave', onMouseLeave);

    // Animation loop
    let frameId: number;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resizing
    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('mouseenter', onMouseEnter);
      mount.removeEventListener('mouseleave', onMouseLeave);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={styles.avatarContainer} />;
};

export default AvatarModel;
