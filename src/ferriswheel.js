import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createInfoPanel, hideInfoPanel} from './infopanel.js';
import { createGUI } from './gui.js'


export function startFerriswheel(canvas) {
    let ferriswheelCanvas = canvas || document.querySelector('.ferris-wheel-page .webgl');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ canvas: ferriswheelCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);


    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const gltfloader = new GLTFLoader();

    // Creating an Information Panel
    const infoPanel = createInfoPanel();

    const title = document.createElement('h3');
    const description = document.createElement('p');
    infoPanel.appendChild(title);
    infoPanel.appendChild(description);

    // Tooltip logic
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let tooltipVisible = false;

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        checkIntersections(); 
    }

    function checkIntersections() {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            //const object = intersects[0].object;

            if (!tooltipVisible) {
                description.innerText = "The Ferris wheel is part of the Pripyat Amusement Park, which was due to open on May 1, 1986 for the May Day celebration. However, the Chernobyl disaster occured on April 26, 1986. The park was opened for a couple of hours on April 27 to keep the city people entertained before the announcement to evacuate the city was made. The Ferris Wheel was then left standing tall in the ghost town before its official opening, and has became one of the most well-known landmarks of the city. The park is one of the most irradiated parts of Pripyat, especially where moss has built up."; 
                infoPanel.style.display = 'block'; 
                tooltipVisible = true;
            }
        } else if (tooltipVisible) {
            hideInfoPanel(); // Hide the panel if not intersecting
            tooltipVisible = false;
        }
    }
    
    ferriswheelCanvas.addEventListener('mousemove', onMouseMove);

    textureLoader.load('/textures/texture01_bg.jpg', (texture) => {
        scene.background = texture;
    });


    gltfloader.load('/models/pripyat_ferris_wheel/scene.gltf', (gltf) => {
        const ferriswheel = gltf.scene;
        ferriswheel.scale.set(1, 1, 1);
        ferriswheel.position.set(0, 0, -1);
        scene.add(ferriswheel);
    });

    // Parameters for the GUI
    const params = {
        camera,
        light: directionalLight,
        cameraX: camera.position.x,
        cameraY: camera.position.y,
        lightIntensity: directionalLight.intensity,
    };

    // Create GUI
    const gui = createGUI(params);

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return gui;
}
