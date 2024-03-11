class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    if (!value) return;

    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length === 0) return null;

    const first = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return first;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.isChildSmaller(currentIndex, parentIndex)) {
        this.swapElements(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let current = 0;

    while (true) {
      let smallest = current;
      const leftChild = 2 * current + 1;
      const rightChild = 2 * current + 2;

      if (this.isRightChildSmaller(rightChild, smallest)) {
        smallest = rightChild;
      }

      if (this.isLeftChildSmaller(leftChild, smallest)) {
        smallest = leftChild;
      }

      if (smallest !== current) {
        this.swapElements(current, smallest);
        current = smallest;
      } else {
        break;
      }
    }
  }

  isChildSmaller(childIndex, parentIndex) {
    return (
      this.heap[childIndex].date.getTime() <
      this.heap[parentIndex].date.getTime()
    );
  }

  isLeftChildSmaller(leftChildIndex, smallestIndex) {
    return (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].date.getTime() <
        this.heap[smallestIndex].date.getTime()
    );
  }

  isRightChildSmaller(rightChildIndex, smallestIndex) {
    return (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].date.getTime() <
        this.heap[smallestIndex].date.getTime()
    );
  }

  swapElements(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
}

module.exports = MinHeap;
