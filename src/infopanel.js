let currentInfoPanel = null;

export function createInfoPanel() {
    if (currentInfoPanel) {
        document.body.removeChild(currentInfoPanel);
    }

    const infoPanel = document.createElement('div');
    infoPanel.className = 'info-panel';
    infoPanel.style.display = 'none';
    infoPanel.style.position = 'absolute'; 
    infoPanel.style.bottom = '20px'; 
    infoPanel.style.right = '20px';
    infoPanel.style.left = '20px'; 
    infoPanel.style.background = 'rgba(255, 255, 255, 0.81)';
    infoPanel.style.padding = '10px';
    infoPanel.style.borderRadius = '5px';
    infoPanel.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    document.body.appendChild(infoPanel);

    currentInfoPanel = infoPanel;
    return infoPanel; 
}

export function hideInfoPanel() {
    if (currentInfoPanel) {
        currentInfoPanel.style.display = 'none'; 
    }
}
