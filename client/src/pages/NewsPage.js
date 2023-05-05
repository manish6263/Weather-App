import React, { useEffect, useState } from 'react';
import Spinner from '../components/NewsSpinner';
import NewsItem from '../components/NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

const NewsPage = () => {
    const [category, setCategory] = useState('general');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const NEWS_API = '796516bf9f074075b781dadb0c722475';
    const pageSize = 10;

    useEffect(() => {
        document.title = `${capitalize(category)} - NewsMonkey`;
        updateNews();
    }, []);

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const updateNews = async () => {
        setPage(0);
        setArticles([]);
        setTotalResults(0);
        // console.log('articles', articles);
        // console.log('totalResults', totalResults);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${NEWS_API}&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        if (parsedData.status === 'error') {
            toast.error('Could not show news now');
            setLoading(false);
            return;
        }
        if (parsedData.articles.length === 0) {
            toast.error('Could not show news');
            setLoading(false);
            return;
        }
        console.log('parsedData', parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }

    const fetchMoreNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${NEWS_API}&page=${page + 1}&pageSize=${pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }

    const onChange = async (e) => {
        e.preventDefault();
        setCategory(e.target.value);
        setArticles([]);
        setTotalResults(0);
        updateNews();
    }
    return (
        <>
            <div className="select-news-category">
                <h1 className="text-center" style={{ margin: "60px" }}>NewsMonkey - Top Headlines</h1>
                <div className="d-flex container align-items-center justify-content-between">
                    <div className="select-category">
                        <h3>Select Category</h3>
                        <select className="form-select" aria-label="Default select example" id='category inputGroupSelect04' value={category} onChange={onChange} name='category'>
                            <option value='general'>General</option>
                            <option value='business'>Business</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="health">Health</option>
                            <option value="science">Science</option>
                            <option value="sports">Sports</option>
                            <option value="technology">Technology</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={() => { fetchMoreNews(category) }}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

export default NewsPage;