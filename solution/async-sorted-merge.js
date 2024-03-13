"use strict";
const MinHeap = require("../lib/min-heap");

async function populateMinHeap(minHeap, logSources) {
  const promises = [];
  logSources.forEach((logSource) => {
    if (!logSource.drained) {
      promises.push(pushLogEntryToHeap(minHeap, logSource));
    }
  });
  return Promise.all(promises);
}

async function pushLogEntryToHeap(minHeap, logSource) {
  const logEntry = await logSource.popAsync();
  if (logEntry) {
    minHeap.push(logEntry);
  }
}

module.exports = async (logSources, printer) => {
  let minHeap = new MinHeap();
  // start with populating min heap by popping from every logSource
  await populateMinHeap(minHeap, logSources);

  while (minHeap.heap.length) {
    printer.print(minHeap.pop());
    // min length is logSource length squared since when it hits
    // a limit, it will push logSources.length at a time
    if (minHeap.heap.length < logSources.length * logSources.length) {
      await populateMinHeap(minHeap, logSources);
    }
  }
  printer.done();
  return console.log("Async sort complete.");
};
