import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Weather from './pages/Weather';
import { WeatherProvider } from './context/WeatherContext';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <>
        <WeatherProvider>
          <Router>
            <Header />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/weather' element={<PrivateRoute />}>
                <Route exact path='/weather' element={<Weather />} />
              </Route>
              <Route exact path='/news' element={<PrivateRoute />}>
                <Route exact path='/news' element={<NewsPage />} />
              </Route>
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/about' element={<About />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </WeatherProvider>
      <ToastContainer />
    </>
  );
}

export default App;