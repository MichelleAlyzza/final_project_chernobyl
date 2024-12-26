import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export function startReactor(canvas) {
    let reactorCanvas = canvas || document.querySelector('.reactor4-page .webgl');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ canvas: reactorCanvas, antialias: true });
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

    gltfloader.load('/models/reactor4/scene.gltf', (gltf) => {
        const reactor = gltf.scene;
        reactor.scale.set(1, 1, 1);
        reactor.position.set(0, 0, -30);
        reactor.rotation.x = Math.PI / 6;
        scene.add(reactor);

        // Change the material
        reactor.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x696969, 
                    roughness: 0.5, 
                    metalness: 0.7, 
                });
            }
        });
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
