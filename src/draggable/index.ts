import {getElementById, targetHasId} from "../utils";
import {drawConnectors} from "../canvas";

function createPlayerDiv(name: string, role: string, positionX: string, positionY: string) {
  const player = document.createElement('div');
  player.id = name;
  player.className = `draggable ${role}`;
  player.style.left = positionX;
  player.style.top = positionY;
  player.innerText = name;
  const container = getElementById('playerContainer');
  container.appendChild(player);
  return player;
}

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

const container = getElementById('playerContainer');

container.clientHeight;
const originX = container.clientWidth/2 - 25;
const originY = container.clientHeight/2 - 25;
const r = 150;
const n = 8;
const nameToRole = {
  mt: 'tank',
  st: 'tank',
  h1: 'healer',
  h2: 'healer',
  d1: 'dps',
  d2: 'dps',
  d3: 'dps',
  d4: 'dps',
};
const names = ['mt', 'st', 'd1', 'd2', 'h1', 'h2', 'd3', 'd4'] as const;
for (let i = 0; i < n; i++) {
  const name = names[i];
  const role = nameToRole[name];
  const x = originX + r * Math.cos(2 * Math.PI * i / n);
  const y = originY + r * Math.sin(2 * Math.PI * i / n)
  createPlayerDiv(name, role, `${x}px`, `${y}px`);
  // createPlayerDiv('mt', 'tank', '50%', '30%');
  // createPlayerDiv('st', 'tank', '50%', '70%');
  // createPlayerDiv('d3', 'dps', '30%', '40%');
  // createPlayerDiv('d4', 'dps', '70%', '40%');
  //
  //
  // createPlayerDiv('h1', 'healer', '25%', '50%');
  // createPlayerDiv('h2', 'healer', '75%', '50%');
  //
  //
  // createPlayerDiv('d1', 'dps', '10%', '30%');
  // createPlayerDiv('d2', 'dps', '30%', '30%');
}
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
const prevBoarder = getElementById('d1').style.border;
const clickedBoarder = "2px solid blue";
function onMouseDown(e: MouseEvent) {
  e.preventDefault();
  if (e.target === null || !targetHasId(e.target)) return;
  clickedDiv = e.target.id;
  clickedDivPos.x = e.clientX;
  clickedDivPos.y = e.clientY;
  // show which div is being clicked
  e.target.style.border = clickedBoarder;

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
  getElementById(clickedDiv).style.border = prevBoarder;
  clickedDiv = "";
}

for (let div of allDraggables) div.onmousedown = onMouseDown;
document.onmousemove = onMouseMove;
document.onmouseup   = onMouseUp;
window.onresize = drawConnectors;