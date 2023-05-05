import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import rocket from '../images/email-rocket.jpg';
import visibilityIcon from '../images/visibilityIcon.svg';
import Spinner from '../components/Spinner';
import GoogleAuth from '../components/GoogleAuth';
import GithubAuth from '../components/GithubAuth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // Redirect when logged in...
        if (isSuccess || user) {
            toast.success('Login Successfully');
            navigate('/');
        }
        dispatch(reset);
    }, [isError, isSuccess, message, user, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                toast.error('Please include all the fields');
                return
            }
            const userData = { email, password };
            dispatch(login(userData));
        } catch (error) {
            toast.error('Could not login');
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="sign-in-page">
            <div className="pb-5 sign-in-window">
                <img src={rocket} alt="Rocket IMG" className='email-rocket' />
                <h1 className="login-heading">
                    Welcome Back!
                </h1>
                <div className="container">
                    <div>
                        <form className='login-form' onSubmit={onSubmit}>
                            <div className='login-item form-control email-div'>
                                <input
                                    placeholder='Email Address'
                                    id='email'
                                    type="email"
                                    name="email"
                                    // className="form-control"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='login-item password-div form-control'>
                                <input
                                    placeholder='password'
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    // className="form-control"
                                    value={password}
                                    name="password"
                                    onChange={onChange}
                                />
                                <img src={visibilityIcon} alt="password" onClick={() => { setShowPassword((prevState) => !prevState) }} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className='form-links login-item'>
                                <Link to='/register'>
                                    Create Account
                                </Link>
                                <Link to='/forgot-password'>
                                    Forgot Password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="float-end mt-2 login-btn login-item form-control"
                            >
                                Login
                            </button>
                            <div className='login-item'>
                                <GoogleAuth />
                            </div>
                            <div className="login-item">
                                <GithubAuth />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;