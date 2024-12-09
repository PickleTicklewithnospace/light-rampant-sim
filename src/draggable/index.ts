import {getElementById, targetHasId} from "../utils";
import {drawConnectors} from "../canvas";

let clickedDiv = '';
let clickedDivPos = { x:0, y:0 };
export const getDraggables = () => {
  const allDraggables: HTMLElement[] = [
    getElementById('d1'),
    getElementById('d2'),
    getElementById('d3'),
    getElementById('d4'),
    getElementById('h1'),
    getElementById('h2'),
    getElementById('mt'),
    getElementById('st'),
  ];

  return allDraggables.filter((d) => !d.classList.contains('aoe1') && !d.classList.contains('aoe2'));
};
export const allDraggables: HTMLElement[] = [
  getElementById('d1'),
  getElementById('d2'),
  getElementById('d3'),
  getElementById('d4'),
  getElementById('h1'),
  getElementById('h2'),
  getElementById('mt'),
  getElementById('st'),
];

function onMouseDown(e: MouseEvent) {
  e.preventDefault();
  if (e.target === null || !targetHasId(e.target)) return;
  clickedDiv = e.target.id;
  clickedDivPos.x = e.clientX;
  clickedDivPos.y = e.clientY;
  // show which div is being clicked
  e.target.style.border = "2px solid blue";

  // put clicked div on top
  e.target.style.zIndex = allDraggables.length.toString();
  let i = 1; for (let div of allDraggables) if (div.id !== clickedDiv) div.style.zIndex = (i++).toString();   // put all other divs behind the selected one
}

function onMouseMove(e: MouseEvent) {
  e.preventDefault();
  if (clickedDiv === "") return;
  let d = getElementById(clickedDiv);
  d.style.left = d.offsetLeft + e.clientX - clickedDivPos.x + "px";     // move the div by however much the mouse moved
  d.style.top  = d.offsetTop  + e.clientY - clickedDivPos.y + "px";
  clickedDivPos.x = e.clientX;                                          // remember where the mouse is now
  clickedDivPos.y = e.clientY;
  drawConnectors();
}

function onMouseUp(e: MouseEvent) {
  e.preventDefault();
  if (clickedDiv === "") return;
  getElementById(clickedDiv).style.border = "none";             // hide the border again
  clickedDiv = "";
}

for (let div of allDraggables) div.onmousedown = onMouseDown;
document.onmousemove = onMouseMove;
document.onmouseup   = onMouseUp;
window.onresize = drawConnectors;