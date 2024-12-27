import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createInfoPanel, hideInfoPanel} from './infopanel.js';
import { createGUI } from './gui.js'


export function startAftermath(canvas) {
    let aftermathCanvas = canvas || document.querySelector('.aftermath-page .webgl');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ canvas: aftermathCanvas, antialias: true });
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
                description.innerText = "There were over 100 radioactive elements released into the atmosphere when Chernobyl’s fourth reactor exploded. Most of these were short lived and decayed (reduced in radioactivity) very quickly. Iodine, strontium and caesium were the most dangerous of the elements released, and have half-lives of 8 days, 29 years, and 30 years respectively. The isotopes Strontium-90 and Caesium-137 are therefore still present in the area to this day. While iodine is linked to thyroid cancer, Strontium can lead to leukaemia. Caesium is the element that travelled the farthest and lasts the longest. This element affects the entire body and especially can harm the liver and spleen."; 
                infoPanel.style.display = 'block'; 
                tooltipVisible = true;
            }
        } else if (tooltipVisible) {
            hideInfoPanel(); // Hide the panel if not intersecting
            tooltipVisible = false;
        }
    }

    aftermathCanvas.addEventListener('mousemove', onMouseMove);


    textureLoader.load('/textures/texture01_bg.jpg', (texture) => {
        scene.background = texture;
    });


    gltfloader.load('/models/radioactive/scene.gltf', (gltf) => {
        const radioactive = gltf.scene;
        radioactive.scale.set(1, 1, 1);
        radioactive.position.set(0, -1, -10);
        radioactive.rotation.y = Math.PI / 2;

        scene.add(radioactive);
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
