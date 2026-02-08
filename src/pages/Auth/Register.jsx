import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';

const Register = () => {
      const location = useLocation()
    const navigate = useNavigate()
    const { registerUser } = useAuth();


    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleregister = (data) => {
        registerUser(data.email, data.password)
            .then((res) => {
             console.log(res.user)
            navigate(location.state || '/')

            })
            .catch(error => {
                console.log(error)
            })

    }


    return (
        <div className='bg-black p-10'>
            <form onSubmit={handleSubmit(handleregister)}>
                <fieldset className="fieldset">

                    <label className="label">Name</label>
                    <input type="name" {...register('name', { required: true })}
                        className="input" placeholder="Name" />
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

                    <button className="btn btn-neutral mt-4">Register</button>
                    <h1 className='text-center'>Already have an account? <Link to={'/login'} className='font-bold text-blue-500'>Login</Link> </h1>


                </fieldset>
            </form>
             <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;