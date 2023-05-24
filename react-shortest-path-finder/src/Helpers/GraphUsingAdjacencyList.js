import { Queue } from "./Queue";
import { Heap } from "./Heap";

export function GraphUsingAdjacencyList() {
  this.adjacenyList = new Map();

  this.addVertex = (vertexId) => {
    if (typeof vertexId !== "string") {
      throw new Error(
        `'vertexId' must be of type 'string' given: '${vertexId}'!`
      );
    }

    if (this.adjacenyList.get(vertexId) === undefined) {
      this.adjacenyList.set(vertexId, new Map());
    } else {
      throw new Error(`'vertexId': '${vertexId}' is not unique!`);
    }
  };

  /* src -> source vertex id
    dest -> destination vertex id 
    And we right now have a graph that is undirected and unweighted. 
  
    We are using a Map where the key is the vertex id and the value a Map whose
    key stores the vertex's neighbour's id and value contains info about this
    edge like the weight.
    */
  this.addEdge = (src, dest, weight = 1) => {
    const srcConnections = this.adjacenyList.get(src);
    if (srcConnections === undefined) {
      throw new Error(`'src': '${src}' doesn't exist in the graph!`);
    }

    const destConnections = this.adjacenyList.get(dest);
    if (destConnections === undefined) {
      throw new Error(`'dest': '${dest}' doesn't exist in the graph!`);
    }

    srcConnections.set(dest, { weight: weight });
    destConnections.set(src, { weight: weight });
  };

  /* start -> start vertex id */
  this.bfsTraverse = (start) => {
    if (this.adjacenyList.size > 0) {
      const startConnections = this.adjacenyList.get(start);
      if (startConnections === undefined) {
        throw new Error(`'start': '${start}' doesn't exist in the graph!`);
      }

      let queue = new Queue();
      let visitedVerticesIds = {};

      queue.enqueue(start);

      while (!queue.isEmpty()) {
        let vertexId = queue.dequeue();
        visitedVerticesIds[vertexId] = true;

        let vertexConnections = this.adjacenyList.get(vertexId);
        console.log(vertexId);

        for (let key of vertexConnections.keys()) {
          if (!visitedVerticesIds[key]) {
            // console.log(`key: ${key} visited: ${!visitedVerticesIds[key]}`);
            queue.enqueue(key);
            visitedVerticesIds[key] = true;
          }
        }
      }
      console.log("BFS traversal of the graph completed!");
    }
  };

  this.findShortestDistanceFrom = async (
    srcVertexId,
    destVertexId,
    colorScannedCellCallback,
    waitCallback,
    speed,
    stopVisualization
  ) => {
    let sdo = {};
    let items = [];
    let count = 0;

    /* Here we initialize the sdo which contains the vertexId as key and its dValue
      as value. */
    for (let key of this.adjacenyList.keys()) {
      if (key === srcVertexId) {
        sdo[key] = 0;
        items.push([count, { key: key, dValue: 0 }]);
      } else {
        sdo[key] = Infinity;
        items.push([count, { key: key, dValue: Infinity }]);
      }
      count++;
    }

    // console.log(sdo);
    // console.log(items);

    const heap = new Heap("min", new Map(items));
    heap.heapify();

    // console.log(heap.items);
    // console.log(heap.keyIndexMap);

    let destVertexFound = false;
    let stop = false;

    while (!heap.isEmpty()) {
      let node = heap.delete();

      // console.log("After delete:");
      // console.log(heap.items);
      // console.log(heap.keyIndexMap);
      // console.log("node:", node);

      let adjacentNodes = this.adjacenyList.get(node.key);

      if (node.key === srcVertexId) {
        await waitCallback(speed);
        colorScannedCellCallback(srcVertexId);
      }

      for (let adjacentNodeId of adjacentNodes.keys()) {
        // console.log("Adjacent Node:", adjacentNodeId);
        if (
          sdo[adjacentNodeId] >
          sdo[node.key] + adjacentNodes.get(adjacentNodeId).weight
        ) {
          let newDValue =
            sdo[node.key] + adjacentNodes.get(adjacentNodeId).weight;
          sdo[adjacentNodeId] = newDValue;
          // console.log("newDValue:",newDValue);
          heap.decrementKey(adjacentNodeId, newDValue);

          // console.log("After decrementKey:");
          // console.log(heap.items);
          // console.log(heap.keyIndexMap);

          await waitCallback(speed);
          colorScannedCellCallback(adjacentNodeId);
        }

        if (adjacentNodeId === destVertexId) {
          destVertexFound = true;
          break;
        }

        if (stopVisualization()) {
          stop = true;
        }
      }

      if (destVertexFound) break;

      if (stop) break;
    }

    return sdo;
  };

  this.findShortestPath = async (
    srcVertexId,
    destVertexId,
    colorScannedCellCallback,
    waitCallback,
    speed,
    stopVisualization
  ) => {
    const sdo = await this.findShortestDistanceFrom(
      srcVertexId,
      destVertexId,
      colorScannedCellCallback,
      waitCallback,
      speed,
      stopVisualization
    );

    let currentVertexId = destVertexId;
    let path = [];
    path.push(currentVertexId);

    while (currentVertexId !== srcVertexId) {
      // adjaentNodes contains the nodes adjacent to currentVertexId.
      let adjaentNodes = this.adjacenyList.get(currentVertexId);

      for (let adjacentNodeId of adjaentNodes.keys()) {
        //   console.log("adjacentNodeId:", adjacentNodeId);
        /* When adjacentNodeId is same as srcVertexId then we can't say:
          currentVertexId = adjacentNodeId
          because the srcVertexId has the least dValue of all the adjacent nodes of
          currentVertexId.
          and there may be a case when:
          sdo[srcVertexId] + adjaentNodes.get(srcVertexId).weight > sdo[currentVertexId]
          in which case the direct link b/w srcVertexId and currentVertexId is not there.
           */
        if (adjacentNodeId === srcVertexId) {
          if (
            sdo[adjacentNodeId] + adjaentNodes.get(adjacentNodeId).weight ===
            sdo[currentVertexId]
          ) {
            currentVertexId = adjacentNodeId;
          }
        } else {
          if (sdo[adjacentNodeId] < sdo[currentVertexId]) {
            currentVertexId = adjacentNodeId;
          }
        }
      }

      /* In case when there is no path from srcVertexId to destVertexId then the
        'path' array will contain  just a single element that is the destVertexId. */
      if (currentVertexId === destVertexId) break;
      else {
        //   console.log("currentVertexId:", currentVertexId);
        path.push(currentVertexId);
      }
    }

    /* We are reversing the 'path' so that the vertices ids appear in the order from 
      srcVertex to destVertex. */
    return path.reverse();
  };
}
