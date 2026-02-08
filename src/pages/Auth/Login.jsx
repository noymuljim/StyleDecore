import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import Logo from '../../components/logo';


const Login = () => {
    const location = useLocation()
    const navigate =useNavigate()
    const { signinUser } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = (data) => {

        signinUser(data.email, data.password)
            .then(res => {
                console.log(res.user)
                 navigate(location?.state || '/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className=" p-10 bg-base-100 w-full max-w-sm mx-auto  shadow-2xl">
            <h1 className='text-3xl justify-center flex items-end mb-6'>login to <span><Logo></Logo></span></h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">

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

                    <div>
                        <a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-neutral my-4">Login</button>


                </fieldset>
                <h1 className='text-center mb-3'>New here? <Link state={location.state} to='/register' className='font-semibold text-green-500'>Register</Link></h1>

            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;