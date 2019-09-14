/* 
    Name: keyframer.js
    Author: raghavm
    Description: JS Library that allows easy interaction with CSS Animations.
    GitHub: https://github.com/mrcool4000/web-library
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
    var elem = document.querySelector(elementQuery);
    elem.style.transition = transitionData;
    for(var attribute in changedAttributes){
        if(!changedAttributes.hasOwnProperty(attribute)) continue;
        elem.style[attribute] = changedAttributes[attribute];
    }
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
// Utility Functions
function isNotNullUndefinedOrNaN(value){
    if(value == null || value == NaN || value == undefined) return false;
    else return true;
}

function inArray(array, item) {
    if(array.indexOf(item) != -1) return true;
    return false;
}

/* ----------------------------- */
// requestAnimationFrame Polyfill:
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

