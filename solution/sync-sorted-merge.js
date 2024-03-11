"use strict";
const MinHeap = require("../lib/min-heap");

// Print all entries, across all of the sources, in chronological order.

const popUntilDrained = (logSource, heap) => {
  while (!logSource.drained) {
    heap.push(logSource.pop());
  }
};

module.exports = (logSources, printer) => {
  let minHeap = new MinHeap();
  // pop all log entries into a min heap
  logSources.forEach((logSource) => {
    popUntilDrained(logSource, minHeap);
  });
  // minHeap.pop() will always return earliest date, pop until heap is empty
  while (minHeap.heap.length) {
    printer.print(minHeap.pop());
  }
  printer.done();
  return console.log("Sync sort complete.");
};
