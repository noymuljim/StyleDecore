import React from 'react';
import { Link } from 'react-router';

const ServiceCard = ({ service }) => {
    return (
       
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
                   <Link  className='btn btn-secondary' to={`/service-details/${service._id}` }>Details</Link>
                </div>
            </div>
        </div>
    );
};


export default ServiceCard;