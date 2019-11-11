import React from "react";
import CanvasJSReact from "../../../canvas/canvasjs.react";

class Depth extends React.Component {
  render() {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
      theme: "dark2",
      animationEnabled: true,
    //   exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title: {
        text: "BTC Trades"
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{label}",
          toolTipContent: "{label}: <strong>{y}%</strong>",
          indexLabel: "{y}%",
          indexLabelPlacement: "inside",
          dataPoints: [
            { y: 50, label: "Sell" },
            { y: 50, label: "Buy" },
          ]
        }
      ]
    };
    return (
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    );
  }
}

export default Depth;
