import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        counrty: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        // console.log("I am onstructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            // totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} | News-Hunt`;
    }

    async updateNews() {
        this.props.setProgress(0);

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb60f0aa4a1d444daf77f24c747fdada&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }


    async componentDidMount() {
        // console.log("cdm");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb60f0aa4a1d444daf77f24c747fdada&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading : true
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles,
        //      totalResults: parsedData.totalResults,
        //     loading: false
        //  })
        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log("previous");
        // console.log("next");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb60f0aa4a1d444daf77f24c747fdada&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading : true
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ 
        //     loading : false,
        //     articles: parsedData.articles ,
        //     page: this.state.page - 1
        // })

        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }


    handleNextClick = async () => {
        // console.log("next");


        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb60f0aa4a1d444daf77f24c747fdada&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({
        //         loading : true
        //     })
        //     let data = await fetch(url);
        //     let parsedData = await data.json()

        //     this.setState({
        //         loading: false,
        //          articles: parsedData.articles ,
        //          page: this.state.page + 1
        //     })  
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    // this.capitalizeFirstLetter(this.props.category)
    render() {
        // console.log("render");
        return (
            <>
                <div className='container my-3'>
                    <h1 className='text-center' style={{ margin: '30px' , marginTop: '90px'}}>News-Hunt - Top Headlines</h1>
                    <h2 className='text-center' >{this.capitalizeFirstLetter(this.props.category)} news</h2>

                    {/* spiiner */}
                    {this.state.loading && <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 30) : ""}
                                    description={element.description} imageUrl={element.urlToImage}
                                    newsUrl={element.url} author={element.author} date={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                    {/* prev next button  */}
                    <div className="container d-flex justify-content-between ">
                        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button type="button" className="btn btn-dark mx-2" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
