// App.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const apiUrl = 'http://localhost:3001';
// axios.interceptors.request.use(
//   (config) => {
//     const { origin } = new URL(config.url);
//     const allowedOrigins = [apiUrl];
//     const token = localStorage.getItem('token');
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );
// const Test = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [fetchError, setFetchError] = useState(null);

//   const getFavorites = () => {
//     axios.get(`${apiUrl}/favorites`)
//       .then((response) => {
//         setFavorites(response.data.favorites);
//         setFetchError(null);
//       })
//       .catch((error) => {
//         // eslint-disable-next-line no-console
//         console.log(error);
//       });
//   };

//   return (
//     <>
//       <section>
//         <button type="submit" onClick={() => getFavorites()}>
//           Get Favs
//         </button>
//         <ul>
//           {favorites.map((favorite) => (
//             <li>{favorite.title}</li>
//           ))}
//         </ul>
//         {fetchError && (
//         <p>{fetchError}</p>
//         )}
//       </section>
//     </>
//   );
// };
// export default Test;
