import React, { useRef, useImperativeHandle } from "react";
import classes from "./GridCell.module.css";

const GridCell = React.forwardRef((props, ref) => {
  const cellWidth = props.cellWidth;
  const cellHeight = 30;

  const cellRef = useRef();

  function colorCellLyingInShortestPath() {
    cellRef.current.style.backgroundColor = "#ff5722";
  }

  function colorCellWhileScanningForShortestPath(chageColorOf) {
    cellRef.current.style.backgroundColor = "#daf023";
  }

  function restoreCellColorToNormal() {
    // console.log("Inside restoreCellColorToNormal");
    cellRef.current.style.removeProperty("background-color");
  }

  useImperativeHandle(ref, () => {
    return {
      colorCellLyingInShortestPath: colorCellLyingInShortestPath,
      colorCellWhileScanningForShortestPath:
        colorCellWhileScanningForShortestPath,
      restoreCellColorToNormal: restoreCellColorToNormal,
    };
  });

  function onMouseEnterHandler(e) {
    // console.log("Inside GridCell onMouseEnterHandler:");
    if (
      (props.wallCreationStarted &&
        e.target !== document.getElementById("start") &&
        e.target !== document.getElementById("end")) ||
      props.startMarkerSelected ||
      props.endMarkerSelected
    ) {
      props.onMouseEnter(e, props.cellNo);
    }
  }

  function onMouseDownHandler(e) {
    // console.log("Inside GridCell onMouseDownHandler:");
    // e.type = 'mousedown' and e.button = 0 -> left mouse button up
    //  e.type = 'mousedown' and e.button = 2 -> right mouse button up
    // console.log(e);
    // console.log((e.type === 'mousedown' && e.button === 0) && (e.target !== document.getElementById('start') && e.target !== document.getElementById('start-marker')));

    if (e.type === "mousedown" && e.button === 0 && !props.shortestPathDrawn) {
      if (e.target === document.getElementById("start-marker")) {
        // console.log("Start marker selected");
        props.onStartMarkerSelected(true);
        return;
      }

      if (e.target === document.getElementById("end-marker")) {
        // console.log("End marker selected");
        props.onEndMarkerSelected(true);
        return;
      }

      if (
        e.target !== document.getElementById("start") &&
        e.target !== document.getElementById("end")
      ) {
        props.onMouseDown();
        props.onMouseEnter(e, props.cellNo);
      }
    }
  }

  function onMouseUpHandler(e) {
    // console.log("Inside GridCell onMouseUpHandler:");
    // e.type = 'mouseup' and e.button = 0 -> left mouse button up
    //  e.type = 'mouseup' and e.button = 2 -> right mouse button up
    // console.log(e);

    if (e.type === "mouseup" && e.button === 0 && !props.shortestPathDrawn) {
      if (props.wallCreationStarted) {
        props.onMouseUp();
      } else if (props.startMarkerSelected) {
        props.onStartMarkerSelected(false);
      } else if (props.endMarkerSelected) {
        props.onEndMarkerSelected(false);
      }
    }
  }

  return (
    <div
      className={classes["grid-item"]}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      onMouseEnter={onMouseEnterHandler}
      ref={cellRef}
    >
      {props.cellNo === props.startCell ? (
        <svg id="start" width={cellWidth} height="30px">
          <polygon
            points={`${cellWidth * 0.3}, ${cellHeight * 0.2} ${
              cellWidth * 0.7
            }, ${cellHeight * 0.5}, ${cellWidth * 0.3} ${cellHeight * 0.8}`}
            // stroke="white"
            // strokeWidth={cellWidth*0.04}
            fill="purple"
            id="start-marker"
          />
        </svg>
      ) : null}

      {props.cellNo === props.endCell ? (
        <svg id="end" width={cellWidth} height={cellHeight + "px"}>
          <circle
            cx={cellWidth / 2}
            cy="50%"
            r="10"
            stroke="green"
            strokeWidth={cellWidth * 0.05}
            fill="yellow"
            id="end-marker"
          />
        </svg>
      ) : null}
    </div>
  );
});

export default GridCell;
