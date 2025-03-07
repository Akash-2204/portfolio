"use client";
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { throttle } from 'lodash';
import Stats from 'three/examples/jsm/libs/stats.module';
import styles from "./avatarModel.module.scss";

interface AvatarModelProps {
  enableStats?: boolean;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ enableStats = process.env.NODE_ENV === 'test' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<Stats | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const avatarRef = useRef<THREE.Object3D | null>(null);
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup with optimized settings
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 10); // Reduced far plane
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false; // Disable shadows for better performance
    mount.appendChild(renderer.domElement);

    // Performance monitoring in development
    if (enableStats) {
      statsRef.current = new Stats();
      statsRef.current.dom.style.position = 'absolute';
      mount.appendChild(statsRef.current.dom);
    }

    // Optimized Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Optimized Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(ambientLight, directionalLight);

    // Optimized model loading
    const loader = new GLTFLoader();
    loader.setPath(basePath);

    const loadModel = async () => {
      try {
        const gltf = await loader.loadAsync('/models/avatar.glb');
        const avatar = gltf.scene;
        avatarRef.current = avatar;
        
        // Apply initial position and scale
        avatar.position.set(0, -2.2, 0);
        avatar.scale.set(2.2, 2.2, 2.2);
        
        // Enable frustum culling
        avatar.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.frustumCulled = true;
            // Optimize geometries
            child.geometry.computeBoundingSphere();
            child.geometry.computeBoundingBox();
          }
        });

        // Update avatar scale based on screen size
        const updateAvatarScale = () => {
          const screenWidth = window.innerWidth;
          if (!avatar) return;

          if (screenWidth < 768) {
            avatar.position.set(0, -1.2, 0);
            avatar.scale.set(1.2, 1.2, 1.2);
          } else if (screenWidth < 1024) {
            avatar.position.set(0, -1.8, 0);
            avatar.scale.set(1.8, 1.8, 1.8);
          }
        };

        updateAvatarScale();
        window.addEventListener("resize", throttle(updateAvatarScale, 100));

        avatar.rotation.y = THREE.MathUtils.degToRad(0);
        scene.add(avatar);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();

    // Optimized mouse movement with throttling
    const onMouseMove = throttle((event: MouseEvent) => {
      if (!avatarRef.current || !mount) return;
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      avatarRef.current.rotation.y = x * Math.PI;
      avatarRef.current.rotation.x = y * Math.PI * 0.1;
    }, 16); // ~60fps

    const onMouseEnter = () => mount.addEventListener('mousemove', onMouseMove);
    const onMouseLeave = () => {
      mount.removeEventListener('mousemove', onMouseMove);
      if (avatarRef.current) {
        avatarRef.current.rotation.set(0, THREE.MathUtils.degToRad(20), 0);
      }
    };

    mount.addEventListener('mouseenter', onMouseEnter);
    mount.addEventListener('mouseleave', onMouseLeave);

    // Optimized animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      controls.update();
      renderer.render(scene, camera);
      
      if (statsRef.current) {
        statsRef.current.update();
      }
    };
    animate();

    // Efficient resize handling
    const resizeObserver = new ResizeObserver(throttle(() => {
      if (!mount) return;
      
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }, 100));

    resizeObserver.observe(mount);

    // Comprehensive cleanup
    return () => {
      cancelAnimationFrame(frameId);
      controls.dispose();
      resizeObserver.disconnect();
      mount.removeEventListener('mouseenter', onMouseEnter);
      mount.removeEventListener('mouseleave', onMouseLeave);
      onMouseMove.cancel(); // Cancel any pending throttled calls

      if (avatarRef.current) {
        scene.remove(avatarRef.current);
        avatarRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(material => {
                material.dispose();
                if (material.map) material.map.dispose();
                if (material.normalMap) material.normalMap.dispose();
                if (material.roughnessMap) material.roughnessMap.dispose();
                if (material.metalnessMap) material.metalnessMap.dispose();
              });
            } else {
              child.material.dispose();
              if (child.material.map) child.material.map.dispose();
              if (child.material.normalMap) child.material.normalMap.dispose();
              if (child.material.roughnessMap) child.material.roughnessMap.dispose();
              if (child.material.metalnessMap) child.material.metalnessMap.dispose();
            }
          }
        });
      }

      renderer.dispose();
      renderer.forceContextLoss();
      mount.removeChild(renderer.domElement);
      
      if (statsRef.current && statsRef.current.dom.parentNode) {
        statsRef.current.dom.parentNode.removeChild(statsRef.current.dom);
      }
    };
  }, [enableStats]);

  return <div ref={mountRef} className={styles.avatarContainer} />;
};

export default AvatarModel;
