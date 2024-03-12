const heapifyDown = (arr, i) => {
  let current = i;

  while (true) {
    let smallest = current;
    const leftChild = 2 * current + 1;
    const rightChild = 2 * current + 2;

    if (
      rightChild < arr.length &&
      arr[rightChild].last.date.getTime() < arr[smallest].last.date.getTime()
    ) {
      smallest = rightChild;
    }

    if (
      leftChild < arr.length &&
      arr[leftChild].last.date.getTime() < arr[smallest].last.date.getTime()
    ) {
      smallest = leftChild;
    }

    if (smallest !== current) {
      [arr[current], arr[smallest]] = [arr[smallest], arr[current]];
      current = smallest;
    } else {
      break;
    }
  }
};

module.exports = heapifyDown;
