import arrowRightIcon from '../images/arrowRightIcon.svg';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const GithubAuth = () => {
    const location = useLocation();
    const onGithubCLick = () => {
        toast.error('Curently you cannot login or register with github');
        return;
    }

    return (
        <div className="form-control login-google" onClick={onGithubCLick}>
            <i className="fa-brands fa-github" style={{ fontSize: '22px' }}></i>
            <p>{location.pathname === '/login' ? 'Login' : 'Register'} with Google</p>
            <img className='arrow-right' src={arrowRightIcon} alt="" />
        </div>
    )
}

export default GithubAuth;