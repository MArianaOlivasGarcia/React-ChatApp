
import { animateScroll } from 'react-scroll'

export const scrollToBottom = ( idElement ) => {

    animateScroll.scrollToBottom({
        containerId: idElement,
        duration: 0
    })

}



export const scrollToBottomAnimated = ( idElement ) => {

    animateScroll.scrollToBottom({
        containerId: idElement,
        duration: 250
    })

}