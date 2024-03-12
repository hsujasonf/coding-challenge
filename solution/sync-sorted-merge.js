"use strict";
const heapifyDown = require("../lib/heapify-down");

module.exports = (logSources, printer) => {
  // instead of building a new heap, heapify the logSources array
  for (let i = Math.floor(logSources.length / 2) - 1; i >= 0; i--) {
    heapifyDown(logSources, i);
  }

  while (logSources.length) {
    // printing logSources[0].pop won't log the first 'last' log so I chose to print logSource[0].last and then call pop()
    printer.print(logSources[0].last);
    logSources[0].pop();

    if (logSources[0].drained) {
      // if we pop and the logSource is drained, remove it and then move the last element to
      // the zero index like a normal minHeap pop method and call heapifyDown
      logSources.shift();
      const last = logSources.pop();
      if (logSources.length > 0) {
        logSources.unshift(last);
      }
    }
    // after calling pop, we don't know what the new date could be so we need to heapify logSources
    heapifyDown(logSources, 0);
  }
  printer.done();
  return console.log("Sync sort complete.");
};
