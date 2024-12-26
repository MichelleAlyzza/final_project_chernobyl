import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createInfoPanel, hideInfoPanel} from './infopanel.js';
import { createGUI } from './gui.js'


export function startReactor(canvas) {
    let reactorCanvas = canvas || document.querySelector('.reactor4-page .webgl');

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ canvas: reactorCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
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
            const object = intersects[0].object;
            if (!tooltipVisible) {
                description.title = "Why did the Reactor Explode?"
                description.innerText = 
                `The RBMK reactor used uranium fuel inside strong tubes called pressure tubes, with about 1,600 in each reactor. The reactor core, a large container filled with graphite blocks, had around 1,660 holes to fit the pressure tubes and control rods. Water flowed through the rods, heating up and turning to steam, which then powered turbines to generate electricity. The graphite blocks also heated up, reaching around 700°C.
                
                Unlike other reactors, the RBMK couldn't cool the graphite with coolant, so it was important to keep air out to prevent the hot graphite from catching fire. This was done by enclosing the core in a sealed metal container and using inert gases to suppress oxygen. A concrete shield on top contained the control rods, which were crucial during the reactor's disaster.`; 

                infoPanel.style.display = 'block'; 
                tooltipVisible = true;
            }
        } else if (tooltipVisible) {
            hideInfoPanel();
            tooltipVisible = false;
        }
    }

    reactorCanvas.addEventListener('mousemove', onMouseMove);
    
    textureLoader.load('/textures/texture01_bg.jpg', (texture) => {
        scene.background = texture;
    });

    gltfloader.load('/models/reactor4/scene.gltf', (gltf) => {
        const reactor = gltf.scene;
        reactor.scale.set(1, 1, 1);
        reactor.position.set(0, 0, -30);
        reactor.rotation.x = Math.PI / 6;
        scene.add(reactor);
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
