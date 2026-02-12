import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import Logo from '../../components/logo';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Register = () => {
    const axiosSecure = useAxiosSecure()

    const location = useLocation()
    const navigate = useNavigate()
    const { registerUser, updateUserProfile } = useAuth();


    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleregister = (data) => {
        const profileImage = data.photo[0];

        registerUser(data.email, data.password)
            .then((res) => {
                console.log(res.user)

                const formData = new FormData();
                formData.append('image', profileImage);

                const imgAPIurl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(imgAPIurl, formData)
                    .then(res => {
                           console.log('after img upld',res.data);
                        const photoURL = res.data.data.url

                        const userInfo = {
                            email: data.email,
                            displayName: data.displayname,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users',userInfo)
                        .then(res=>{
                            if(res.data.insertedId){
                                    console.log('user created in db')
                                }
                        })



                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url



                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated')
                                navigate(location.state || '/')
                                toast.success('registered successfully')
                            })
                            .catch(err => {
                                console.log(err)
                            })

                    })


            })
            .catch(error => {
                console.log(error)
            })

    }


    return (
        <div className='bg-white p-10'>
            <h1 className='text-3xl justify-center flex items-end mb-6'>Register to <span><Logo></Logo></span></h1>

            <form onSubmit={handleSubmit(handleregister)}>
                <fieldset className="fieldset">

                    <label className="label">Name</label>
                    <input type="name" {...register('name', { required: true })}
                        className="input" placeholder="Name" />
                    {
                        errors.name?.type === 'required' && <p>name is required</p>
                    }


                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })}
                        className="file-input" placeholder="Upload Photo" />
                    {
                        errors.name?.type === 'required' && <p>name is required</p>
                    }


                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })}
                        className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p>email required</p>
                    }

                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ })} className="input" placeholder="Password" />

                    {
                        errors.password?.type === 'minLength' && <p>need 6 char</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p>aA1@</p>
                    }

                    <button className="btn btn-secondary mt-4">Register</button>
                    <h1 className='text-center'>Already have an account? <Link state={location.state} to={'/login'} className='font-bold text-blue-500'>Login</Link> </h1>


                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;