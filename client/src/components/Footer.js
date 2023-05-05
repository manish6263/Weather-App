import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value);
    
    const onSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        toast.success('You subscribed successfully');
    }

    return (
        <footer>
            <div className="main-footer">
                <div className="footer-top pb-3 pt-2">
                    <div className="footer-section">
                        <div className="footer-section-top container">
                            <div className="subscribe">
                                <h2>Subscribe Now</h2>
                                <form className="inp" onSubmit={onSubmit}>
                                    <input type="email" name="Email" placeholder="Your Email" id="email" value={email} onChange={onChange} />
                                    <button type="submit">
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="footer-section-bottom container">

                            <ul className="footer-bottom-item footer-links">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/weather">Check Weather</Link>
                                </li>
                                <li>
                                    <Link to="/write-a-recommendation">Write Recommendation</Link>
                                </li>
                            </ul>
                            <ul className="footer-bottom-item footer-links">
                                <li>
                                    <Link to="/privacy-policy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/about">About Weather App</Link>
                                </li>
                                <li>
                                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                                </li>
                            </ul>

                            <ul className="footer-bottom-item">
                                <li>
                                    <h4 style={{ color: '#e35712' }}>
                                        Interested?
                                    </h4>
                                    <h4 style={{ color: 'white' }}>
                                        Connected Now!
                                    </h4>
                                </li>
                                <li className='social-icons'>
                                    <a href="/"><i className="fa-brands fa-instagram"></i></a>
                                    <a href="/"><i className="fa-brands fa-facebook"></i></a>
                                    <a href="/"><i className="fa-brands fa-twitter"></i></a>
                                    <a href="/"><i className="fa-brands fa-linkedin"></i></a>
                                    <a href="/"><i className="fa-brands fa-youtube"></i></a>
                                </li>
                            </ul>

                            <div className="footer-bottom-item">
                                <Link className="footer-logo" to="/"><i className="far fa-snowflake"></i> PatelWeather <i
                                    className="far fa-snowflake"></i>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className='container'>
                        © Quikey | Mudslide Creators Hub Pvt Ltd
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;