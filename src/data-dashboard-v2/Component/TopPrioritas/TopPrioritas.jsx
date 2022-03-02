import React, { Component } from "react";
import "./TopPrioritas.css";

class Topprioritas extends Component {
    render() {
        return (
            <div id="topPrioritas">
                <div className="topPrioritas-judul">
                    <p className="cardJudul">Top 10 Scoring Wilayah Prioritas</p>
                </div>
                <div>
                    {this.props.scoringPrioritas.map((data, index) => {
                        if (index < 1) {
                            return (
                                <div key={data.namaKelurahan}>
                                    <p className="listTop" key={data.namaKelurahan}>
                                        {index + 1}.{data.namaKelurahan} ({data.nilaiScoring})
                                    </p>
                                    <div className="border1"></div>
                                </div>
                            );
                        } else if (index < 10) {
                            return (
                                <div key={data.namaKelurahan}>
                                    <p className="listTop2" key={data.namaKelurahan}>
                                        {index + 1}.{data.namaKelurahan} ({data.nilaiScoring})
                                    </p>
                                    <div className="border1"></div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Topprioritas;
