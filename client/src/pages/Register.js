import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { register, reset } from '../features/auth/authSlice';
import rocket from '../images/email-rocket.jpg';
import visibilityIcon from '../images/visibilityIcon.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in...
    if (isSuccess || user) {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password do not match');
      return;
    }
    try {
      const userData = { name, email, password };
      dispatch(register(userData));
    } catch (error) {
      toast.error('Could not register');
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
          Create an account
        </h1>
        <div className="container">
          <div>
            <form className='login-form' onSubmit={onSubmit}>
              <div className='login-item email-div'>
                <input
                  placeholder='Name'
                  id='name'
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className='login-item email-div'>
                <input
                  placeholder='Email Address'
                  id='email'
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className='login-item password-div'>
                <input
                  placeholder='password'
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  name="password"
                  onChange={onChange}
                />
                <img src={visibilityIcon} alt="password" onClick={() => { setShowPassword((prevState) => !prevState) }} style={{ cursor: 'pointer' }} />
              </div>
              <div className='login-item password-div'>
                <input
                  placeholder='confirm password'
                  id='password2'
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password2}
                  name="password2"
                  onChange={onChange}
                />
              </div>
              <div className="login-item form-links">
                <p>Already a User?</p>
                <Link to='/login'>Login</Link>
              </div>
              <button
                type="submit"
                className="float-end mt-2 login-btn login-item form-control"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;