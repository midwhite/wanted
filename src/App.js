import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
      cards: [{
        name: "Hiroki",
        tags: ["広告", "エンジニア", "経済"]
      },{
        name: "Hiroki",
        tags: ["広告", "エンジニア", "経済"]
      },{
        name: "Hiroki",
        tags: ["広告", "エンジニア", "経済"]
      },{
        name: "Hiroki",
        tags: ["広告", "エンジニア", "経済"]
      }]
    };
    this.tagColors = ["#2196F3", "#009688", "#FF5722"]
  }
  selectCard(i, e){
    this.setState({ selectedCard: i });
  }
  closeSelectedCard(){
    this.setState({ selectedCard: null });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Wanted!</h1>
          </div>
        </div>
        <div className="cards row">
        {this.state.cards.map((card, i) => {
          return(
            <div key={`card${i}`} className={"card col-xs-4 col-sm-2"} onClick={this.selectCard.bind(this, i)}>
              <h4>{card.name}</h4>
              <div className="tags">
              {card.tags.map((tag, j)=>{
                return <p key={`card${i}_tag${j}`} className="tag" style={{background: this.tagColors[j]}}>{card.tags[j]}</p>;
              })}
              </div>
            </div>
          );
        })}
        </div>
        {(()=>{
          if(this.state.selectedCard){
            const card = this.state.cards[this.state.selectedCard];
            return(
              <div className="selectedCard">
                <div className="row">
                  <div className="col-xs-12">
                    <div>
                      <button type="button" className="close" aria-label="Close" onClick={this.closeSelectedCard.bind(this)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <h4>{card.name}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="tags col-xs-12">
                      {card.tags.map((tag, i)=>{
                        return(
                          <span key={`selectedCard_tag${i}`} className="tag" style={{background: this.tagColors[i]}}>{tag}</span>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default App;
