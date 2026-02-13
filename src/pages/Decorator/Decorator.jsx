import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Decorator = () => {

    const { register, handleSubmit, control } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();

    const regions = [...new Set(serviceCenters.map(c => c.region))];

    const selectedRegion = useWatch({ control, name: 'region' });

    const districtsByRegion = (region) => {
        if (!region) return [];
        return serviceCenters
            .filter(c => c.region === region)
            .map(d => d.district);
    };

    const handleDecoratorApply = async (data) => {

              //console.log(data)
              axiosSecure.post('/decorator',data)
              .then(res=>{
                console.log(res.data)
                if (res.data.insertedId) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "your application has been submitted.you will notify withtn 48h",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
              })

    };

    return (
        <div className=' p-10 mt-10 max-w-7xl mx-auto '>
            <h1 className='text-4xl text-primary font-bold mb-8'>
                Apply to Become a Decorator
            </h1>

            <form onSubmit={handleSubmit(handleDecoratorApply)}>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

                    {/* Left Side */}
                    <div className='space-y-2'>

                          <label className="label">Name</label>
                        <input
                            type="text"
                            {...register('decoratorName', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Full name"
                        />

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('decoratorEmail', { required: true })}
                            className="input input-bordered w-full"
                            defaultValue={user?.email}
                        />

                        <label className="label">Phone Number</label>
                        <input
                            type="text"
                            {...register('phone', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="01XXXXXXXXX"
                        />

                        <label className="label">Years of Experience</label>
                        <input
                            type="number"
                            {...register('experience', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="e.g. 3"
                        />

                        <label className="label">Specialty</label>
                        <select
                            {...register('specialty', { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Specialty</option>
                            <option value="Wedding">Wedding Decoration</option>
                            <option value="Home">Home Interior</option>
                            <option value="Corporate">Corporate Event</option>
                            <option value="Birthday">Birthday Decoration</option>
                            <option value="Seminar">Seminar Setup</option>
                        </select>

                    </div>

                    {/* Right Side */}
                    <div  className='space-y-2'>

                        <label className="label">Region</label>
                        <select
                            {...register('region', { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Region</option>
                            {
                                regions.map((r, index) =>
                                    <option key={index} value={r}>{r}</option>
                                )
                            }
                        </select>

                        <label className="label">District</label>
                        <select
                            {...register('district', { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select District</option>
                            {
                                districtsByRegion(selectedRegion).map((d, index) =>
                                    <option key={index} value={d}>{d}</option>
                                )
                            }
                        </select>

                        <label className="label">Full Address</label>
                        <input
                            type="text"
                            {...register('address', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your full address"
                        />

                       

                        <label className="label">Professional Bio</label>
                        <textarea
                            {...register('bio', { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Describe your experience..."
                        ></textarea>

                    </div>
                </div>

                <button className="btn btn-secondary mt-10 w-full">
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default Decorator;
