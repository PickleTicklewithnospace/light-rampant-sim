// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementById = getElementById;
exports.targetHasId = targetHasId;
function getElementById(id) {
  var res = document.getElementById(id);
  if (res === null) {
    throw new Error("element with id ".concat(id, " not found"));
  }
  return res;
}
function targetHasId(target) {
  return target.id !== undefined;
}
},{}],"src/draggable/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allDraggables = exports.getDraggables = void 0;
var utils_1 = require("../utils");
var canvas_1 = require("../canvas");
var clickedDiv = '';
var clickedDivPos = {
  x: 0,
  y: 0
};
var getDraggables = function getDraggables() {
  var allDraggables = [(0, utils_1.getElementById)('d1'), (0, utils_1.getElementById)('d2'), (0, utils_1.getElementById)('d3'), (0, utils_1.getElementById)('d4'), (0, utils_1.getElementById)('h1'), (0, utils_1.getElementById)('h2'), (0, utils_1.getElementById)('mt'), (0, utils_1.getElementById)('st')];
  return allDraggables.filter(function (d) {
    return !d.classList.contains('aoe1') && !d.classList.contains('aoe2');
  });
};
exports.getDraggables = getDraggables;
exports.allDraggables = [(0, utils_1.getElementById)('d1'), (0, utils_1.getElementById)('d2'), (0, utils_1.getElementById)('d3'), (0, utils_1.getElementById)('d4'), (0, utils_1.getElementById)('h1'), (0, utils_1.getElementById)('h2'), (0, utils_1.getElementById)('mt'), (0, utils_1.getElementById)('st')];
function onMouseDown(e) {
  e.preventDefault();
  if (e.target === null || !(0, utils_1.targetHasId)(e.target)) return;
  clickedDiv = e.target.id;
  clickedDivPos.x = e.clientX;
  clickedDivPos.y = e.clientY;
  // show which div is being clicked
  e.target.style.border = "2px solid blue";
  // put clicked div on top
  e.target.style.zIndex = exports.allDraggables.length.toString();
  var i = 1;
  for (var _i = 0, allDraggables_2 = exports.allDraggables; _i < allDraggables_2.length; _i++) {
    var div = allDraggables_2[_i];
    if (div.id !== clickedDiv) div.style.zIndex = (i++).toString();
  } // put all other divs behind the selected one
}
function onMouseMove(e) {
  e.preventDefault();
  if (clickedDiv === "") return;
  var d = (0, utils_1.getElementById)(clickedDiv);
  d.style.left = d.offsetLeft + e.clientX - clickedDivPos.x + "px"; // move the div by however much the mouse moved
  d.style.top = d.offsetTop + e.clientY - clickedDivPos.y + "px";
  clickedDivPos.x = e.clientX; // remember where the mouse is now
  clickedDivPos.y = e.clientY;
  (0, canvas_1.drawConnectors)();
}
function onMouseUp(e) {
  e.preventDefault();
  if (clickedDiv === "") return;
  (0, utils_1.getElementById)(clickedDiv).style.border = "none"; // hide the border again
  clickedDiv = "";
}
for (var _i = 0, allDraggables_1 = exports.allDraggables; _i < allDraggables_1.length; _i++) {
  var div = allDraggables_1[_i];
  div.onmousedown = onMouseDown;
}
document.onmousemove = onMouseMove;
document.onmouseup = onMouseUp;
window.onresize = canvas_1.drawConnectors;
},{"../utils":"src/utils/index.ts","../canvas":"src/canvas/index.ts"}],"src/canvas/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawConnectors = drawConnectors;
var utils_1 = require("../utils");
var draggable_1 = require("../draggable");
function getCenterOfDiv(div) {
  return {
    x: div.offsetLeft + div.clientWidth / 2,
    y: div.offsetTop + div.clientHeight / 2
  };
}
function getDistanceBetweenDivs(div1, div2) {
  var center1 = getCenterOfDiv(div1);
  var center2 = getCenterOfDiv(div2);
  return Math.sqrt(Math.pow(center1.x - center2.x, 2) + Math.pow(center1.y - center2.y, 2));
}
function getClosestDiv(div, draggables, visited) {
  var minDistance = Number.MAX_VALUE;
  var closestDiv = draggables[0];
  for (var _i = 0, draggables_1 = draggables; _i < draggables_1.length; _i++) {
    var d = draggables_1[_i];
    if (d === div) continue;
    if (visited.has(d.id)) continue;
    var distance = getDistanceBetweenDivs(div, d);
    if (distance < minDistance) {
      minDistance = distance;
      closestDiv = d;
    }
  }
  return closestDiv;
}
function drawLine(ctx, div1, div2) {
  var pos1 = getCenterOfDiv(div1);
  var pos2 = getCenterOfDiv(div2);
  ctx.moveTo(pos1.x, pos1.y);
  ctx.lineTo(pos2.x, pos2.y);
  ctx.stroke();
}
function drawConnectors() {
  var firstPerson = document.getElementsByClassName('firstTarget')[0];
  if (firstPerson === undefined) return;
  var draggables = (0, draggable_1.getDraggables)();
  var canvas = (0, utils_1.getElementById)('canvas');
  var ctx = canvas.getContext('2d');
  if (ctx === null) throw new Error('2d context not supported');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "#15a5ed";
  ctx.lineWidth = 3;
  var visited = new Set([firstPerson.id]);
  var visitedPath = [firstPerson.id];
  var nextPerson = firstPerson;
  while (visited.size < draggables.length) {
    var closestPerson = getClosestDiv(nextPerson, draggables, visited);
    visited.add(closestPerson.id);
    visitedPath.push(closestPerson.id);
    drawLine(ctx, nextPerson, closestPerson);
    nextPerson = closestPerson;
  }
  visitedPath.push(firstPerson.id);
  drawLine(ctx, nextPerson, firstPerson);
  (0, utils_1.getElementById)('path').innerText = visitedPath.join(' -> ');
  console.log(visitedPath);
}
},{"../utils":"src/utils/index.ts","../draggable":"src/draggable/index.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var utils_1 = require("./utils");
var canvas_1 = require("./canvas");
var canvas = (0, utils_1.getElementById)('canvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
(0, canvas_1.drawConnectors)();
var form = (0, utils_1.getElementById)('selectorForm');
var aoe1Radios = form.elements.namedItem('aoe1');
var aoe2Radios = form.elements.namedItem('aoe2');
var firstTargetRadios = form.elements.namedItem('first');
updateClassOfPlayer(aoe1Radios, 'aoe1');
updateClassOfPlayer(aoe2Radios, 'aoe2');
updateClassOfPlayer(firstTargetRadios, 'firstTarget');
function updateClassOfPlayer(radios, className) {
  var _loop_1 = function _loop_1(radio) {
    radio.onclick = function () {
      radios.forEach(function (r) {
        var selectedPlayer = (0, utils_1.getElementById)(r.value);
        selectedPlayer.classList.remove(className);
      });
      var selectedPlayer = (0, utils_1.getElementById)(radio.value);
      selectedPlayer.classList.add(className);
      (0, canvas_1.drawConnectors)();
    };
  };
  for (var _i = 0, radios_1 = radios; _i < radios_1.length; _i++) {
    var radio = radios_1[_i];
    _loop_1(radio);
  }
}
},{"./utils":"src/utils/index.ts","./canvas":"src/canvas/index.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62415" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map