import React, { Component } from "react";
import "./TopPelangganHVC.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

class Toppelangganhvc extends Component {
    render() {
        return (
            <div id="topPelangganHVC">
                <Bar
                    height={260}
                    width={445}
                    data={{
                        labels: this.props.labelWilayah,
                        datasets: [
                            {
                                label: "Jumlah Pelanggan HVC",
                                backgroundColor: "#afbdf0",
                                borderColor: "rgba(0,0,0,1)",
                                borderWidth: 2,
                                data: this.props.nilai,
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

export default Toppelangganhvc;
