import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';


export default function Gadgets360News(props) {

    // static propTypes = {
    //     pageSize: PropTypes.number,
    //     country: PropTypes.string,
    //     category: PropTypes.string,
    // };

    // static defaultProps = {
    //     pageSize: 10,
    //     country: 'in',
    //     category: 'gadgets360',
    // }

    const { category, apiKey, pageSize, setProgress, mode } = props;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);



    // constructor(props) {
    //     super(props);
    //     // console.log('Constructor here');
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1
    //     }
    // }

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = useCallback(async () => {
        let url = `https://newsapi.org/v2/everything?domains=gadgets360.com&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        setProgress(20);
        let response = await fetch(url);
        setProgress(50);
        let data = await response.json();
        setProgress(70);
        // console.log(data);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);
        // this.setState({
        //     articles: data.articles,
        //     totalResults: data.totalResults,
        //     loading: false
        // })
        setProgress(100);
    }, [apiKey, page, pageSize, setProgress]);

    useEffect(() => {
        let title = capitalizeFirstLetter(category);
        document.title = `News@Glance - ${title}`;
        updateNews();
    }, [updateNews]);

    // async componentDidMount() {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
    //     // &apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let response = await fetch(url);
    //     // let data = await response.json();
    //     // console.log(data);
    //     // this.setState({
    //     //     articles: data.articles,
    //     //     totalResults: data.totalResults,
    //     //     loading: false
    //     // })
    //     this.updateNews();
    // }

    // handlePrevClick = async () => {
    //     // console.log('Prev Click');
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
    //     // &apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let response = await fetch(url);
    //     // let data = await response.json();
    //     // console.log(data);
    //     // this.setState({
    //     //     articles: data.articles,
    //     //     page: this.state.page - 1,
    //     //     loading: false
    //     // })
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     // })
    //     console.log(`Prev Click Before: ${this.state.page}`);
    //     await this.syncState({ page: this.state.page - 1 });

    //     console.log(`Prev Click After: ${this.state.page}`);
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     // console.log('Next Click');
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //         // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
    //         // &apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         // this.setState({ loading: true });
    //         // let response = await fetch(url);
    //         // let data = await response.json();
    //         // console.log(data);
    //         // this.setState({
    //         //     articles: data.articles,
    //         //     page: this.state.page + 1,
    //         //     loading: false
    //         // })
    //         console.log(`Before: ${this.state.page}`);
    //         // this.setState({
    //         //     page: this.state.page + 1,
    //         // })
    //         await this.syncState({ page: this.state.page + 1 });

    //         console.log(`After: ${this.state.page}`);
    //         this.updateNews();
    //     }
    // }

    // syncState = (state) => {
    //     return new Promise((resolve) => {
    //         this.setState(state, resolve);
    //     });
    // }

    // console.log('render');
    const fetchMoreData = async () => {
        // await syncState({ page: page + 1 })
        // await syncState(page + 1)
        const nextPage = page + 1;
        let url = `https://newsapi.org/v2/everything?domains=gadgets360.com&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        setArticles((articles) => articles.concat(data.articles));
        setTotalResults(data.totalResults);
        setPage(nextPage);
        setLoading(false);
        // this.setState({
        //     articles: this.state.articles.concat(data.articles),
        //     totalResults: data.totalResults,
        //     loading: false
        // })
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
                        {/* {!loading && articles.map((element) => { */}
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
            {/* <div className="container d-flex justify-content-around">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
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
