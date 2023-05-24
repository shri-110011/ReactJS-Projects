export function Heap(type = "max", items = new Map()) {
  /* this.items is map where the key is an integer starting from 0 and the value 
    contains the nodes. Each node is an object with 2 properties:
    "key": string
    "dValue": number */
  this.items = items;

  /*   this.keyIndexMap is a map whose keys are the ids of the nodes and values are
    the indexes in this.items where the corresponding nodes are stored. */
  this.keyIndexMap = new Map();

  if (typeof type !== "string") {
    throw new Error(`Type of 'type' is: ${type} expected: string.`);
  }

  if (type !== "min" && type !== "max") {
    throw new Error(
      `Value for 'type' must be either 'max' or 'min' but provided: '${type}'.`
    );
  }

  Object.defineProperty(this, "heapSize", {
    get: function () {
      return this.items.size;
    },
  });

  this.insert = (val) => {
    if (this.keyIndexMap.get(val.key) === undefined) {
      this.items.set(this.heapSize, val);
      this.adjustUpwwards(this.heapSize - 1);
    } else {
      throw new Error(`Node having duplicate key: '${val.key}' provided!`);
    }
  };

  this.delete = () => {
    const { key, dValue } = this.items.get(0);
    this.items.set(0, this.items.get(this.heapSize - 1));
    this.items.delete(this.heapSize - 1);
    this.keyIndexMap.delete(key);

    this.adjustDownwards(0);
    return { key: key, dValue: dValue };
  };

  this.adjustUpwwards = (nodeIdx) => {
    // console.log("nodeIdx:",nodeIdx);
    const val = this.items.get(nodeIdx);

    while (nodeIdx !== 0) {
      let parentIdx = Math.floor((nodeIdx - 1) / 2);
      let nodeVal = this.items.get(nodeIdx);
      let parentVal = this.items.get(parentIdx);
      if (this._compare(nodeVal, parentVal)) {
        this.keyIndexMap.set(this.items.get(nodeIdx).key, parentIdx);
        this.keyIndexMap.set(this.items.get(parentIdx).key, nodeIdx);

        this._swap(nodeIdx, parentIdx);

        nodeIdx = parentIdx;
      } else {
        break;
      }
    }
    this.keyIndexMap.set(val.key, nodeIdx);
    // console.log("Adjust upwards done!");
  };

  this.adjustDownwards = (nodeIdx) => {
    let leftChildIdx;
    while ((leftChildIdx = 2 * nodeIdx + 1) < this.heapSize) {
      let rightChildIdx = 2 * nodeIdx + 2;
      let parentVal = this.items.get(nodeIdx);
      let leftChildVal = this.items.get(leftChildIdx);
      if (rightChildIdx >= this.heapSize) {
        if (this._compare(leftChildVal, parentVal)) {
          /* We have to change the keyIndexMap before we swap the nodes in items. */
          this.keyIndexMap.set(this.items.get(nodeIdx).key, leftChildIdx);
          this.keyIndexMap.set(this.items.get(leftChildIdx).key, nodeIdx);

          this._swap(leftChildIdx, nodeIdx);
          nodeIdx = leftChildIdx;
        } else {
          break;
        }
      } else {
        let rightChildVal = this.items.get(rightChildIdx);
        if (
          this._compare(leftChildVal, rightChildVal) ||
          leftChildVal.dValue === rightChildVal.dValue
        ) {
          if (this._compare(leftChildVal, parentVal)) {
            this.keyIndexMap.set(this.items.get(nodeIdx).key, leftChildIdx);
            this.keyIndexMap.set(this.items.get(leftChildIdx).key, nodeIdx);

            this._swap(leftChildIdx, nodeIdx);
            nodeIdx = leftChildIdx;
          } else {
            break;
          }
        } else {
          if (this._compare(rightChildVal, parentVal)) {
            this.keyIndexMap.set(this.items.get(nodeIdx).key, rightChildIdx);
            this.keyIndexMap.set(this.items.get(rightChildIdx).key, nodeIdx);

            this._swap(rightChildIdx, nodeIdx);
            nodeIdx = rightChildIdx;
          } else {
            break;
          }
        }
      }
    }
    // console.log("Adjust downwards done!");
  };

  this.heapify = () => {
    let lastNodeIdx = this.heapSize - 1;

    for (let nodeIdx = lastNodeIdx; nodeIdx >= 0; nodeIdx--) {
      // console.log("nodeIdx:",nodeIdx);
      /* Every node has to be first entered into the 'keyIndexMap' so that
          we know the index of every node in 'items' map. 
          
          During the heapify process if the indexes of the nodes in 'items' map 
          change those will also be reflected in 'keyIndexMap'. This can be seen
          in this.adjustDownwards() where the changes to the indexes associated
          with nodes are updated in 'keyIndexMap' just before each call to 
          this._swap() .
          */
      this.keyIndexMap.set(this.items.get(nodeIdx).key, nodeIdx);
      this.adjustDownwards(nodeIdx);
    }
  };

  this.decrementKey = (key, newDvalue) => {
    let idx;
    if ((idx = this.keyIndexMap.get(key)) !== undefined) {
      this.items.get(idx).dValue = newDvalue;

      this.adjustUpwwards(idx);
    }
  };

  this._swap = (idx1, idx2) => {
    let temp = this.items.get(idx1);
    this.items.set(idx1, this.items.get(idx2));
    this.items.set(idx2, temp);
  };

  /* In case of min heap _compare() will check if the val1 is less than val2.
      In case of max heap _compare() will check if the val1 is greater than val2. */
  this._compare = (val1, val2) => {
    if (type === "min") {
      return val1.dValue < val2.dValue;
    } else {
      return val1.dValue > val2.dValue;
    }
  };

  this.isEmpty = () => {
    return this.items.size === 0;
  };
}
