export function iconUrl(settings, alertDiv, iconElement, iconSettings, positionDisplay){
    if (settings.iconUrl) {
        iconElement = document.createElement('img');
        iconElement.src = settings.iconUrl;
        iconElement.style.position = 'absolute';
        iconElement.style.width = settings.iconUrlWidth || 'auto'; // Use provided width or default
        iconElement.style.height = settings.iconUrlHeight || 'auto'; // Use provided height or default
    } else {
        // Create a div for the MDI icon if no imageUrl is provided
        iconElement = document.createElement('div');
        iconElement.className = `mdi mdi-${iconSettings}`;
        iconElement.style.position = 'absolute';
        iconElement.style.color = 'white';
        iconElement.style.fontSize = settings.iconSize || '16px'; // Default font size
    }

    // Set initial position for the icon
    iconElement.style.left = `${settings.iconZoomPosition?.x || 10}px`; 
    iconElement.style.top = `${settings.iconZoomPosition?.y || 10}px`; 

    // Append the icon element to the alertDiv
    alertDiv.appendChild(iconElement);

    iconElement.style.height = settings.iconHeight; 
    iconElement.style.width = settings.iconWidth; 
    iconElement.style.color = settings.iconColor; 
    iconElement.style.fontSize = settings.iconSize;
    iconElement.style.marginLeft = settings.iconLeft;
    iconElement.style.marginRight = settings.iconRight;
    iconElement.style.marginTop = settings.iconTop;
    iconElement.style.marginBottom = settings.iconBottom;

    alertDiv.appendChild(positionDisplay);

    // Set initial position based on iconX and iconY if they exist
    if (settings.iconX !== undefined && settings.iconY !== undefined) {
        iconElement.style.left = `${settings.iconX}px`;
        iconElement.style.top = `${settings.iconY}px`;
    } else {
        
        iconElement.style.left = '10px';
        iconElement.style.top = '10px'; 
    }
}