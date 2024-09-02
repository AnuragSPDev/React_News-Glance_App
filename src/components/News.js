import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
        mode: PropTypes.string
    };

    static defaultProps = {
        pageSize: 10,
        country: 'in',
        category: 'general',
        mode: 'light'
    }

    constructor(props) {
        super(props);
        // console.log('Constructor here');
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        let title = this.capitalizeFirstLetter(this.props.category);
        document.title = `News@Glance - ${title}`;
    }

    capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
        // &apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let response = await fetch(url);
        // let data = await response.json();
        // console.log(data);
        // this.setState({
        //     articles: data.articles,
        //     totalResults: data.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log('Prev Click');
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
        // &apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let response = await fetch(url);
        // let data = await response.json();
        // console.log(data);
        // this.setState({
        //     articles: data.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // })
        // this.setState({
        //     page: this.state.page - 1,
        // })
        console.log(`Prev Click Before: ${this.state.page}`);
        await this.syncState({ page: this.state.page - 1 });

        console.log(`Prev Click After: ${this.state.page}`);
        this.updateNews();
    }

    handleNextClick = async () => {
        // console.log('Next Click');
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
            // &apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // this.setState({ loading: true });
            // let response = await fetch(url);
            // let data = await response.json();
            // console.log(data);
            // this.setState({
            //     articles: data.articles,
            //     page: this.state.page + 1,
            //     loading: false
            // })
            console.log(`Before: ${this.state.page}`);
            // this.setState({
            //     page: this.state.page + 1,
            // })
            await this.syncState({ page: this.state.page + 1 });

            console.log(`After: ${this.state.page}`);
            this.updateNews();
        }
    }

    syncState = (state) => {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    render() {
        // console.log('render');
        return (
            <div className='container'>
                <h2 className="text-center my-3" style={{color: this.props.mode === 'light'? 'black': 'white'}}>
                    {`Top News - ${this.capitalizeFirstLetter(this.props.category)}`}</h2>
                {this.state.loading && <Spinner />}
                <div className="row mx-2 my-4">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-2" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ''}
                                description={element.description ? element.description.slice(0, 50) : ''}
                                imageUrl={element.urlToImage ? element.urlToImage : '/logo192.png'} newsUrl={element.url}
                                author={element.author} source={element.source.name} date={element.publishedAt}
                                mode={this.props.mode} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-around">
                    <button style={{color: this.props.mode === 'light'? 'black': 'white'}} disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                    <button style={{color: this.props.mode === 'light'? 'black': 'white'}} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
