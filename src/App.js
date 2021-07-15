import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import config from '../config';

import TabsNavigator from './navigation/TabsNavigator';

const App = () => {
  // Theme - Coloring
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const bkgStyle = {
    titleColor: isDarkMode ? '#888' : '#6930C3',
    bkgColor: isDarkMode ? '#262626' : '#EBEBEB',
    secBkgColor: isDarkMode ? '#221F3B' : 'white',
    txtColor: isDarkMode ? '#EBEBEB' : '#050505',
    secTxtColor: isDarkMode ? '#EBEBEB' : '#4f4f4f',
    placeholderColor: isDarkMode ? '#888' : '#888',
    searchIcon: isDarkMode ? '#EBEBEB' : '#6930C3',
    cardBlurBkg: isDarkMode
      ? 'rgba(52, 52, 52, 0.7)'
      : 'rgba(152, 152, 152, 0.8)',
  };

  const [moviesState, setMoviesState] = React.useState({
    trending: [],
    upcoming: [],
    popular: [],
    topRated: [],
  });

  // TMDb API
  const fetchMovies = async (setMoviesState, category) => {
    let url;
    switch (category) {
      case 'trending':
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${config.API_KEY}`;
        break;
      case 'upcoming':
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=1&region=us`;
        break;
      case 'popular':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`;
        break;
      case 'topRated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${config.API_KEY}&language=en-US&page=1`;
        break;
      default:
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${config.API_KEY}`;
    }

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setMoviesState(state => {
          let movies = data.results;
          switch (category) {
            case 'trending':
              return {...state, trending: movies};
            case 'upcoming':
              return {...state, upcoming: movies};
            case 'popular':
              return {...state, popular: movies};
            case 'topRated':
              return {...state, topRated: movies};
            default:
              return {...state};
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchMovies(setMoviesState, 'trending');
    fetchMovies(setMoviesState, 'upcoming');
    fetchMovies(setMoviesState, 'popular');
    fetchMovies(setMoviesState, 'topRated');
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bkgStyle.bkgColor}
      />
      <TabsNavigator
        bkgStyle={bkgStyle}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        moviesState={moviesState}
      />
    </NavigationContainer>
  );
};

export default App;
/*

Color Palette => 
purple : #6930C3
gray : #221F3B
black : #262626
white : #EBEBEB


TMDb API calls =>

trending : `https://api.themoviedb.org/3/trending/movie/day?api_key=${config.API_KEY}`
upcoming : `https://api.themoviedb.org/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=1&region=us`
popular : `https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`
topRated : `https://api.themoviedb.org/3/movie/top_rated?api_key=${config.API_KEY}&language=en-US&page=1` 

search : `https://api.themoviedb.org/3/search/movie?api_key=${config.API_KEY}&language=en-US&page=${pgNum}&include_adult=false`

images : `http://image.tmdb.org/t/p/w500/{your_poster_path}`

*/
