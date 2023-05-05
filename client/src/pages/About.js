import { Link } from "react-router-dom";
import image from '../images/about.png';
const About = () => {
  return (
    <div className="main_header">

        <div className="row">
            <div className="col-md-10 col-12 mx-auto">
                <div className="row">
                    <div className="col-md-6 col-12 main_header_right">
                        <figure>
                            <img src={image} alt="thapa" title="thapatechnical" className="img-fluid" />
                        </figure>

                    </div>

                    <div className="col-md-6 col-12 main_header_left">
                        <p>Welcome to The World of Manish Patel</p>
                        <h1>I am a <span className="txt_clr">Mern Stack Developer</span>, and a freelancer</h1>
                        <Link to="/">
                                <button className="animated-button1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    About Me
                                </button>
                            </Link>
                    </div>
                </div>

            </div>
        </div>

    </div>

  )
}

export default About;