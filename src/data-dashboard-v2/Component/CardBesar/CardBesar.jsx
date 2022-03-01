import React, { Component } from "react";
import "./CardBesar.css";

class Cardbesar extends Component {
    render() {
        return (
            <div id="cardBesar">
                <div className="cardBesar-judul">
                    <p className="cardJudul">{this.props.judul}</p>
                </div>
                <div className="cardBesar-content">
                    <p>{this.props.value}</p>
                </div>
            </div>
        );
    }
}

export default Cardbesar;
