"use strict";
const heapifyDown = require("../lib/heapify-down");

module.exports = async (logSources, printer) => {
  // instead of building a new heap, heapify the logSources array
  for (let i = Math.floor(logSources.length / 2) - 1; i >= 0; i--) {
    heapifyDown(logSources, i);
  }

  while (logSources.length) {
    // printing logSources[0].pop won't log the first 'last' log so I chose to print logSource[0].last and then call pop()
    printer.print(logSources[0].last);
    //  I know it defeats the purpose of the task but since we're logging
    //  logSources[0].last, we could technically just call logSources[0].popAsync() without await
    //  and the last value of logSources[0]
    //  would change without a delay.
    await logSources[0].popAsync();
    if (logSources[0].drained) {
      logSources.shift();
      const last = logSources.pop();
      if (logSources.length > 0) {
        logSources.unshift(last);
      }
    }
    heapifyDown(logSources, 0);
  }
  printer.done();
  return console.log("Async sort complete.");
};
