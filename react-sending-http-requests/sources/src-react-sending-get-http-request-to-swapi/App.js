import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

// function App() {
//   const dummyMovies = [
//     {
//       id: 1,
//       title: 'Some Dummy Movie',
//       openingText: 'This is the opening text of the movie',
//       releaseDate: '2021-05-18',
//     },
//     {
//       id: 2,
//       title: 'Some Dummy Movie 2',
//       openingText: 'This is the second opening text of the movie',
//       releaseDate: '2021-05-19',
//     },
//   ];

//   return (
//     <React.Fragment>
//       <section>
//         <button>Fetch Movies</button>
//       </section>
//       <section>
//         <MoviesList movies={dummyMovies} />
//       </section>
//     </React.Fragment>
//   );
// }

/* Here we use the Fetch API which is built into the browser to send the 
http request to the star wars api(swapi) to get the 'movies' information
rather than using the local dummy data. 
We use swapi as the backend for this React app to learn how to send http
request and handle the response in React.

For info about swapi see readMe.txt.
*/
// function App() {

//   const [movies, setMovies] = useState([]);

//   const getMoviesHandler = () => {
//     /* We can pass a second argument which is a JavaScript object to
//     configure the request like setting the type of http method, setting
//     the headers, setting the body etc. By default, the http method is GET.

//     For info about fetch api see readMe.txt.
//     */
//     fetch("https://swapi.dev/api/films")
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       const transformedMovies = data.results.map(movie => {
//         return {
//           id: movie.episode_id,
//           title: movie.title,
//           releaseDate: movie.release_date,
//           openingText: movie.opening_crawl
//         }
//       })
//       setMovies(transformedMovies);
//     })
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={getMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         <MoviesList movies={movies} />
//       </section>
//     </React.Fragment>
//   );
// }

/* Here we use async and await instead of then() and catch() to handle
the Promise result. 

Also we have added some fallback text incase there are no movies in the
'movies' state and also a loading state which shows 'Loading...' while 
fetching the data from the backend.
*/
// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function getMoviesHandler() {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("https://swapi.dev/api/film");
//       if (!response.ok) {
//         throw Error("Something went wrong!");
//       }

//       const data = await response.json();

//       const transformedMovies = data.results.map((movie) => {
//         return {
//           id: movie.episode_id,
//           title: movie.title,
//           releaseDate: movie.release_date,
//           openingText: movie.opening_crawl,
//         };
//       });
//       setMovies(transformedMovies);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message);
//     }
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={getMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && movies.length > 0 && !error && <MoviesList movies={movies} />}
//         {isLoading && <p>Loading...</p>}
//         {!isLoading && movies.length === 0 && !error && <p>No movies found.</p>}
//         {!isLoading && error && <p>{error}</p>}
//       </section>
//     </React.Fragment>
//   );
// }

/* Here we have used http error handling to show relevant information to
the user incase we get error response / error status codes. 

Instead of fetch api which is built into the browser we can also the third
party package 'axios' to simplify the sending and handling of http 
requests and response respectively.

*/
// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   /* Since we are using async and await therfore we used try-catch blocks.
//     Had we used then() then we would use catch() to handle the error
//     response.
//   */
//   async function getMoviesHandler() {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("https://swapi.dev/api/film");
//       if (!response.ok) {
//         throw Error("Something went wrong!");
//       }

//       const data = await response.json();

//       const transformedMovies = data.results.map((movie) => {
//         return {
//           id: movie.episode_id,
//           title: movie.title,
//           releaseDate: movie.release_date,
//           openingText: movie.opening_crawl,
//         };
//       });
//       setMovies(transformedMovies);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message);
//     }
//   }

//   let content = <p>No movies found.</p>;

//   if(movies.length > 0) {
//     content = <MoviesList movies={movies} />
//   }

//   if(error) {
//     content = <p>{error}</p>
//   }

//   if(isLoading) {
//     content = <p>Loading...</p>;
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={getMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//        {content}
//       </section>
//     </React.Fragment>
//   );
// }

/* Here we use useCallback() to load the movies immediately on loading the 
App component. */
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   getMoviesHandler();
  // }, []);

  console.log("App is RUNNING");

  /* Here we have put the annonumous function for 'getMoviesHandler' inside
  useCallback() because in JavaScript, functions are objects and this 
  annonymous function object would be created everytime this App component
  is re-evaluated so to avoid and to ensure that this function object is
  recreated upon App component re-evaluation only when the external 
  dependecies used by 'getMoviesHandler' changes, we use useCallback. */
  const getMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  /* Here we pass 'getMoviesHandler' as the dependency because incase the 
  function has some external dependencies this useEffect function does get 
  re-executed. In this case it is not necessary to  pass 'getMoviesHandler' 
  as the dependency. */
  useEffect(() => {
    getMoviesHandler();
  }, [getMoviesHandler]);

  let content = <p>No movies found.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
