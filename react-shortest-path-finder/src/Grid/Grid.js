import { React, useState, Fragment, useRef, useEffect } from "react";

import GridCell from "./GridCell/GridCell";
import ControlPanel from "./ControlPanel/ControlPanel";
import GridToGraphConverter from "../Helpers/GridToGraphConverter";

import classes from "./Grid.module.css";

const Grid = () => {
  const noOfRows = 12;
  const noOfColumns = 20;
  const containerWidth = window.innerWidth * 0.9;
  const padding = 10;
  const gapToCellWidth = 0.02;
  const cellWidth = getcellWidth();
  const gap = gapToCellWidth * cellWidth;

  const [grid, setGrid] = useState([]);
  const [startCell, setStartCell] = useState(104);
  const [endCell, setEndCell] = useState(76);
  const [wallCreationStarted, setWallCreationStarted] = useState(false);
  const [startMarkerSelected, setStartMarkerSelected] = useState(false);
  const [endMarkerSelected, setEndMarkerSelected] = useState(false);
  const [visualizationStarted, setVisualizationStarted] = useState(false);
  const [stopVisualization, setStopVisualization] = useState(false);
  const [shortestPathDrawn, setShortestPathDrawn] = useState(false);
  const [resetGrid, setResetGrid] = useState(false);

  const gridCellRefs = useRef([]);
  const stopVisualizationRef = useRef();

  /* Note we are using useEffect() and useRef() hooks to use the latest state in
  the callback function. This callback function is then passed to another function
  (GraphUsingAdjacencyList.findShortestPath()) which is not a React component. */
  useEffect(() => {
    // console.log("Inside Grid useEffect");
    stopVisualizationRef.current = stopVisualization;
  }, [stopVisualization]);

  // console.log("Inside Grid.js");

  /* initializeGrid() creates a 2-D array of length noOfRows*noOfColumns. In each 
  row of the array the first element is the cellNo and the second element is a boolean
  representing if the cell is a wall or not.*/
  const initializeGrid = () => {
    if (grid.length === 0) {
      console.log("Initializing Grid");
      let arr = [];
      for (let i = 0; i < noOfRows * noOfColumns; i++) {
        arr[i] = [i, false];
      }
      // console.log(arr.length);
      setGrid(arr);
    }
  };

  /* containerWidth = 2*padding + gap*(noOfColumns-1) + noOfColumns*widthOfColumn 
  gap = 0.03*widthOfColumn
  */

  function repeatString(text, num) {
    let str = "";
    for (let i = 0; i < num; i++) {
      if (i === num - 1) str = str + text + "";
      else str = str + text + " ";
    }
    // console.log(str);
    return str;
  }

  function onMouseDownHandler() {
    // console.log("Inside Grid onMouseDownHandler:");
    setWallCreationStarted(true);
    setResetGrid(false);
  }

  function onMouseUpHandler() {
    // console.log("Inside Grid onMouseUpHandler:");
    setWallCreationStarted(false);
  }

  function onMouseEnterHandler(e, cellNo) {
    // console.log(e.target, cellNo);
    // console.log(startMarkerSelected);

    if (startMarkerSelected) {
      // console.log("Start marker selected");
      // console.log(grid[cellNo]);
      if (!grid[cellNo][1] && cellNo !== endCell) {
        setStartCell(cellNo);
      }
      return;
    }

    if (endMarkerSelected) {
      // console.log("End marker selected");
      // console.log(grid[cellNo]);
      if (!grid[cellNo][1] && cellNo !== startCell) {
        setEndCell(cellNo);
      }
      return;
    }

    e.target.style.backgroundColor = "#7b7e7a";
    grid[cellNo][1] = true;

    // console.log(grid[cellNo]);
  }

  function startMarkerSelectedHandler(startSelected) {
    // console.log("startSelected:",startSelected);
    setStartMarkerSelected(startSelected);
  }

  function endMarkerSelectedHandler(endSelected) {
    // console.log("endSelected:",endSelected);
    setEndMarkerSelected(endSelected);
  }

  function getcellWidth() {
    let widthOfCell =
      (containerWidth - 2 * padding) /
      (gapToCellWidth * (noOfColumns - 1) + noOfColumns);
    // console.log("widthOfCell:", widthOfCell);
    return widthOfCell;
  }

  function initializeGridHandler() {
    initializeGrid();
  }

  function getGridInfoHandler() {
    console.log(grid);
  }

  /* This startVisualizationHandler() will run when all the below conditions are met:
  1. The grid has been initialized i.e. grid.length > 0. 
  2. 'shortestPathDrawn' is false because once the shortest path has been drawn there is 
  no point in running this startVisualizationHandler() again. 
  3. 'visualizationStarted' is false because we are not allowed to re-run this 
  startVisualizationHandler() when the call to this function is already in progress.  */
  async function startVisualizationHandler(speed) {
    if (!shortestPathDrawn && grid.length > 0 && !visualizationStarted) {
      console.log("Visualization started");
      console.log("Speed:", speed);
      const gridInfo = {
        grid: grid,
        noOfRows: noOfRows,
        noOfColumns: noOfColumns,
        startCell: startCell,
        endCell: endCell,
      };

      setVisualizationStarted(true);

      const graph = await GridToGraphConverter(gridInfo);

      const sda = await graph.findShortestPath(
        "" + gridInfo.startCell,
        "" + gridInfo.endCell,
        (cellNo) => {
          gridCellRefs.current[+cellNo].colorCellWhileScanningForShortestPath();
        },
        wait,
        speed,
        () => {
          // console.log(stopVisualizationRef.current);
          return stopVisualizationRef.current;
        }
      );

      if (!stopVisualizationRef.current) {
        await wait(2000);

        console.log(sda);

        if (sda.length !== 1) {
          for (let cellNo of sda) {
            // console.log(cellNo);
            gridCellRefs.current[+cellNo].colorCellLyingInShortestPath();
          }
        }
        if (sda.length > 1) console.log("Shortest path drawn!");
      } else {
        window.alert("Visualization Stopped!");
      }

      setShortestPathDrawn(true);
      setResetGrid(false);
      setVisualizationStarted(false);
    }
  }

  /* This wait() helper allows us to create an arbitrary pause while execution of the 
  code. This is used in the Djkstra algorithm on each iteration of the for-loop and
  also after the shortest path is known but before drawing the shortest path. */
  function wait(timeInMilliSeconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log("Timeout elapsed");
        resolve();
      }, timeInMilliSeconds);
    });
  }

  function stopVisualizationHandler() {
    if (visualizationStarted) {
      console.log("Stopping Visualization");
      setStopVisualization(true);
    }
  }

  /* Once the grid is reset then we are placing the start and end markers back to their
  initial positions, and we are also changing the 'shortestPathDrawn' state variable to 
  false because in this case the grid is fresh to start over again.
  Also we allow grid reset, only when the 'grid' array has been initialized i.e. 
  grid.length > 0 and visualization hasn't started yet. */
  function resetGridHandler() {
    if (!resetGrid && grid.length > 0 && !visualizationStarted) {
      setStartCell(104);
      setEndCell(76);
      setShortestPathDrawn(false);
      for (let i = 0; i < noOfRows * noOfColumns; i++) {
        grid[i][1] = false;
        gridCellRefs.current[i].restoreCellColorToNormal();
      }
      setResetGrid(true);
      setStopVisualization(false);
    }
  }

  return (
    <Fragment>
      <ControlPanel
        onInitializeGrid={initializeGridHandler}
        onGetGridInfo={getGridInfoHandler}
        onStartVisualization={startVisualizationHandler}
        onStopVisualization={stopVisualizationHandler}
        onResetGrid={resetGridHandler}
        visualizationStarted={visualizationStarted}
      />
      <div
        id="grid"
        className={classes["grid-container"]}
        style={{
          gridTemplateColumns: repeatString(cellWidth + "px", noOfColumns),
          width: containerWidth,
          padding: padding,
          gap: gap,
        }}
      >
        {/* Note how we are storing the reference of all the 'GridCell' components 
        inside the 'gridCellRefs' which holds an array of refs. 'GridCell' is a custom
        component so using a reference for it would provide access to the code/data
        that we expose inside it.

        And we are exposing some functions inside 'GridCell' using the 
        'useImperativeHandle' and 'forwardRef' so that we could access the childs component
        ('GridCell') functions inside the parent component('Grid') without using the 
        props and state concept. */}
        {grid.map((el, idx) => (
          <GridCell
            key={idx}
            cellNo={idx}
            cellWidth={cellWidth}
            startCell={startCell}
            endCell={endCell}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onMouseEnter={onMouseEnterHandler}
            wallCreationStarted={wallCreationStarted}
            onStartMarkerSelected={startMarkerSelectedHandler}
            onEndMarkerSelected={endMarkerSelectedHandler}
            startMarkerSelected={startMarkerSelected}
            endMarkerSelected={endMarkerSelected}
            ref={(el) => (gridCellRefs.current[idx] = el)}
            shortestPathDrawn={shortestPathDrawn}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Grid;
