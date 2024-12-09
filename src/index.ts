import {getElementById} from "./utils";
import {drawConnectors} from "./canvas";
import {allDraggables} from "./draggable";

const canvas = getElementById('canvas') as HTMLCanvasElement;

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

drawConnectors();


const form = getElementById('selectorForm') as HTMLFormElement;
let aoe1Radios = form.elements.namedItem('aoe1') as unknown as HTMLInputElement[];
let aoe2Radios = form.elements.namedItem('aoe2') as unknown as HTMLInputElement[];
let firstTargetRadios = form.elements.namedItem('first') as unknown as HTMLInputElement[];
updateClassOfPlayer(aoe1Radios, 'aoe1');
updateClassOfPlayer(aoe2Radios, 'aoe2');
updateClassOfPlayer(firstTargetRadios, 'firstTarget');
function updateClassOfPlayer(radios: HTMLInputElement[], className: string) {
  for (let radio of radios) {
    radio.onclick = function() {
      radios.forEach((r) => {
        const selectedPlayer = getElementById(r.value);
        selectedPlayer.classList.remove(className);
      });
      const selectedPlayer = getElementById(radio.value);
      selectedPlayer.classList.add(className);

      drawConnectors();
    }
  }
}

