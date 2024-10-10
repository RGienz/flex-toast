function flexToast(options) {
    // Default options
    const defaultOptions = {
        position: 'center', 
        icon: 'check-circle', 
        title: 'Flexible-alert', 
        titleSize : '30px',
        showConfirmButton: true, 
        // ButtonbackgroundColor : 'rgba(65, 22, 160, 0.2)',
        // bodyBackgroundImage: 'url("/sample-image.png")',
        displayBackgroundImage: false,
        backgroundImageHeight : '400px',
        backgroundImageWidth : '512px',
        ButtonTop : '80px',
      
        // showLoadingBar: true,
        ButtonText: 'OK', 
        // timer: 2000, 
        // backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        // textColor: 'black', 
        // fontSize: '25px', 
        // width: '400px',
        // height: '150px', 
        // titleMarginTop: '50px',
        Buttonpadding: '10px', 
        ButtonborderRadius: '16px', 

        moveDiv: false,
        // zIndex: '1000', 
        // iconHeight: '24px', 
        // iconWidth: '24px', 
        // iconColor: 'black'

        opacity : '0',
        display : 'flex',
        alignItems : 'center', 
        justifyContent : 'center',
        boxShadow : '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter : 'blur(3.5px)',
        webkitBackdropFilter : 'blur(3.5px)',
        border : '1px solid rgba(182, 31, 142, 0.33)',
        
        iconSize: '70px',
        iconRight: '250px',
    };


    const settings = { ...defaultOptions, ...options };

    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
   
  
    if (settings.bodyBackgroundImage) {
        console.log('meron');
        settings.displayBackgroundImage = true; 
        alertDiv.style.backgroundImage = settings.bodyBackgroundImage;
        // alertDiv.style.backgroundSize = '380px 190px';
        alertDiv.style.backgroundPosition = 'center';
        alertDiv.style.backgroundColor = 'transparent'; 
        // alertDiv.style.height = '400px';
        // alertDiv.style.width = '512px';
        alertDiv.style.height = settings.backgroundImageHeight;
        alertDiv.style.width = settings.backgroundImageWidth;
    } else {
        console.log('wala');
        settings.displayBackgroundImage = false;
        alertDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        alertDiv.style.height = '150px';
        alertDiv.style.width = '400px';
    }

    Object.keys(defaultOptions).forEach(key => {
        alertDiv.style[key] = settings[key]; 
    });

    //! Set position
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
        case 'center':
        default:
            alertDiv.style.top = '50%';
            alertDiv.style.left = '50%';
            alertDiv.style.transform = 'translate(-50%, -50%)'; 
            break;
    }


    // display for X and Y coordinates
     const positionDisplay = document.createElement('div');
     positionDisplay.style.position = 'absolute';
     positionDisplay.style.bottom = '10px'; 
     positionDisplay.style.left = '10px'; 
     positionDisplay.style.color = 'white'; 
     alertDiv.appendChild(positionDisplay);


    if (settings.moveDiv) {
        let offsetX, offsetY;

        alertDiv.onmousedown = function (e) {
            offsetX = e.clientX - alertDiv.getBoundingClientRect().left;
            offsetY = e.clientY - alertDiv.getBoundingClientRect().top;

            document.onmousemove = function (e) {
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;

                alertDiv.style.left = newX + 'px';
                alertDiv.style.top = newY + 'px';
                positionDisplay.textContent = `X: ${newX}, Y: ${newY}`;
                console.log(`X: ${newX}, Y: ${newY}`);
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

    
    if (settings.icon) {
        const iconElement = document.createElement('div');
        iconElement.style.position = 'absolute';
        iconElement.className = `mdi mdi-${settings.icon}`; 
        iconElement.style.height = settings.iconHeight; 
        iconElement.style.width = settings.iconWidth; 
        iconElement.style.color = settings.iconColor; 
        iconElement.style.fontSize = settings.iconSize;
        iconElement.style.marginLeft = settings.iconLeft;
        iconElement.style.marginRight = settings.iconRight;
        iconElement.style.marginTop = settings.iconTop;
        iconElement.style.marginBottom = settings.iconBottom;

        alertDiv.appendChild(iconElement);
     
    }
   
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

    alertDiv.appendChild(titleElement);

    // confirm button
    if (settings.showConfirmButton) {
        const confirmButton = document.createElement('button');
        
        confirmButton.style.position = 'absolute';
        confirmButton.textContent = settings.ButtonText;
        confirmButton.style.marginLeft = settings.ButtonLeft;
        confirmButton.style.marginRight = settings.ButtonRight;
        confirmButton.style.marginTop = settings.ButtonTop;
        confirmButton.style.marginButtom = settings.ButtonButtom;
        confirmButton.style.padding = settings.Buttonpadding;
        confirmButton.style.border = settings.Buttonborder;
        confirmButton.style.borderRadius = settings.ButtonborderRadius;
        confirmButton.style.backgroundColor = settings.ButtonbackgroundColor;
        confirmButton.style.color = settings.Buttoncolor;
        confirmButton.style.cursor = settings.Buttoncursor;
        confirmButton.style.fontSize = settings.ButtonfontSize; 
        confirmButton.style.transition = 'background-color 0.3s'; 

        // Add hover effect
        // confirmButton.onmouseover = () => {
        //     confirmButton.style.backgroundColor = '#0056b3';
        // };
        // confirmButton.onmouseout = () => {
        //     confirmButton.style.backgroundColor = '#007BFF'; 
        // };

        confirmButton.onclick = () => {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 500);
        };
        alertDiv.appendChild(confirmButton);
    }
 
    document.body.appendChild(alertDiv);
   
    alertDiv.style.opacity = '1';

}

export { flexToast };
