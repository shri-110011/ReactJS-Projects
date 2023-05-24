import { GraphUsingAdjacencyList } from "./GraphUsingAdjacencyList";

const GridToGraphConverter = (gridInfo) => {
  console.log("Inside GridToGraphConverter");
  console.log(gridInfo);

  const graph = new GraphUsingAdjacencyList();

  for (let cell of gridInfo.grid) {
    if (!cell[1]) {
      // console.log(cell);
      graph.addVertex("" + cell[0]);
    }
  }

  for (let cell of gridInfo.grid) {
    if (!cell[1]) {
      let rowNo = Math.floor(cell[0] / gridInfo.noOfColumns);
      let columnNo = cell[0] % gridInfo.noOfColumns;

      if (rowNo - 1 >= 0) {
        let cellNo = (rowNo - 1) * gridInfo.noOfColumns + columnNo;
        if (!gridInfo.grid[cellNo][1]) {
          graph.addEdge("" + cell[0], "" + cellNo);
        }
      }

      if (rowNo + 1 < gridInfo.noOfRows) {
        let cellNo = (rowNo + 1) * gridInfo.noOfColumns + columnNo;
        if (!gridInfo.grid[cellNo][1]) {
          graph.addEdge("" + cell[0], "" + cellNo);
        }
      }

      if (columnNo - 1 >= 0) {
        let cellNo = rowNo * gridInfo.noOfColumns + columnNo - 1;
        if (!gridInfo.grid[cellNo][1]) {
          graph.addEdge("" + cell[0], "" + cellNo);
        }
      }

      if (columnNo + 1 < gridInfo.noOfColumns) {
        let cellNo = rowNo * gridInfo.noOfColumns + columnNo + 1;
        if (!gridInfo.grid[cellNo][1]) {
          graph.addEdge("" + cell[0], "" + cellNo);
        }
      }
    }
  }
  console.log(graph.adjacenyList);
  return graph;
};

export default GridToGraphConverter;
