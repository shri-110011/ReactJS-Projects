import React from "react";

import ChartBar from "./ChartBar";
import "./Chart.css";

/* We have made this Chart component configurable that means the component that 
uses this Chart can choose the number of data points to be passed to this Chart 
so as to be plotted using the ChartBar.
 */
const Chart = (props) => {

    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMaximum = Math.max(...dataPointValues);

    return (
        <div className="chart">
            {props.dataPoints.map(dataPoint => (
                <ChartBar 
                    key={dataPoint.label}
                    value={dataPoint.value}
                    label={dataPoint.label}
                    maxValue={totalMaximum} />
            ))}
        </div>
    );

};

export default Chart;
