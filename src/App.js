import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';
import './ToggleSwitch.scss';
import ToggleSwitch from './ToggleSwitch.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      getClassNameApp: "App",
      getClassNameCard: "",
    }
    this.darkModeSwitch = this.darkModeSwitch.bind(this);
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies() {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=b6fbc7f3f313bd395902af464ef47262&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    axios.get(url)
      .then(response =>
      {
        this.setState({movies: response.data.results});
      }
    );
  }

  darkModeSwitch() {
    if (this.state.getClassNameApp==="App") {
      this.setState({getClassNameApp: "App DarkMode", getClassNameCard: "cardDarkMode"});
    }
    else {
      this.setState({getClassNameApp: "App", getClassNameCard: ""});
    }
  }

  render() {
    return (
      <div className={this.state.getClassNameApp}>
        <h1>Check out this year's Oscar bait, y'all:</h1>
        <p>Search: <input></input></p>
        <ToggleSwitch Name="DarkMode" Checked="false" changeSwitch={this.darkModeSwitch}/>
          <div className="MovieGrid">
            {this.state.movies.map(movie =>
              {
                let movieURL = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
                return <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movieURL} />
                    <Card.Body className={this.state.getClassNameCard}>
                      <Card.Title>{movie.title} ({movie.release_date})</Card.Title>
                      <Card.Text>
                        {movie.overview}
                      </Card.Text>
                    </Card.Body>
                  </Card>
              })
            }
        </div>
      </div>
    );
  }
}

export default App;