# `Frames` and applying styles:
Think of `frames` as **permanent** CSS classes, but in JS-object notation. Instead of working with DOM `classList`, use frames to speed up the process:

## **Example** 
##### Let's say we have a `frame` called `newEffect` and a CSS class called `new-effect`
**Before:** Plain JS with the CSS class: 
```css
.new-effect{
    background: blue;
    color: white;
}
```
```js
let element = document.getElementById("#test");
element.classList.add("new-effect");
```
**After:** KeyframerJS with frames:
```js
keyframer.createFrame("newEffect", {
    background: "blue",
    color: "white"
});
keyframer.setStyles("#test", keyframer.getFrame("newEffect"))
```
## There are 2 types of frames:
1.  **Reusable Frames** - frames created and stored as properties in the `keyframer.frames` object (either with an object reference or the `createFrame` function).
2. **Single-Use Frames** - objects to only be used one time (e.g. `{background: "blue", color: "white"}`).

##### When to use which?
Use a **reusable frame** when it's likely you'll use the frame more than one time.
Use a **single-use** frame when you think you'll only use the frame once.

## Creating Frames:
**Single-use frames** are just objects, so there isn't much to explain there.

**Reusable Frames** can be created 2 ways, the function call or the object reference:
```js
// Function Call (creating a frame called 'newEffect'): 
keyframer.createFrame("newEffect", {
    background: "blue",
    color: "white"
});
```
```js
// Object Reference (creating a frame called 'newEffect'):
keyframer.frames["newEffect"] = {
    background: "blue",
    color: "white"
};
```
## Applying Frame Styles:
The style properties contained in a frame are apllied to a DOM element by passing it in the `keyframer.setStyles` function:
```js
// Applying A Reusable Frame To An Element With An ID of header:
keyframer.createFrame("newEffect", {
    background: "blue",
    color: "white"
});

keyframer.setStyles("#header", keyframer.getFrame("newEffect"));
```
```js
// Applying A Single-Use Frame To An Element With An ID of header:
keyframer.setStyles("#header", { background: "blue", color: "white" });
```
## Oh, and before you go!
- The style attributes used in frames look a bit different than in CSS:
    - They are written in `camelCase`, not `how-they-look` in CSS.
    - **Example**: When creating a frame, you'd write `marginTop`, not `margin-top`.
---
# Have Fun!
## [`|__Frame_&_Applying Styles__|`]() 
## [`|__Animations_&_Transitions_|`]() 
## [`|__Other_Advanced_Features__|`]()


