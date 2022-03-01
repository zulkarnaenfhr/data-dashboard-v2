import React, { Component } from "react";
import "./CardKecil.css";

class Cardkecil extends Component {
    render() {
        return (
            <div id="cardKecil">
                <div className="cardKecil-judul">
                    <p className="cardJudul">{this.props.judul}</p>
                </div>
                <div className="cardKecil-content">
                    <p>{this.props.value}</p>
                </div>
            </div>
        );
    }
}

export default Cardkecil;
