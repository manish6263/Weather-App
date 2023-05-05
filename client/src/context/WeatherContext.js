import { useState } from "react";
import { createContext } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [message, setMessage] = useState('Get output here');
    const [tempreture, setTempreture] = useState(0);
    const [tempStatus, setTempStatus] = useState(<i className='fas  fa-cloud' style={{ color: '#f1f2f6' }}></i>);
    const [hideOrNot, setHideOrNot] = useState(true);

    const submitForm = async (cityName) => {
        console.log('Form is submitted', cityName);
        if (cityName === '') {
            setMessage('Please enter name before search');
            setHideOrNot(true);
        }
        else {
            try {
                const WEATHER_API_KEY = 'b086c04778f7e3888c2eba99567d58cf';
                // console.log(WEATHER_API_KEY);
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                const arrData = [data];
                setMessage(`${arrData[0].name}, ${arrData[0].sys.country}`);
                setTempreture(arrData[0].main.temp);
                console.log('temp: ', arrData[0].main.temp);
                const tempMood = arrData[0].weather[0].main;

                //condition to check sunny or cloudy
                if (tempMood === "Clear") {
                    setTempStatus(<i className='fas  fa-sun' style={{ color: '#eccc68' }}></i>);
                } else if (tempMood === "Clouds") {
                    setTempStatus(<i className='fas  fa-cloud' style={{ color: '#f1f2f6' }}></i>);
                } else if (tempMood === "Rain") {
                    setTempStatus(<i className='fas  fa-cloud-rain' style={{ color: '#a4b0be' }}></i>);
                } else {
                    setTempStatus(<i className='fas  fa-cloud' style={{ color: '#f1f2f6' }}></i>);
                }
                setHideOrNot(false);
            } catch (error) {
                setMessage('Please enter the proper city name');
                setHideOrNot(true);
            }
        }
    }

    return <WeatherContext.Provider value={{ submitForm, message, tempreture, tempStatus, hideOrNot }}>
        {children}
    </WeatherContext.Provider>
}

export default WeatherContext;