import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClimberCard from './components/ClimberCard/ClimberCard';
import Instructions from './components/Instructions/Instructions';
import Container from "./components/Container/Container";
import Column from "./components/Column/column";
import Row from "./components/Row/row";
import climbers from "./components/climbers.json";
class App extends Component {
  state = {
    climbers,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
    currentTime: 30,

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
