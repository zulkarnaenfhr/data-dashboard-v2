import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { payakumbuhBarat, payakumbuhSelatan, payakumbuhTimur, payakumbuhUtara, lamposiTigoNagoro, center } from "./MapData";
import "./MapsComponent.css";

class Mapscomponent extends Component {
    render() {
        return (
            <div id="mapsComponent">
                {this.props.keyword === "LAMPOSI TIGO NAGORI" ? (
                    <div>
                        <MapContainer
                            center={center}
                            zoom={12}
                            style={{
                                width: "1032px",
                                height: "439px",
                            }}
                        >
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                                attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                            />
                            <Polygon color="cadetblue" fillColor="cadetblue" positions={lamposiTigoNagoro}>
                                <Popup>Limposi Tigo Nagaro</Popup>
                            </Polygon>
                        </MapContainer>
                    </div>
                ) : this.props.keyword === "PAYAKUMBUH BARAT" ? (
                    <div>
                        <MapContainer
                            center={center}
                            zoom={12}
                            style={{
                                width: "1032px",
                                height: "439px",
                            }}
                        >
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                                attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                            />
                            <Polygon color="lightcoral" fillColor="lightcoral" positions={payakumbuhBarat}>
                                <Popup>Payakumbuh Barat</Popup>
                            </Polygon>
                        </MapContainer>
                    </div>
                ) : this.props.keyword === "PAYAKUMBUH SELATAN" ? (
                    <div>
                        <MapContainer
                            center={center}
                            zoom={12}
                            style={{
                                width: "1032px",
                                height: "439px",
                            }}
                        >
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                                attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                            />
                            <Polygon color="blue" fillColor="blue" positions={payakumbuhSelatan}>
                                <Popup>Payakumbuh Selatan</Popup>
                            </Polygon>
                        </MapContainer>
                    </div>
                ) : this.props.keyword === "PAYAKUMBUH TIMUR" ? (
                    <div>
                        <MapContainer
                            center={center}
                            zoom={12}
                            style={{
                                width: "1032px",
                                height: "439px",
                            }}
                        >
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                                attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                            />
                            <Polygon color="purple" fillColor="purple" positions={payakumbuhTimur}>
                                <Popup>Payakumbuh Timur</Popup>
                            </Polygon>
                        </MapContainer>
                    </div>
                ) : this.props.keyword === "PAYAKUMBUH UTARA" ? (
                    <div>
                        <MapContainer
                            center={center}
                            zoom={12}
                            style={{
                                width: "1032px",
                                height: "439px",
                            }}
                        >
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                                attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                            />
                            <Polygon color="mediumseagreen" fillColor="mediumseagreen" positions={payakumbuhUtara}>
                                <Popup>Payakumbuh Utara</Popup>
                            </Polygon>
                        </MapContainer>
                    </div>
                ) : (
                    <div>
                        <MapContainer
                            center={center}
                            zoom={12}
                            style={{
                                width: "1032px",
                                height: "439px",
                            }}
                        >
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                                attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                            />
                            <Polygon color="cadetblue" fillColor="cadetblue" positions={lamposiTigoNagoro}>
                                <Popup>Limposi Tigo Nagaro</Popup>
                            </Polygon>
                            <Polygon color="lightcoral" fillColor="lightcoral" positions={payakumbuhBarat}>
                                <Popup>Payakumbuh Barat</Popup>
                            </Polygon>
                            <Polygon color="blue" fillColor="blue" positions={payakumbuhSelatan}>
                                <Popup>Payakumbuh Selatan</Popup>
                            </Polygon>
                            <Polygon color="purple" fillColor="purple" positions={payakumbuhTimur}>
                                <Popup>Payakumbuh Timur</Popup>
                            </Polygon>
                            <Polygon color="mediumseagreen" fillColor="mediumseagreen" positions={payakumbuhUtara}>
                                <Popup>Payakumbuh Utara</Popup>
                            </Polygon>
                        </MapContainer>
                    </div>
                )}
            </div>
        );
    }
}

export default Mapscomponent;
