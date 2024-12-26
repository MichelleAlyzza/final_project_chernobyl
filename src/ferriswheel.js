import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export function startFerriswheel(canvas) {
    let ferriswheelCanvas = canvas || document.querySelector('.ferris-wheel-page .webgl');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ canvas: ferriswheelCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;


    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const gltfloader = new GLTFLoader();

    
    textureLoader.load('/textures/texture01_bg.jpg', (texture) => {
        scene.background = texture;
    });


    gltfloader.load('/models/pripyat_ferris_wheel/scene.gltf', (gltf) => {
        const ferriswheel = gltf.scene;
        ferriswheel.scale.set(1, 1, 1);
        ferriswheel.position.set(0, 0, -1);
        scene.add(ferriswheel);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
