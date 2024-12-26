import { startExploration } from './exploration.js';
import { startPowerplant } from './powerplant.js'
import { startReactor } from './reactor4.js';
import { startFerriswheel } from './ferriswheel.js';
import { startAftermath } from './aftermath.js';

/**
 * Pages
 */
const landingPage = document.querySelector('.landing-page');
const explorePage = document.querySelector('.explore-page');
const reactor4Page = document.querySelector('.reactor4-page');
const powerplantPage = document.querySelector('.powerplant-page');
const ferriswheelPage = document.querySelector('.ferris-wheel-page');
const aftermathPage = document.querySelector('.aftermath-page');
/**
 * Buttons
 */
const exploreButton = document.getElementById('explore-button');
const watchThisButton = document.getElementById('watch-this-button');
const readArticleButton = document.getElementById('read-this-button');

const powerplantButton = document.getElementById('powerplant-button');
const reactor4Button = document.getElementById('reactor4-button');
const ferrisWheelButton = document.getElementById('ferris-wheel-button');
const aftermathButton = document.getElementById('aftermath-button');

// Back Buttons
const powerplantToExploreButton = document.getElementById('powerplant-to-explore-button');
const reactorToExploreButton = document.getElementById('reactor-to-explore-button');
const ferrisWheelToExploreButton = document.getElementById('ferriswheel-to-explore-button');
const aftermathToExploreButton = document.getElementById('aftermath-to-explore-button');

/**
 * Click Events
 */
let canvas; // Declare the canvas variable outside the event listeners

exploreButton.addEventListener('click', () => {
    // Hide landing page and show explore page
    landingPage.style.display = 'none';
    explorePage.style.display = 'block';

    // Check if the canvas already exists
    if (!canvas) {
        // Dynamically create the canvas
        canvas = document.createElement('canvas');
        canvas.classList.add('webgl');
        explorePage.appendChild(canvas);
        
        // Start exploration
        startExploration(canvas);
    }
});

/**
 * Scene Buttons
 */
powerplantButton.addEventListener('click', () => {
    // Remove the existing exploration canvas, if any
    const existingExplorationCanvas = document.querySelector('.explore-page .webgl');
    if (existingExplorationCanvas) {
        existingExplorationCanvas.remove();
    }

    // Hide the exploration page and show the Reactor 4 page
    explorePage.style.display = 'none';
    powerplantPage.style.display = 'block';

    // Dynamically create a fresh canvas for the Reactor 4 scene
    const canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    powerplantPage.appendChild(canvas);

    // Start the Reactor 4 scene with the new canvas
    startPowerplant(canvas);
});


reactor4Button.addEventListener('click', () => {
    // Remove the existing exploration canvas, if any
    const existingExplorationCanvas = document.querySelector('.explore-page .webgl');
    if (existingExplorationCanvas) {
        existingExplorationCanvas.remove();
    }

    // Hide the exploration page and show the Reactor 4 page
    explorePage.style.display = 'none';
    reactor4Page.style.display = 'block';

    // Dynamically create a fresh canvas for the Reactor 4 scene
    const canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    reactor4Page.appendChild(canvas);

    // Start the Reactor 4 scene with the new canvas
    startReactor(canvas);
});

ferrisWheelButton.addEventListener('click', () => {
    // Remove the existing exploration canvas, if any
    const existingExplorationCanvas = document.querySelector('.explore-page .webgl');
    if (existingExplorationCanvas) {
        existingExplorationCanvas.remove();
    }

    // Hide the exploration page and show the Reactor 4 page
    explorePage.style.display = 'none';
    ferriswheelPage.style.display = 'block';

    // Dynamically create a fresh canvas for the Reactor 4 scene
    const canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    ferriswheelPage.appendChild(canvas);

    // Start the Reactor 4 scene with the new canvas
    startFerriswheel(canvas);
});
aftermathButton.addEventListener('click', () => {
    // Remove the existing exploration canvas, if any
    const existingExplorationCanvas = document.querySelector('.explore-page .webgl');
    if (existingExplorationCanvas) {
        existingExplorationCanvas.remove();
    }

    // Hide the exploration page and show the Reactor 4 page
    explorePage.style.display = 'none';
    aftermathPage.style.display = 'block';

    // Dynamically create a fresh canvas for the Reactor 4 scene
    const canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    aftermathPage.appendChild(canvas);

    // Start the Reactor 4 scene with the new canvas
    startAftermath(canvas);
});



/**
 * Back Buttons
 */
reactorToExploreButton.addEventListener('click', () => {
    // Hide Reactor 4 page and show the explore page
    reactor4Page.style.display = 'none';
    explorePage.style.display = 'block';

    // Remove the old canvas if it exists
    if (canvas) {
        canvas.remove(); // This ensures you're not reusing the old canvas
    }

    // Create a new canvas
    canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    explorePage.appendChild(canvas);
    
    // Start exploration with the new canvas
    startExploration(canvas);
});
powerplantToExploreButton.addEventListener('click', () => {

    powerplantPage.style.display = 'none';
    explorePage.style.display = 'block';

    if (canvas) {
        canvas.remove(); 
    }

    canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    explorePage.appendChild(canvas);
    

    startExploration(canvas);
});
ferrisWheelToExploreButton.addEventListener('click', () => {

    ferriswheelPage.style.display = 'none';
    explorePage.style.display = 'block';

    if (canvas) {
        canvas.remove(); 
    }

    canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    explorePage.appendChild(canvas);
    

    startExploration(canvas);
});
aftermathToExploreButton.addEventListener('click', () => {

    aftermathPage.style.display = 'none';
    explorePage.style.display = 'block';

    if (canvas) {
        canvas.remove(); 
    }

    canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    explorePage.appendChild(canvas);
    

    startExploration(canvas);
});









// Event listener for watch this button
watchThisButton.addEventListener('click', () => {
    const link = "https://youtu.be/MGw3kRGX35s?si=jA3wdatOXVglH3B0";
    window.open(link, '_blank');
});

// Event listener for read article button
readArticleButton.addEventListener('click', () => {
    const articleLink = "https://www.livescience.com/planet-earth/nuclear-energy/chernobyl-the-worlds-worst-nuclear-disaster"; 
    window.open(articleLink, '_blank');
});
