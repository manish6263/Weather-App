import { useContext } from "react";
import { useState } from "react";
import SubmitContext from "../context/WeatherContext";

const Weather = () => {

  //day, date and month
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const day = weekdays[new Date().getDay()];
  const date = new Date().getDate();
  const month = months[new Date().getMonth()];
  const { submitForm, message, tempreture, tempStatus, hideOrNot } = useContext(SubmitContext);
  const [cityName, setCityName] = useState('');

  const onChange = (e) => {
    setCityName(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(cityName);
    setCityName('');
  }

  return (
    <div className="main_header">

      <div className="row">
        <div className="col-md-10 col-12 mx-auto">

          <div className="container-fluid  main_content">

            <form className="temp_form" onSubmit={handleSubmit}>
              <input onChange={onChange} type="text" id="cityName" value={cityName} placeholder="Enter you city name.." autoComplete="on" />
              <br />
              <input type="submit" value="search" id="submitBtn" />
              <p id="temp_err"></p>
            </form>

            <div className="tempInformation">
              <div className="top_layer">
                <p id="day">{day}</p>
                <p id="today_date">{date} {month}</p>
              </div>
              <div className="main_layer">
                <p id="city_name">{message}</p>
                <div className={`middle_layer ${hideOrNot ? 'data_hide' : ''}`}>
                  <p id="temp"><span id="temp_real_val">{tempreture}</span><sup>o</sup>C</p>
                  <p id="temp_status"><span>{tempStatus}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;