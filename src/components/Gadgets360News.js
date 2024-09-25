import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';


export default function Gadgets360News(props) {

    const { category, apiKey, pageSize, setProgress, mode } = props;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = useCallback(async () => {
        let url = `https://newsapi.org/v2/everything?domains=gadgets360.com&apiKey=${apiKey}&page=${1}&pageSize=${pageSize}`;
        setLoading(true);
        setProgress(20);
        try {
            let response = await fetch(url);
            setProgress(50);
            let data = await response.json();
            setProgress(70);
            setArticles(data.articles);
            setTotalResults(data.totalResults);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setProgress(100);
        }
    }, [apiKey, pageSize, setProgress]);

    useEffect(() => {
        let title = capitalizeFirstLetter(category);
        document.title = `News@Glance - ${title}`;
        updateNews();
    }, [updateNews, category]);

    const fetchMoreData = async () => {
        if (loading) return;
        const nextPage = page + 1;
        let url = `https://newsapi.org/v2/everything?domains=gadgets360.com&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
        setLoading(true);
        try {
            let response = await fetch(url);
            let data = await response.json();
            setArticles((articles) => articles.concat(data.articles));
            setTotalResults(data.totalResults);
            setPage(nextPage);
        } catch (error) {
            console.error("Error fetching more data:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2 className="text-center my-3" style={{ color: mode === 'light' ? 'black' : 'white' }}>{`Top News - ${capitalizeFirstLetter(category)}`}</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                hasMore={articles.length !== totalResults}
                dataLength={articles.length}
                next={fetchMoreData}
                style={{ overflow: 'visible', height: 'auto' }}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row mx-2 my-4">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 40) : ''}
                                    description={element.description ? element.description.slice(0, 50) : ''}
                                    imageUrl={element.urlToImage ? element.urlToImage : '/logo192.png'}
                                    newsUrl={element.url}
                                    author={element.author}
                                    source={element.source.name}
                                    date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

Gadgets360News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
};
Gadgets360News.defaultProps = {
    pageSize: 10,
    country: 'in',
    category: 'gadgets360',
}
