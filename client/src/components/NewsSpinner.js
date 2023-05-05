import loading from '../images/loading.gif';

const NewsSpinner = () =>{
        return (
            <div className='text-center'>
                <img className='my-3' src={loading} alt="" />
            </div>
        )
}

export default NewsSpinner;