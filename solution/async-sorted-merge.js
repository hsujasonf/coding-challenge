"use strict";
const MinHeap = require("../lib/min-heap");

async function popUntilDrained(logSource, heap) {
  let logEntry;
  while (!logSource.drained) {
    logEntry = await logSource.popAsync();
    if (logEntry) {
      heap.push(logEntry);
    }
  }
}

module.exports = async (logSources, printer) => {
  const minHeap = new MinHeap();
  // pop all log entries into a min heap
  await Promise.all(
    logSources.map((logSource) => popUntilDrained(logSource, minHeap))
  );
  // minHeap.pop() will always return earliest date, pop until heap is empty
  while (minHeap.heap.length) {
    const logEntry = minHeap.pop();
    printer.print(logEntry);
  }
  printer.done();
  console.log("Async sort complete.");
};
