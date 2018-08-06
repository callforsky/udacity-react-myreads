import React, { Component } from 'react'

class Bookshelf extends Component {
  render () {
    const bookshelves = [
      {
        id: 'currentlyReading',
        name: 'Currently Reading',
        books: this.props.currentlyReading
      },
      {
        id: 'wantToRead',
        name: 'Want to Read',
        books: this.props.wantToRead
      },
      {
        id: 'read',
        name: 'Read',
        books: this.props.read
      },
    ]
    return (
      <div className="bookshelf">
        {bookshelves.map(bookshelf => {
          return(
            <div>
              <ol className="shelves-grid">
                <li key={bookshelf.id}>
                  <h2 className="bookshelf-title">{bookshelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {bookshelf.books.map(book =>
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                {/*
                                  add attributes in <select> to make the bookshelf switch working
                                  the key is to set the default value
                                */}
                                <select value={book.shelf} onChange={(event) => this.props.changeShelf(book, event.target.value)}>
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
                </li>
              </ol>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Bookshelf
