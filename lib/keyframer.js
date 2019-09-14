/* 
    Name: keyframer.js
    Author: raghavm
    Description: JS Library that allows easy interaction with CSS Animations.
    GitHub: https://github.com/raghav-misra/keyframer-js
*/

var keyframer = {};

/* ----------------------------- */
// Event Tracker:
keyframer.eventTracker = {};

function createKeyframerEvent(elementQuery, mainQuery, event, func){
    var element = document.querySelector(elementQuery);
    if(!keyframer.eventTracker.hasOwnProperty(mainQuery))
        keyframer.eventTracker[mainQuery] = {};
    keyframer.eventTracker[mainQuery]["keyframer-" + event] = [elementQuery, func];
    element.addEventListener(
        event, keyframer.eventTracker[mainQuery]["keyframer-" + event][1]
    );
};

keyframer.revokeEvent = (elementQuery, event) =>{
    try{
        var element = document.querySelector(keyframer.eventTracker[elementQuery]["keyframer-" + event][0]);
        element.removeEventListener(
            event, keyframer.eventTracker[elementQuery]["keyframer-" + event][1]
        );
        delete keyframer.eventTracker[elementQuery]["keyframer-" + event];
    }
    catch(e){ console.warn("That event was never created!"); }
};

/* ----------------------------- */
// Create Animation:
keyframer.createCSSAnimation = 
(elementQuery, animationData, removeTimeoutMS=NaN) => {
    var elem = document.querySelector(elementQuery);
    elem.style.animation = animationData;
    if(removeTimeoutMS){
        setTimeout(()=>{
            keyframer.purge(elementQuery);
        }, removeTimeoutMS);
    }
};

// Create Animation On "EVENT":
keyframer.createCSSAnimationOn = 
(event, elementQuery, animationData, removeTimeoutMS=NaN, eventReceiver=null) => {
    if(!isNotNullUndefinedOrNaN(eventReceiver)) eventReceiver = elementQuery;
    keyframer.revokeEvent(elementQuery, event);
    createKeyframerEvent(
        eventReceiver, elementQuery, event,
        ()=>{ keyframer.createCSSAnimation(elementQuery, animationData, removeTimeoutMS); }
    );
};

// Create Animation On Key "EVENT":
keyframer.createCSSAnimationOnKey = 
(keyEvent, elementQuery, animationData, allowedKeys, removeTimeoutMS=NaN, eventReceiver=null) => {
    if(!isNotNullUndefinedOrNaN(eventReceiver)) eventReceiver = elementQuery;
    keyframer.revokeEvent(elementQuery, "key"+keyEvent);
    createKeyframerEvent(
        eventReceiver, elementQuery, "key"+keyEvent,
        (ev)=>{
            if(!inArray(allowedKeys, ev.key) && !inArray(allowedKeys, ev.code)) return;
            keyframer.createCSSAnimation(elementQuery, animationData, removeTimeoutMS);
        }
    );
};

// Remove Animation:
keyframer.revokeCSSAnimation = (elementQuery) => {
    var elem = document.querySelector(elementQuery);
    elem.style.animation = "none";
};

/* ----------------------------- */
// Create Transition:
keyframer.createCSSTransition = 
(elementQuery, transitionData, changedAttributes = {}) => {
    document.querySelector(elementQuery).style.transition = transitionData;
    keyframer.setStyles(elementQuery, changedAttributes);
};

// Create Transition On "EVENT":
keyframer.createCSSTransitionOn = 
(event, elementQuery, transitionData, changedAttributes={}, eventReceiver=null) => {
    if(!isNotNullUndefinedOrNaN(eventReceiver)) eventReceiver = elementQuery;
    keyframer.revokeEvent(elementQuery, event);
    createKeyframerEvent(
        eventReceiver, elementQuery, event,
        ()=>{ keyframer.createCSSTransition(elementQuery, transitionData, changedAttributes); }
    );      

}

// Create Transition On Key "EVENT":
keyframer.createCSSTransitionOnKey = 
(keyEvent, elementQuery, transitionData, allowedKeys, changedAttributes={}, eventReceiver=null) => {
    if(!isNotNullUndefinedOrNaN(eventReceiver)) eventReceiver = elementQuery;
    keyframer.revokeEvent(elementQuery, "key"+keyEvent);
    createKeyframerEvent(
        eventReceiver, elementQuery, "key"+keyEvent,
        (ev)=>{
            if(!inArray(allowedKeys, ev.key) && !inArray(allowedKeys, ev.code)) return;
            keyframer.createCSSTransition(elementQuery, transitionData, changedAttributes); 
        }
    );
};
/* ----------------------------- */

// Change Styles @ Runtime
keyframer.setStyles = (elementQuery, changedAttributes = {}) => {
    element = document.getElementById(elementQuery);
    for(var attribute in changedAttributes){
        if(!changedAttributes.hasOwnProperty(attribute)) continue;
        element.style[attribute] = changedAttributes[attribute];
    }
}
/* ----------------------------- */
// Frame Storage Object:
keyframer.frames = {};

// Create Frame:
keyframer.createFrame = (frameName, frameData={}) => {
    keyframer.frames[frameName] = frameData;
}

// Apply Frame Data:
keyframer.applyFromAttribute = (attribute = "data-frame") =>{
    Array.from(document.querySelectorAll(`[${attribute}]`)).forEach(element => {
        keyframer.setStyles(element, keyframer.frames[element.getAttribute(attribute)]);
    });
}



// Utility Functions
function isNotNullUndefinedOrNaN(value){
    if(value == null || value == NaN || value == undefined) return false;
    else return true;
}

function inArray(array, item) {
    if(array.indexOf(item) != -1) return true;
    return false;
}



