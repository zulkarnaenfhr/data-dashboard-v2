import React, { Component } from "react";
import "./TopTvProgram.css";

class Toptvprogram extends Component {
    render() {
        return (
            <div id="topTvProgram">
                <div className="topTvProgram-judul">
                    <p className="cardJudul">Top 10 Tv Program</p>
                </div>
                <div>
                    {this.props.tvCategoryData.map((data, index) => {
                        if (index < 1) {
                            return (
                                <div key={data.category}>
                                    <p className="listTop" key={data.category}>
                                        {index + 1}.{data.category} ({data.jumlah})
                                    </p>
                                    <div className="border1"></div>
                                </div>
                            );
                        } else if (index < 10) {
                            return (
                                <div key={data.category}>
                                    <p className="listTop2" key={data.category}>
                                        {index + 1}.{data.category} ({data.jumlah})
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

export default Toptvprogram;
