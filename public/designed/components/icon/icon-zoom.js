export function iconZoom(settings, alertDiv, iconElement){
    // Set initial zoom level from options
    let zoomLevel = settings.iconZoom || 1; // Default to 1 if not provided
    const zoomDisplay = document.createElement('div'); 
    zoomDisplay.style.position = 'absolute';
    zoomDisplay.style.color = 'white';
    zoomDisplay.style.bottom = '-40px'; 
    zoomDisplay.style.left = '10px'; 
    zoomDisplay.textContent = ''; 
    zoomDisplay.style.fontWeight = 'bold';
    zoomDisplay.style.fontSize = '20px';
    zoomDisplay.style.cursor = 'move';
    zoomDisplay.style.marginLeft = '210px';
    zoomDisplay.style.zIndex = 2;
    alertDiv.appendChild(zoomDisplay);


    // Set initial position for the icon
    iconElement.style.left = `${settings.iconZoomPosition?.x || 10}px`; 
    iconElement.style.top = `${settings.iconZoomPosition?.y || 10}px`; 
    iconElement.style.cursor = 'move';
    // Append the icon element to the alertDiv
    alertDiv.appendChild(iconElement);

    // Set the initial zoom level
    iconElement.style.transform = `scale(${zoomLevel})`;

    // Zoom functionality
    if (settings.iconZoomOut === false) {
        iconElement.addEventListener('wheel', (e) => {
            e.preventDefault(); 
            const zoomAmount = e.deltaY > 0 ? -0.1 : 0.1; 
            zoomLevel = Math.max(0.1, zoomLevel + zoomAmount); 

            // Update icon size
            iconElement.style.transform = `scale(${zoomLevel})`;

            // Update zoom display only when zooming
            zoomDisplay.textContent = `Zoom Level: ${zoomLevel.toFixed(2)}`;
        });
    }
}