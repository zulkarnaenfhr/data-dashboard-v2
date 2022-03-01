import React, { Component } from "react";
import "./TopARPU.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

class Toparpu extends Component {
    render() {
        return (
            <div id="TopARPU">
                <Bar
                    height={320}
                    width={600}
                    data={{
                        labels: this.props.labelWilayah,
                        datasets: [
                            {
                                label: "Avarage RPU",
                                backgroundColor: "#afbdf0",
                                borderColor: "rgba(0,0,0,1)",
                                borderWidth: 2,
                                data: this.props.valueARPU,
                            },
                        ],
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "Average Rainfall per month",
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: "right",
                        },
                        maintainAspectRatio: true,
                    }}
                />
            </div>
        );
    }
}

export default Toparpu;
