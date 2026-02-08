import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

import L from "leaflet";
import markerIcon from "../../../../assets/logo2.png";
const ServiceArea = () => {

    const position = [24.4449, 90.7766];
    const serviceCenters = useLoaderData();

    // custom pointer
    const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    const mapRef = useRef(null)

    //search
    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value;

        const district = serviceCenters.find(c => c.district.toLowerCase()
            .includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 14)

        }

    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                We are available in 64 districts
            </h2>

           
            <div className="flex flex-col lg:flex-row gap-6">

               
                <div className="lg:flex-1 border rounded-lg overflow-hidden h-[600px]">
                    <MapContainer
                        className="h-full w-full"
                        center={position}
                        zoom={7}
                        scrollWheelZoom={false}
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {serviceCenters.map((center, index) => (
                            <Marker
                                key={index}
                                position={[center.latitude, center.longitude]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <strong>{center.district}</strong> <br />
                                    Service Area: {center.covered_area.join(', ')}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* SEARCH — Right side */}
                <div className="lg:w-1/3 flex items-center justify-center h-[600px]">
                    <div className="w-full max-w-md space-y-4">
                        <h3 className="text-xl font-semibold text-center">Find Service Area</h3>
                        <p className="text-center text-gray-500">
                            Search your district to find decorators available near you
                        </p>

                        <form
                            onSubmit={handleSearch}
                            className="flex items-center w-full bg-gray-300 rounded-full px-4 py-2 gap-3"
                        >
                            
                            <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>

                            
                            <input
                                name="location"
                                type="search"
                                placeholder="Search here"
                                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                            />

                         
                            <button
                                type="submit"
                                className="bg-lime-400 hover:bg-lime-500 text-black font-medium px-6 py-2 rounded-full transition"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    );

};

export default ServiceArea;