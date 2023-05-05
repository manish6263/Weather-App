import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useAuthStatus } from "../hooks/useAuthStatus";

const Header = () => {
    const { loggedIn } = useAuthStatus();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    const profileFunction = () => {
        setShowProfile(!showProfile);
        setTimeout(() => {
            setShowProfile(false);
        }, 4000);
    }

    const onClick = () => {
        const hamerburg = document.getElementById('hamerburg');
        const xmark = document.getElementById('xmark');
        if (hamerburg.classList.contains('d-none')) {
            hamerburg.classList.remove('d-none');
            xmark.classList.add('d-none');
        }
        else {
            xmark.classList.remove('d-none');
            hamerburg.classList.add('d-none');
        }
    }
    return (
        <div className="container-fluid main_menu">
            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                    <nav className="navbar navbar-expand-lg">
                        <Link className="navbar-brand" to="/"><i className="far fa-snowflake"></i> PatelWeather <i
                            className="far fa-snowflake"></i>
                        </Link>
                        <button onClick={onClick} className="navbar-toggler mr-5" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="fa-solid fa-bars" id='hamerburg'></i>
                            <i className="fa-solid fa-xmark d-none" id='xmark'></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/weather' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/weather">Weather</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/news">News</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                {
                                    !user &&
                                    (
                                        <>
                                            <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                                                <Link className="nav-link" to="/login">Login</Link>
                                            </li>

                                        </>
                                    )
                                }
                                <li className="nav-item nav-item-setting">
                                    <i className={`fa-solid p-2 ${loggedIn ? 'fa-user-check' : 'fa-user'}`} onClick={profileFunction}></i>
                                </li>
                            </ul>
                        </div>
                        <div className="profile-dots">
                            <i className={`fa-solid p-2 ${loggedIn ? 'fa-user-check' : 'fa-user'}`} onClick={profileFunction}></i>
                        </div>
                    </nav>
                    <div className={`profile ${!showProfile ? 'd-none' : ''}`}>
                        <ul>
                            {!user
                                ? <>
                                    <li>
                                        <Link className="nav-link profile-item" to="/register">
                                            <i className="fa-solid fa-user-plus text-info"></i>
                                            <p>
                                                Register
                                            </p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link profile-item" to="/login">
                                            <i className="fa-regular fa-user text-info"></i>
                                            <p>
                                                Login
                                            </p>
                                        </Link>
                                    </li>
                                </>
                                : <>
                                    <li className="profile-item">
                                        <i className="fa-solid fa-user-tie text-info"></i>
                                        <p className="name">{user.name}</p>
                                    </li>
                                    <li className="profile-item">
                                        <i className="fa-regular fa-envelope text-info"></i>
                                        <p className="email">{user.email}</p>
                                    </li>
                                    <li onClick={onLogout} className="logout profile-item">
                                        <i className="fa-solid fa-right-from-bracket text-info"></i>
                                        <p>Logout</p>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;