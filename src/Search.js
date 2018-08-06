import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    booksFound: []
  }

  searchBook = (query) => {
    if (query === '') {
      this.setState({query: '', booksFound: []})
    } else {
      this.setState({query: query.trim()})
      BooksAPI.search(query).then((booksFound) => {
        if (booksFound) {
          booksFound.map(book => (this.props.existingBooks.filter((existingBook) => existingBook.id === book.id).map(existingBook => book.shelf = existingBook.shelf)))
          // booksFound.map(bookFound => {
          //   this.props.existingBooks.find(existingBook => existingBook.id === bookFound.id) ? booksFound.shelf=this.props.existingBook.shelf : booksFound.shelf="none"
          }
          this.setState({booksFound})
        // I prefer to break down the long inline into piece for easier debugging
        // const existingTitles = this.props.existingBooks.map(book => book.title)
        // console.log(booksFound)
        // console.log(existingTitles)
        // const existingShelf = this.props.existingBooks.map(book => book.shelf)
        // console.log(existingShelf)
        // const booksNotOnShelf = booksFound.filter(item => existingTitles.indexOf(item.title) === -1)
        // console.log(booksNotOnShelf)
        // booksNotOnShelf.map(book => book.shelf="none")
        // console.log(booksNotOnShelf)
        // const booksOnShelf = booksFound.filter(item => existingTitles.indexOf(item.title) !== -1)
        // booksOnShelf.map(book => book.shelf=)
        // const booksFound2 = booksFound.filter(book => existingBooks.)
        // console.log(booksFound2)
        // const booksFound2 = booksFound.map(bookFound => existingTitles.indexOf(bookFound.title) === -1 ? bookFound.shelf="none" : bookFound.shelf="read")
        // const booksOnShelf = booksFound.map(book => this.props.existingBooks.filter(existingBook => existingBook.title === book.title)).filter(book => Object.keys(book).length !== 0)
        // console.log(booksOnShelf)
        // const booksFound2 = booksOnShelf.concat(booksNotOnShelf)
        // console.log(booksFound)
        // booksFound.map(bookFound => (
        //   this.props.existingBooks.filter((existingBook) => existingBook.title === bookFound.title).map(bookFound.shelf = existingBook.shelf)))
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksFound.map(book =>
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                      {/*
                        add attributes in <select> to make the bookshelf switch working
                        the key is to set the default value
                      */}
                      <select value={book.shelf} onChange={(event) => {
                        this.props.changeShelf(book, event.target.value)}
                      }>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
