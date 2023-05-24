import { useState } from "react";
import classes from "./ControlPanel.module.css";

const ControlPanel = (props) => {
  const [speed, setSpeed] = useState(30);

  const initializeGridHandler = () => {
    props.onInitializeGrid();
  };

  // const getGridInfoHandler = () => {
  //   props.onGetGridInfo();
  // };

  const startVisualizationHandler = () => {
    // console.log("Speed:", speed);
    props.onStartVisualization(speed);
  };

  const stopVisualizationHandler = () => {
    props.onStopVisualization();
  };

  const resetGridHandler = () => {
    props.onResetGrid();
  };

  const options = [10, 30, 90, 500, 1000];
  const optionNames = ["Super Fast", "Fast", "Medium", "Slow", "Super Slow"]

  return (
    <div className={classes.container}>
      <h2>Shortest Path Visualizer</h2>
      <div className={classes.controls}>
        <button onClick={initializeGridHandler}>Initialize Grid</button>
        {/* <button onClick={getGridInfoHandler}>Get the grid array</button> */}
        <div className={classes["speed-control"]}>
          <label>Speed </label>
          <select
            value={speed}
            onChange={(e) => !props.visualizationStarted ? setSpeed(e.target.value) : null}
            readOnly
          >
            {options.map((val, idx) => (
              <option key={idx} value={val}>
                {optionNames[idx]}
              </option>
            ))}
          </select>
        </div>
        <button onClick={startVisualizationHandler}>Start Visualization</button>
        <button onClick={stopVisualizationHandler}>Stop Visualization</button>
        <button onClick={resetGridHandler}>Reset Grid</button>
      </div>
    </div>
  );
};

export default ControlPanel;
