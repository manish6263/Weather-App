const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card shadow h-100" style={{ borderRadius: '20px' }}>
                <span className="position-absolute d-flex justify-content-end badge rounded-pill bg-dark" style={{ right: '3px', top: '4px', zIndex: 2 }}>{source}</span>
                <img src={imageUrl} className="card-img-top p-1" alt="News Image" style={{ borderRadius: '20px' }} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : 'Manish Patel'} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;