import { getElementById } from "./utils";
import { drawConnectors } from "./canvas";
const canvas = getElementById('canvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
drawConnectors();
const form = getElementById('selectorForm');
let aoe1Radios = form.elements.namedItem('aoe1');
let aoe2Radios = form.elements.namedItem('aoe2');
let firstTargetRadios = form.elements.namedItem('first');
updateClassOfPlayer(aoe1Radios, 'aoe1');
updateClassOfPlayer(aoe2Radios, 'aoe2');
updateClassOfPlayer(firstTargetRadios, 'firstTarget');
function updateClassOfPlayer(radios, className) {
    for (let radio of radios) {
        radio.onclick = function () {
            radios.forEach((r) => {
                const selectedPlayer = getElementById(r.value);
                selectedPlayer.classList.remove(className);
            });
            const selectedPlayer = getElementById(radio.value);
            selectedPlayer.classList.add(className);
            drawConnectors();
        };
    }
}
