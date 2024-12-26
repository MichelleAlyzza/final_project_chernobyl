import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function startExploration(canvas) {
    // Canvas
    let explorationCanvas = canvas || document.querySelector('.explore-page .webgl');
 

    // Parameters
    const parameters = {
        materialColor: '#363337',
    };

    // Size
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    scene.add(camera);
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: explorationCanvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(0, 5, 5);
    scene.add(directionalLight);

    // Objects
    const gltfLoader = new GLTFLoader();
    let sectionModels = [];
    const objectDistance = 25;
    const modelPaths = [
        '/models/chernobyl_powerplant/scene.gltf',
        '/models/reactor4/scene.gltf',
        '/models/pripyat_ferris_wheel/scene.gltf',
        '/models/radioactive/scene.gltf'
    ];

    function loadModels() {
        modelPaths.forEach((path, index) => {
            gltfLoader.load(
                path,
                (gltf) => {
                    const model = gltf.scene;

                    // Set scale and position for each model
                    if (index === 0) {
                        model.scale.set(0.03, 0.03, 0.03); // Scale for the first model
                        model.position.set(12, -objectDistance * (index + 1), -5);
                        model.rotation.y = Math.PI / 6;
                    } else if (index === 1) {
                        model.scale.set(0.7, 0.7, 0.7); // Scale for the second model
                        model.position.set(-15, -objectDistance * (index + 1), -10);
                        model.rotation.x = Math.PI / 4;

                        // Change the material
                        model.traverse((child) => {
                            if (child.isMesh) {
                                child.material = new THREE.MeshStandardMaterial({
                                    color: 0x696969, 
                                    roughness: 0.5, 
                                    metalness: 0.7, 
                                });
                            }
                        });
                    } else if (index === 2) {
                        model.scale.set(3.5, 3.5, 3.5); // Scale for the second model
                        model.position.set(12, -objectDistance * (index + 1), -10);
                        model.rotation.y = Math.PI / -6;
                    } else if (index === 3) {
                        model.scale.set(1, 1, 1); // Scale for the second model
                        model.position.set(-15, -objectDistance * (index + 1) - 3, -10);
                        model.rotation.y = Math.PI / 2;
                    }

                    // Add the model to the scene and the sectionModels array
                    scene.add(model);
                    sectionModels.push(model);
                },
                undefined,
                (error) => {
                    console.error(`An error occurred while loading model ${index}:`, error);
                }
            );
        });
    }

    loadModels();

    // Resize Event
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Scroll Event
    let scrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update Camera Position Based on Scroll
        camera.position.y = -scrollY / sizes.height * objectDistance;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
}
