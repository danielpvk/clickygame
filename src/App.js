import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClimberCard from './components/ClimberCard/ClimberCard';
import Instructions from './components/Instructions/Instructions';
import Container from "./components/Container/Container";
import Column from "./components/Column/column";
import Row from "./components/Row/row";
import climbers from "./components/climbers.json";

// Random shuffle
function randomClimbers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    climbers,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
    currentTime: 30,

  };
  

  setInterval = () => {
    this.interval = setInterval(this.tick, 1000)
  }

  tick = () => {
    if (this.state.currentTime > 0) {
      this.setState({currentTime: this.state.currentTime - 1})
    } else {
      this.handleReset()
    }
  }

  handleReset = () => {
    console.log('handle reset was called!')
    clearInterval(this.interval)

    this.setState({
      currentScore: 0,
      topScore: 0,
      correctIncorrect: "You guessed incorrectly!",
      clicked: [],
      currentTime: 30,
    });
    this.setInterval()
    this.handleShuffle();
  }

  handleClick = id => {
    if (this.state.clicked.length === 0) {
      this.handleReset()
    }
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      correctIncorrect: "You guessed correctly!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 19) {
      this.setState({ correctIncorrect: "You win!" });
    }
    this.handleShuffle();
  };



  handleShuffle = () => {
    let shuffledClimbers = randomClimbers(climbers);
    this.setState({ climbers: shuffledClimbers });
  };


  render() {
    return (
      <div>
        <Instructions>
        Click on an image to earn points, but DO NOT click on an same image card repeatedly ! 
        </Instructions>

        <Instructions>  
        To win click on all images, without clicking on an image twice ! 
        </Instructions>

        <Container>
          <Row>
            {this.state.climbers.map(climber => (
              <Column size="md-3 sm-6">
                <ClimberCard
                  key={climber.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={climber.id}
                  image={climber.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </div>  



    );
  }
}

export default App;
