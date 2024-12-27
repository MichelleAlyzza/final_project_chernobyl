import * as dat from 'dat.gui';

export function createGUI(params) {
    const gui = new dat.GUI();

    // Add controls to the GUI
    gui.add(params, 'cameraX', -10, 10).name('Camera X').onChange((value) => {
        params.camera.position.x = value;
    });
    gui.add(params, 'cameraY', -10, 10).name('Camera Y').onChange((value) => {
        params.camera.position.y = value;
    });
    gui.add(params, 'lightIntensity', 0, 5).name('Light Intensity').onChange((value) => {
        params.light.intensity = value;
    });

    return gui;
}
export function destroyGUI (gui) {
    gui.destroy();
    gui = null;
    return gui;
}