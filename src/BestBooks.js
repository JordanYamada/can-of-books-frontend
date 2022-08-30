import axios from 'axios';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      // Get book data from backend      
      let results = await axios.get(`${SERVER}/books`);
      console.log(results.data)
      // Set book results array to state
      this.setState({
        books: results.data,
      });
    } catch (e) {
      console.log('Mayday, Mayday ', e.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }



  render() {



    /* TODO: render all the books in a Carousel */
    let books = this.state.books.map(book => {
      console.log('books in state in render:', this.state.books);
      // return <p key={book._id}>{book.title}</p>

      return <Carousel.Item key={book._id}>
        <img
          className="d-block w-100 img-fluid"
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="book"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}.</p>
          <p>{book.status}</p>
        </Carousel.Caption>
      </Carousel.Item>

    });
    console.log(books);
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>{books}</Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
