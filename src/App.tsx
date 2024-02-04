import { useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { graphql } from './__generated__/gql';

const queryBooks = graphql(/* GraphQL */ `
  query queryBooks($title: String) {
    books(input: { title: $title }) {
      id
      title
      author {
        id
        name
        __typename
      }
      __typename
    }
  }
`);

function App() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const [getBooks, { data, loading, error }] = useLazyQuery(queryBooks);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className='App'>
      <h1>Welcome to Bookstore</h1>
      <input
        type='text'
        placeholder='Search books'
        onChange={handleSearchInputChange}
        value={searchInput}
      />
      <button onClick={() => getBooks({ variables: { title: searchInput } })}>
        Search
      </button>
      {data?.books.length ? (
        <ul>
          {data.books.map((book) => (
            <li key={book.id}>
              {book.title} - {book.author.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}

export default App;
