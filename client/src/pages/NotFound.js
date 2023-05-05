import { Link } from 'react-router-dom';
import image from '../images/404.png';

const NotFound = () => {
    return (
        <div className="main_header">

            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                    <div className=" main_header_left align-items-center">
                        <figure className="errimg">
                            <img src={image} alt="Not Found" title="not-found" className="img-fluid" />
                        </figure>
                        <p>Welcome to the World of Manish Patel</p>
                        <h1>Oops! page not found click here to go back</h1>
                        <Link to="/">
                                <button className="animated-button1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Go Back
                                </button>
                            </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NotFound;