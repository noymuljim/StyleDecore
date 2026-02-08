import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        // <div className="card bg-base-100 shadow-xl">
        //     <figure>
        //         <img
        //             src={service.thumbnail}
        //             alt={service.serviceName}
        //             className="h-52 w-full object-cover"
        //         />
        //     </figure>

        //     <div className="card-body">
        //         <h2 className="card-title">{service.serviceName}</h2>
        //         <p className="text-sm">{service.serviceType}</p>
        //         <p className="font-semibold">৳ {service.serviceCost}</p>
        //         <button className="btn btn-outline btn-sm mt-2">
        //             View Details
        //         </button>
        //     </div>
        // </div>
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={service.thumbnail}
                        alt={service.serviceName}
                        className="h-52 w-full object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                      {service.serviceName}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{service.serviceCost}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ServiceCard;