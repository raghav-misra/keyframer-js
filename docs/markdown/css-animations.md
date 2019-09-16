# Controlling CSS Animations:
## **Example** 
##### Let's say we have a CSS animation called `fade` and we want to apply it to `#btn`. After the animation is finished, we remove the animation, then hide `#btn`.
**Before:** Vanilla JS + CSS: 
```css
@keyframes fade{
    from { opacity: 0; }
    to { opacity: 1; }
}
```
```js
let button = document.getElementById("btn");
button.style.animation = "fade 0.5s ease";
setTimeout(() => {
    button.style.animation = "none";
    button.style.display = "none";
}, 500);
```
**After:** KeyframerJS + CSS:
```css
@keyframes fade{
    from { opacity: 0; }
    to { opacity: 1; }
}
```
```js
keyframer.createCSSAnimation("#btn", "fade 0.5s ease", 500, (element) => {
    element.style.display = "none";
});
```
---

## Animating a DOM element programmatically: 
`keyframer.createCSSAnimation(elementQuery, animationData, removeTimeoutMS, callback)`

##### Parameters:
- `elementQuery` = the querySelector for the element you want to animate. (e.g. `"#id", ".class", "h1", "[data-attr]"`)
- `animationData` = animation details (name, easing, length, etc.) passed as a string (`animation-name 0.5s ease-in-out`)
- `removeTimeoutMS` (optional) = the amount of millseconds after which the element's animation property is set to `none`
- `callback` (optional, requires `removeTimeoutMS` to be set) = the function called after the time duration `removeTimeoutMS` has passed, has 1 parameter (the animated element)
---

## Creating an event handler to animate a DOM element:
`keyframer.createCSSAnimationOn(keyEvent, elementQuery, animationData, removeTimeoutMS, callback, eventReceiver)`

##### Parameters:
- `event` = the DOM event (e.g `"click"` or `"mouseover"`) after which the event is animated.
- `elementQuery` = the querySelector for the element you want to animate. (e.g. `"#id"`, `".class"`, `"h1"`, `"[data-attr]"`)
- `animationData` = animation details (name, easing, length, etc.) passed as a string (`animation-name 0.5s ease-in-out`)
- `removeTimeoutMS` (optional) = the amount of millseconds after which the element's animation property is set to `none`
- `callback` (optional, requires `removeTimeoutMS` to be set) = the function called after the time duration `removeTimeoutMS` has passed, has 1 parameter (the animated element)
- `eventReceiver` (optional) the querySelector for the element that receives the event
---

## Creating an **key**-event handler to animate a DOM element:
`keyframer.createCSSAnimationOnKey(keyEvent, elementQuery, animationData, allowedKeys, removeTimeoutMS, callback, eventReceiver)`
This specific function has special support for the DOM events `keyup`, `keypress`, and `keydown`.

##### Parameters:
- `keyEvent` = the DOM event (`"press"`, `"up"`, or `"down"`) after which the event is animated.
- `elementQuery` = the querySelector for the element you want to animate. (e.g. `"#id", ".class", "h1", "[data-attr]"`)
- `animationData` = animation details (name, easing, length, etc.) passed as a string (`animation-name 0.5s ease-in-out`)
- `allowedKeys` = list of allowed keys that trigger the animation. (e.g. if we want the keys **A** and **B** to trigger the animation, we would pass `["KeyA","KeyB"]`)
- `removeTimeoutMS` (optional) = the amount of millseconds after which the element's animation property is set to `none`
- `callback` (optional, requires `removeTimeoutMS` to be set) = the function called after the time duration `removeTimeoutMS` has passed, has 1 parameter (the animated element)
- `eventReceiver` (optional) the querySelector for the element that receives the event
---

# Have Fun!



