import React from "react";

import "./ChartBar.css";

const ChartBar = (props) => {

    let barFillHeight = "0%";

    if(props.maxValue > 0) {
        barFillHeight = Math.round((props.value/props.maxValue)*100) + "%"; 
    }

    return (
        <div className="chart-bar">
            {/* Note we added the dynamic inline css style using the "style" attribute 
            that every html element has and this "style" attribute is special because it 
            expects an object so we use embedded expression(curly braces) to assign that 
            object. In that object the css style property should be in camel case or if 
            we want to use the same property name as we would in css then we need to use 
            double quotes to wrap it. */}
            <div className="chart-bar__inner">
                <div 
                    className="chart-bar__fill"
                    style={{height: barFillHeight}}
                ></div>
            </div>
            <div className="chart-bar__label">{props.label}</div>
        </div>
    );

}

export default ChartBar;