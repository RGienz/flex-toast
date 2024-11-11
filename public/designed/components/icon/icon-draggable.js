export function iconDraggable(settings, alertDiv, iconElement){
    // Make the icon draggable within the alert div
    let isDraggingIcon = false;
    let startX, startY, startLeft, startTop;

    // Create a position display element
    const positionDisplay = document.createElement('div');
    positionDisplay.style.position = 'absolute';
    positionDisplay.style.bottom = '-40px'; 
    positionDisplay.style.left = '10px';
    positionDisplay.style.fontWeight = 'bold';
    positionDisplay.style.fontSize = '20px';
    positionDisplay.style.zIndex = 2;

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
        // Default position if iconX and iconY are not provided
        iconElement.style.left = '10px'; 
        iconElement.style.top = '10px';
    }

    iconElement.addEventListener("mousedown", (e) => {
    isDraggingIcon = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(iconElement.style.left, 10) || 0;
    startTop = parseInt(iconElement.style.top, 10
        ) || 0;

        // Prevent text selection
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (isDraggingIcon) {
            const left = startLeft + e.clientX - startX;
            const top = startTop + e.clientY - startY;

            // Update the icon's position without constraints
            iconElement.style.left = left + "px";
            iconElement.style.top = top + "px";

            // Update the position display
            positionDisplay.textContent = `Icon X: ${parseInt(iconElement.style.left, 10)}, Icon Y: ${parseInt(iconElement.style.top, 10)}`;
        }
    });

    document.addEventListener("mouseup", () => {
        if (isDraggingIcon) {
            isDraggingIcon = false;
            // Display the last known position when the icon is not held
            positionDisplay.textContent = `Icon X: ${parseInt(iconElement.style.left, 10)}, Icon Y: ${parseInt(iconElement.style.top, 10)}`;
        }
    });

    document.addEventListener("mouseleave", () => {
        if (isDraggingIcon) {
            isDraggingIcon = false;
            // Display the last known position when the mouse leaves the document
            positionDisplay.textContent = `Icon X: ${parseInt(iconElement.style.left, 10)}, Icon Y: ${parseInt(iconElement.style.top, 10)}`;
        }
    });

}

