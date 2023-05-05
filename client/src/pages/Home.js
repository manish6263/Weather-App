import { Link } from 'react-router-dom';
import bg1 from '../images/bg1.png';
import bg2 from '../images/bg2.png';
import bg3 from '../images/bg3.png';

const Home = () => {
    return (
        <div className="main_header">

            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                    <div className="row">
                        <div className="col-md-6 col-12 main_header_left">
                            <p>Welcome to weather app</p>
                            <h1>Get the latest <span className="txt_clr">weather</span> info of your city</h1>
                            <Link to="/weather">
                                <button className="animated-button1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Check Now
                                </button>
                            </Link>
                        </div>

                        <div className="col-md-6 col-12 main_header_right home_header_right">
                            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img className="w-100" src={bg1} alt="First slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="w-100" src={bg2} alt="Second slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="w-100" src={bg3} alt="Third slide" />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleDark" role="button"
                                    data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleDark" role="button"
                                    data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home;