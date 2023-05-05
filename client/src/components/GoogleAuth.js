import googleIcon from '../images/googleIcon.svg';
import arrowRightIcon from '../images/arrowRightIcon.svg';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuth = () => {
    const location = useLocation();
    const onGoogleClick = () => {
        toast.error('Curently you cannot login or register with google');
    }

    return (
        <div className="form-control login-google" onClick={onGoogleClick}>
            <img src={googleIcon} alt="Google Icon" className='google-icon' />
            <p>{location.pathname === '/login' ? 'Login' : 'Register'} with Google</p>
            <img className='arrow-right' src={arrowRightIcon} alt="" />
        </div>
    )
}

export default GoogleAuth;