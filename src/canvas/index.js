import { getElementById } from "../utils";
import { getDraggables } from "../draggable";
function getCenterOfDiv(div) {
    return {
        x: div.offsetLeft + div.clientWidth / 2,
        y: div.offsetTop + div.clientHeight / 2,
    };
}
function getDistanceBetweenDivs(div1, div2) {
    const center1 = getCenterOfDiv(div1);
    const center2 = getCenterOfDiv(div2);
    return Math.sqrt(Math.pow((center1.x - center2.x), 2) + Math.pow((center1.y - center2.y), 2));
}
function getClosestDiv(div, draggables, visited) {
    let minDistance = Number.MAX_VALUE;
    let closestDiv = draggables[0];
    for (let d of draggables) {
        if (d === div)
            continue;
        if (visited.has(d.id))
            continue;
        const distance = getDistanceBetweenDivs(div, d);
        if (distance < minDistance) {
            minDistance = distance;
            closestDiv = d;
        }
    }
    return closestDiv;
}
function drawLine(ctx, div1, div2) {
    const pos1 = getCenterOfDiv(div1);
    const pos2 = getCenterOfDiv(div2);
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
}
export function drawConnectors() {
    const firstPerson = document.getElementsByClassName('firstTarget')[0];
    if (firstPerson === undefined)
        return;
    const draggables = getDraggables();
    const canvas = getElementById('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx === null)
        throw new Error('2d context not supported');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#15a5ed";
    ctx.lineWidth = 3;
    const visited = new Set([firstPerson.id]);
    const visitedPath = [firstPerson.id];
    let nextPerson = firstPerson;
    while (visited.size < draggables.length) {
        const closestPerson = getClosestDiv(nextPerson, draggables, visited);
        visited.add(closestPerson.id);
        visitedPath.push(closestPerson.id);
        drawLine(ctx, nextPerson, closestPerson);
        nextPerson = closestPerson;
    }
    visitedPath.push(firstPerson.id);
    drawLine(ctx, nextPerson, firstPerson);
    getElementById('path').innerText = visitedPath.join(' -> ');
    console.log(visitedPath);
}
