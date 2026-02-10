import React from 'react';
import { useForm } from 'react-hook-form';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddService = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure()



    const handleAddService = async (data) => {
        try {
            // 1. take image file
            const imageFile = data.photo[0];

            const formData = new FormData();
            formData.append('image', imageFile);

            // 2. upload to imgBB
            const imgAPIurl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

            const imgRes = await axios.post(imgAPIurl, formData);

            const thumbnailUrl = imgRes.data.data.display_url;

            // 3. service object
            const serviceData = {
                serviceCategory: data.serviceCategory,
                serviceName: data.serviceName,
                serviceCost: data.serviceCost,
                serviceUnit: data.serviceUnit,
                serviceDescription: data.serviceDescription,
                thumbnail: thumbnailUrl,          
            };

            // 4. save to DB
            const res = await axiosSecure.post('/service', serviceData);
            console.log('Service saved', res.data);
            toast.success('Service saved');

        } catch (err) {
            console.error(err);
        }
    };



    return (
        <div>
          
            <div className='max-w-7xl mx-auto '>

                

                    <div className='bg-white rounded-2xl p-10'>
                        <h1 className='text-5xl font-semibold'>Create a New Decoration Service</h1>
                        <p>Define service details, pricing, and category to make it available for customer bookings.</p>

                        <form onSubmit={handleSubmit(handleAddService)}>

                            <fieldset className="fieldset space-y-1">
                                {/* radio */}
                                <div className='mt-10'>
                                    <h1>Category</h1>
                                    <label className="label mr-4 mt-4">
                                        <input type="radio" {...register('serviceCategory')} value="Home" className="radio" defaultChecked />
                                        Home
                                    </label>
                                    <label className="label mr-4">
                                        <input type="radio" {...register('serviceCategory')} value="Office" className="radio" defaultChecked />
                                        Office
                                    </label>
                                    <label className="label mr-4">
                                        <input type="radio" {...register('serviceCategory')} value="Wedding" className="radio" />
                                        Wedding
                                    </label>
                                    <label className="label mr-4">
                                        <input type="radio" {...register('serviceCategory')} value="Seminar" className="radio" />
                                        Seminar
                                    </label>
                                    <label className="label mr-4">
                                        <input type="radio" {...register('serviceCategory')} value="Birthday" className="radio" />
                                        Birthday
                                    </label>

                                </div>

                                {/* name */}
                                <label className="label">Service Name:</label>
                                <input type="text" {...register('serviceName', { required: true })}
                                    className="input w-full" placeholder="Service Name" />
                                {
                                    errors.serviceName?.type === 'required' && <p>Service name is required</p>
                                }
                                {/* photo */}

                                <label className="label">Photo</label>
                                <input type="file" {...register('photo', { required: true })}
                                    className="file-input w-full" placeholder="Upload Photo" />
                                {
                                    errors.name?.type === 'required' && <p>Photo is required</p>
                                }

                               


                                {/* cost */}
                                <label className="label">Service Cost:</label>
                                <input type="number" {...register('serviceCost', { required: true })}
                                    className="input w-full" placeholder="Cost" />
                                {
                                    errors.serviceCost?.type === 'required' && <p>Service cost is required</p>
                                }


                                {/* unit */}
                                <label className='label'>Unit</label>

                                <select {...register('serviceUnit')}
                                    defaultValue="Pick an unit" className="select w-full appearance-none">

                                    <option>per meter</option>
                                    <option>per sq Ft</option>

                                </select>
                                {
                                    errors.serviceUnit?.type === 'required' && <p>Service cost is required</p>
                                }




                                {/* des */}
                                <label className='label'>Description</label>
                                <textarea
                                    rows="3"
                                    {...register('serviceDescription', { required: true })}
                                    className="textarea w-full focus:border-0 focus:outline-gray-200 h-[100px]"
                                >
                                    {
                                        errors.serviceDescription?.type === 'required' && <p>Service description is required</p>
                                    }

                                </textarea>

                            </fieldset>
                            <button className='btn w-full mt-5 btn-secondary'>Submit</button>
                        </form>
                    </div>
                   
                

            </div>

        </div>
    );
};

export default AddService;