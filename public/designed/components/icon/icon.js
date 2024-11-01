import { iconDraggable } from './icon-draggable.js'
import { iconZoom } from './icon-zoom.js'
import { iconUrl } from './icon-url.js'

export function icon(settings, iconSettings, alertDiv, positionDisplay){
    if (iconSettings) {

        let iconElement;

        // Create an image element if iconUrl is provided (
        // ex.
            // icon: 'pencil'
            // iconColor: 'red'
            // iconUrl: 'https://static.vecteezy.com/system/resources/previews/018/930/415/non_2x/instagram-logo-instagram-icon-transparent-free-png.png'
            // iconUrlWidth: '200px'
            // iconUrlHeight: '200px'
        //)
        // ... @ separated from icon-draggable.js 
        // ...
        iconUrl(settings, alertDiv, iconElement, iconSettings, positionDisplay);
        // ...
    
        if (settings.iconPosition) {

            // If Icon is Draggable (/
            // ex. 
                // iconPosition : true
                // iconZoomOut : true
                // iconZoom : 1.50
            //)
            // ... @ separated from icon-draggable.js 
            // ...
            iconZoom(settings, alertDiv, iconElement);
            // ...

    
            // If Icon is Draggable (/ex. iconPosition: true/)
            // ... @ separated from icon-draggable.js 
            // ...
            iconDraggable(settings, alertDiv, iconElement)
            // ...
        } 
    }
};