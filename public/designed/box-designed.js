import { icon } from './components/icon/icon.js'

let currentToast = null;
let toastOptions = null;
function flexToast(options) {
    // Default options
    const defaultOptions = {
        // defaul mdi position and icon 
        position: 'center', 
        icon: 'check', 
        // title default name and size
        title: 'Flexible-alert', 
        titleSize : '30px',
        showConfirmButton: true, 
        displayBackgroundImage: false,
        ButtonTop : '80px',
        ButtonText: 'OK', 
        Buttonpadding: '10px', 
        ButtonborderRadius: '16px', 

        // condition to display 
        flexPositionCheck: false,
        iconPosition: false, 
        titlePosition: false, 
        isTriggered: true, 
        // main div effects
        opacity : '0',
        display : 'flex',
        alignItems : 'center', 
        justifyContent : 'center',
        backdropFilter : 'blur(3.5px)',
        webkitBackdropFilter : 'blur(3.5px)',
        borderRadius: '16px',
        // icon mdi 
        iconSize: '70px',
        iconRight: '250px',
        // url background image size
        backgroundSize: '180px 190px',
        // icon image
        iconUrlwidth: '100px', 
        iconUrlHeight: '100px', 
        // main div height
        bHeight: '150px', 
        bWidth: '400px', 
        // main div background color
        backgroundColor: 'rgba(138, 113, 177, 0.42)', 


        iconZoom: 1, // Default zoom level
        iconZoomPosition: { x: 10, y: 10 },
        iconZoomOut : false,

        titleZoom: 1,
        titleZoomPosition: { x: 10, y: 10 },
        titleZoomOut : false,


        

    };


    const settings = { ...defaultOptions, ...options };
    toastOptions = settings;

    const alertDiv = document.createElement('div');
        alertDiv.style.position = 'absolute';
        alertDiv.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5), 0 4px 30px rgba(0, 0, 0, 0.2)'; 

        // Add for resize div
        document.body.appendChild(alertDiv);

  
    if (settings.importBackgroundImage) {
        console.log('meron');
        if (!settings.backgroundColor) {
            alertDiv.style.backgroundColor = 'red'; 
        } else {
            settings.backgroundColor = 'none';
        }

        settings.displayBackgroundImage = true; 
        alertDiv.style.backgroundImage = settings.importBackgroundImage;

        const backgroundSize = settings.backgroundSize; 
        const [width, height] = backgroundSize.split(' ');

        alertDiv.style.backgroundSize = backgroundSize;
        alertDiv.style.backgroundPosition = 'center';

        alertDiv.style.width = width; 
        alertDiv.style.height = height; 

        // Remove the background color
        alertDiv.style.backgroundColor = settings.imagebackgroundColor; 

        alertDiv.style.border = 'none',
        alertDiv.style.boxShadow = 'none';
    } else {
        // alert('kajsc')
        settings.displayBackgroundImage = false;
        alertDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        // alertDiv.style.height = '150px';
        // alertDiv.style.width = '400px';
        alertDiv.style.height = settings.bHeight;
        alertDiv.style.width = settings.bWidth;
    }

    // Apply styles dynamically
    Object.keys(defaultOptions).forEach(key => {
        alertDiv.style[key] = settings[key]; 
    });
       

    switch (settings.position) {
        case 'top-end':
            alertDiv.style.top = '10px';
            alertDiv.style.right = '10px';
            break;
        case 'top-start':
            alertDiv.style.top = '10px';
            alertDiv.style.left = '10px';
            break;
        case 'bottom-end':
            alertDiv.style.bottom = '10px';
            alertDiv.style.right = '10px';
            break;
        case 'bottom-start':
            alertDiv.style.bottom = '10px';
            alertDiv.style.left = '10px';
            break;
        case 'custom':
            // Check if customX and customY are provided
            if (settings.customX !== undefined && settings.customY !== undefined) {
                alertDiv.style.position = 'fixed'; // Ensure the position is fixed for custom coordinates
                alertDiv.style.left = `${settings.customX}px`;
                alertDiv.style.top = `${settings.customY}px`;
                alertDiv.style.transform = 'none'; // No transform needed for custom positioning
            } else {
                console.log('not provided')
                // Fallback to center if custom coordinates are not provided
                alertDiv.style.top = '50%';
                alertDiv.style.left = '50%';
                alertDiv.style.transform = 'translate(-50%, -50%)'; 
            }
            break;
        case 'center':
        // default:
        //     alertDiv.style.top = '50%';
        //     alertDiv.style.left = '50%';
        //     alertDiv.style.transform = 'translate(-50%, -50%)'; 
        //     break;

        default:
            console.log('default');
            const alertWidth = 150; // Width of the alertDiv
            const alertHeight = 150; // Height of the alertDiv
            alertDiv.style.top = `${(window.innerHeight - alertHeight) / 2}px`; // Center vertically
            alertDiv.style.left = `${(window.innerWidth - alertWidth) / 2.3}px`; // Center horizontally
            alertDiv.style.position = 'fixed'; // Ensure it's fixed positioning
            break;

    }


    // display for X and Y coordinates
    const positionDisplay = document.createElement('div');
        positionDisplay.style.position = 'fixed';
        positionDisplay.style.bottom = '-110px';
        positionDisplay.style.left = '10px'; 
        positionDisplay.style.fontWeight = 'bold';
        positionDisplay.style.fontSize = '20px';
        

        document.body.appendChild(positionDisplay);

    // Add for resize div
    let isResizing = false;
    let isDraggingDiv = false;
    let offsetX, offsetY;

    // Add for resize div
    if (settings.flexPositionCheck) {
        // Create a resize handle
        const resizeHandle = document.createElement('div');
        resizeHandle.style.width = '10px';
        resizeHandle.style.height = '10px';
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.right = '0';
        resizeHandle.style.bottom = '0';
        resizeHandle.style.backgroundColor = 'darkgray'; // Set background color
        resizeHandle.style.cursor = 'nwse-resize'; // Set cursor style
        alertDiv.appendChild(resizeHandle);
    
        alertDiv.onmousedown = function (e) {
            if (e.target === resizeHandle) {
                isResizing = true;
            } else {
                isDraggingDiv = true;
                offsetX = e.clientX - alertDiv.getBoundingClientRect().left;
                offsetY = e.clientY - alertDiv.getBoundingClientRect().top;
            }
    
            document.onmousemove = function (e) {
                const newX = alertDiv.getBoundingClientRect().left;
                const newY = alertDiv.getBoundingClientRect().top;
    
                if (isDraggingDiv) {
                    const newLeft = e.clientX - offsetX;
                    const newTop = e.clientY - offsetY;
    
                    alertDiv.style.left = newLeft + 'px';
                    alertDiv.style.top = newTop + 'px';
    
                    positionDisplay.innerHTML = `X: ${newLeft.toFixed(0)},<br> Y: ${newTop.toFixed(0)}<br>Width: ${alertDiv.offsetWidth.toFixed(0)}px,<br> Height: ${alertDiv.offsetHeight.toFixed(2)}px`;
                } else if (isResizing) {
                    const newWidth = e.clientX - alertDiv.getBoundingClientRect().left;
                    const newHeight = e.clientY - alertDiv.getBoundingClientRect().top;
    
                    alertDiv.style.width = newWidth + 'px';
                    alertDiv.style.height = newHeight + 'px';
    
                    positionDisplay.innerHTML = `X: ${newX.toFixed(0)},<br> Y: ${newY.toFixed(0)}<br>Width: ${newWidth.toFixed(0)}px,<br> Height: ${newHeight.toFixed(2)}px`;
                }
            };
    
            document.onmouseup = function () {
                isDraggingDiv = false;
                isResizing = false;
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

    // change icon element if provided
    // ... @ separated from icon.js 
    // ...
    icon(settings, settings.icon, alertDiv, positionDisplay);
    // ...
    // ... @ separated from icon.js 

    if (settings.titlePosition) {

        let zoomtitleLevel = settings.iconZoom; 
        const zoomTitleDisplay = document.createElement('div'); 
        zoomTitleDisplay.style.position = 'absolute';
        zoomTitleDisplay.style.color = 'white';
        zoomTitleDisplay.style.bottom = '-70px'; 
        zoomTitleDisplay.style.left = '220px'; 
        zoomTitleDisplay.style.fontWeight = 'bold';
        zoomTitleDisplay.style.fontSize = '20px';
        zoomTitleDisplay.style.zIndex = 2;
        alertDiv.appendChild(zoomTitleDisplay);

        // Create title element
        const titleElement = document.createElement('span');
        titleElement.textContent = settings.title;
        titleElement.style.position = 'absolute';

        titleElement.style.height = settings.titleHeight; 
        titleElement.style.width = settings.titleWidth; 
        titleElement.style.color = settings.titleColor; 
        titleElement.style.fontSize = settings.titleSize;
        titleElement.style.marginLeft = settings.titleLeft;
        titleElement.style.marginRight = settings.titleRight;
        titleElement.style.marginTop = settings.titleTop;
        titleElement.style.marginBottom = settings.titleBottom;
        titleElement.style.boxShadow = settings.titleBoxShadow; 
        titleElement.style.cursor = 'move';

        if (settings.titleX !== undefined && settings.titleY !== undefined) {
            titleElement.style.left = `${settings.titleX}px`;
            titleElement.style.top = `${settings.titleY}px`;
        } else {
            titleElement.style.left = '162px';
            titleElement.style.top = '48px'; 
        }

        alertDiv.appendChild(titleElement);

        // Zoom functionality
        document.addEventListener("wheel", (e) => {
            const currentFontSize = parseFloat(titleElement.style.fontSize);
            const zoomFactor = 1.1;

            if (e.deltaY < 0) {
                // Zoom in
                titleElement.style.fontSize = `${currentFontSize * zoomFactor}px`;
            } else {
                // Zoom out
                titleElement.style.fontSize = `${currentFontSize / zoomFactor}px`;
            }

            // Update zoom display
            zoomTitleDisplay.textContent = `Font Size: ${titleElement.style.fontSize}`;
        });

        let isDraggingIcon = false;
        let startX, startY, startLeft, startTop;

        titleElement.addEventListener("mousedown", (e) => {
            isDraggingIcon = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(titleElement.style.left, 10) || 0;
            startTop = parseInt(titleElement.style.top, 10) || 0;

            // Prevent text selection
            e.preventDefault();
        });

     

        let isDraggingTitle = false;

        // Create position display element
        const positionTitleDisplay = document.createElement('div');
        positionTitleDisplay.style.position = 'absolute';
        positionTitleDisplay.style.fontWeight = 'bold';
        positionTitleDisplay.style.fontSize = '20px';
        positionTitleDisplay.style.zIndex = 2;
        alertDiv.appendChild(positionTitleDisplay);

        // Set initial position for positionTitleDisplay
        if (settings.titleX !== undefined && settings.titleY !== undefined) {
            positionTitleDisplay.style.bottom = '-70px'; 
            positionTitleDisplay.style.left = '10px';
        } else {
            positionTitleDisplay.style.left = '10px'; 
            positionTitleDisplay.style.top = '10px';
        }

        titleElement.addEventListener("mousedown", (e) => {
            isDraggingTitle = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(titleElement.style.left, 10) || 0;
            startTop = parseInt(titleElement.style.top, 10) || 0;

            // Prevent text selection
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (isDraggingTitle) {
                const left = startLeft + e.clientX - startX;
                const top = startTop + e.clientY - startY;

                // Update the position of the title element
                titleElement.style.left = left + "px";
                titleElement.style.top = top + "px";

                // Update position display
                positionTitleDisplay.textContent = `Title X: ${parseInt(titleElement.style.left, 10)}, Title Y: ${parseInt(titleElement.style.top, 10)}`;
            }
        });

        document.addEventListener("mouseup", () => {
            if (isDraggingTitle) {
                isDraggingTitle = false;
                positionTitleDisplay.textContent = `Title X: ${parseInt(titleElement.style.left, 10)}, Title Y: ${parseInt(titleElement.style.top, 10)}`;
            }
        });

        document.addEventListener("mouseleave", () => {
            if (isDraggingTitle) {
                isDraggingTitle = false;
                positionTitleDisplay.textContent = `Title X: ${parseInt(titleElement.style.left, 10)}, Title Y: ${parseInt(titleElement.style.top, 10)}`;
            }
        });
    } else {
        // Create title element
        const titleElement = document.createElement('span');
        titleElement.textContent = settings.title;
        titleElement.style.position = 'absolute';

        titleElement.style.height = settings.titleHeight; 
        titleElement.style.width = settings.titleWidth; 
        titleElement.style.color = settings.titleColor; 
        titleElement.style.fontSize = settings.titleSize;
        titleElement.style.marginLeft = settings.titleLeft;
        titleElement.style.marginRight = settings.titleRight;
        titleElement.style.marginTop = settings.titleTop;
        titleElement.style.marginBottom = settings.titleBottom;
        titleElement.style.boxShadow = settings.titleBoxShadow; 

        if (settings.titleX !== undefined && settings.titleY !== undefined) {
            titleElement.style.left = `${settings.titleX}px`;
            titleElement.style.top = `${settings.titleY}px`;
        } else {
            titleElement.style.left = '162px'; 
            titleElement.style.top = '48px'; 
        }

        alertDiv.appendChild(titleElement);
    }
    

     if (currentToast) {
        currentToast.style.opacity = '0'; 
        setTimeout(() => {
             console.log('timer')
            document.body.removeChild(currentToast); 
            currentToast = null; 
            
            if (toastOptions) {
                flexToast(toastOptions);
            }

        }, 500); 
    }


    // confirm button
    if (settings.showConfirmButton) {
        const confirmButton = document.createElement('button');
        
        confirmButton.style.position = 'absolute';
        confirmButton.textContent = settings.ButtonText;
        confirmButton.style.marginLeft = settings.ButtonLeft;
        confirmButton.style.marginRight = settings.ButtonRight;
        confirmButton.style.marginTop = settings.ButtonTop;
        // confirmButton.style.marginTop = '100px';
        confirmButton.style.marginButtom = settings.ButtonButtom;
        confirmButton.style.padding = settings.Buttonpadding;
        confirmButton.style.border = settings.Buttonborder;
        confirmButton.style.borderRadius = settings.ButtonborderRadius;
        confirmButton.style.backgroundColor = settings.ButtonbackgroundColor;
        // confirmButton.style.color
        confirmButton.style.color = settings.Buttoncolor;
        confirmButton.style.cursor = settings.Buttoncursor;
        confirmButton.style.fontSize = settings.ButtonfontSize; 

        confirmButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)'; 
        confirmButton.style.transition = 'transform 0.2s, box-shadow 0.2s'; 
        
        confirmButton.addEventListener('mouseover', () => {
            confirmButton.style.transform = 'translateY(-2px)';
            confirmButton.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.5)';
        });
    
        confirmButton.addEventListener('mouseout', () => {
            confirmButton.style.transform = 'translateY(0)'; 
            confirmButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)'; 
        });

     

        confirmButton.onclick = () => {
            console.log('confirm ok')
            alertDiv.style.opacity = '0'; 
            setTimeout(() => {
                document.body.removeChild(alertDiv);
                currentToast = null; 
            }, 500);
        };

        alertDiv.appendChild(confirmButton);
    }
    

    document.body.appendChild(alertDiv);
   
    alertDiv.style.opacity = '1';
    
    currentToast = alertDiv;
   
    if (settings.timer) {
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
               
                document.body.removeChild(alertDiv);
                currentToast = null; 
            }, 500);
        }, settings.timer);
    }
    

}

export { flexToast };
