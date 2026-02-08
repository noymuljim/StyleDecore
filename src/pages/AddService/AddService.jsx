import React from 'react';
import Navbar from '../../shared/Navbar';
import { useForm } from 'react-hook-form';
import form1 from "../../assets/form1.png"
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';

const AddService = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth()
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
                serviceProviderName: user?.email,
                thumbnail: thumbnailUrl,   
                createdAt: new Date()
            };

            // 4. save to DB
            const res = await axiosSecure.post('/service', serviceData);
            console.log('Service saved', res.data);

        } catch (err) {
            console.error(err);
        }
    };



    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto '>

                <div className='flex justify-between items-center gap-8 my-10'>

                    <div className='flex-2'>
                        <h1 className='text-5xl font-semibold'>Add Your Decoration Service</h1>
                        <p>Showcase your decoration expertise and let clients discover your services.</p>

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

                                {/* providerName */}
                                <label className="label">Service Provider:</label>
                                <input type="text" {...register('serviceProviderName', { required: true })}
                                    className="input w-full" defaultValue={user?.email} readOnly />


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
                                        errors.serviceDescription?.type === 'required' && <p>Service cost is required</p>
                                    }

                                </textarea>

                            </fieldset>
                            <button className='btn btn-secondary'>Submit</button>
                        </form>
                    </div>
                    <div className='hidden flex-1 md:block'>
                        <img className='rounded-2xl ' src={form1} alt="" />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AddService;