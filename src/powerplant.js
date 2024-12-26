import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createInfoPanel, hideInfoPanel} from './infopanel.js';
import { createGUI } from './gui.js'

export function startPowerplant(canvas) {
    let powerplantCanvas = canvas || document.querySelector('.powerplant-page .webgl');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 2);

    const renderer = new THREE.WebGLRenderer({ canvas: powerplantCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();


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
                description.innerText = "The power plant was located 15 km northwest of the town of Chernobyl (pop. 12,500) and just 3 km away from the town of Pripyat (pop. 45,000) in the Ukraine region of the Soviet Union. Consisting of 4 RBMK nuclear reactors, which are cooled by water and moderated by graphite, the reactors were relatively old for their time. The Soviet Union invented and developed the RBMK reactor, and at the time there were 27 in operation, with another 16 pressurized water reactors (PWR) operating throughout the country for a total of 43 reactors generating 23,000 MW of electricity—10% of the world's total. As of January 1986, there were another 36 reactors under construction; only 8 of which were RBMK reactors, which shows that the Soviets were moving away from these types towards safer, modern PWR."; 
                infoPanel.style.display = 'block'; 
                tooltipVisible = true;
            }
        } else if (tooltipVisible) {
            hideInfoPanel(); // Hide the panel if not intersecting
            tooltipVisible = false;
        }
    }

    powerplantCanvas.addEventListener('mousemove', onMouseMove);

    // Load background texture
    textureLoader.load('/textures/texture01_bg.jpg', (texture) => {
        scene.background = texture;
    });

    // Load power plant model
    gltfLoader.load('/models/chernobyl_powerplant/scene.gltf', (gltf) => {
        const powerplant = gltf.scene;
        powerplant.name = "PowerPlantModel"; // Ensure the model has a name for intersection detection
        powerplant.scale.set(0.05, 0.05, 0.05);
        powerplant.position.set(7, 0, -10);
        powerplant.rotation.y = Math.PI / 2;
        scene.add(powerplant);
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
