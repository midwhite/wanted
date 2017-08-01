import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
      cells: [],
      cards: [{
        name: "Hiroki",
        contents: [
          "勉強が好きすぎて大学に5年間通った。",
          "彼女が欲しすぎて出会い系サイトを開発してしまった。",
          "一部ではかいちょーと呼ばれている。"
        ],
        tags: ["広告", "エンジニア", "経済"]
      },{
        name: "Hiroshi",
        contents: [
          "勉強が好きすぎて大学に5年間通った。",
          "彼女が欲しすぎて出会い系サイトを開発してしまった。",
          "一部ではかいちょーと呼ばれている。"
        ],
        tags: ["コンサル", "教育", "東大"]
      },{
        name: "Shiho",
        contents: [
          "勉強が好きすぎて大学に5年間通った。",
          "彼女が欲しすぎて出会い系サイトを開発してしまった。",
          "一部ではかいちょーと呼ばれている。"
        ],
        tags: ["大学院生", "社会学", "林業"]
      },{
        name: "にしやん",
        contents: [
          "勉強が好きすぎて大学に5年間通った。",
          "彼女が欲しすぎて出会い系サイトを開発してしまった。",
          "一部ではかいちょーと呼ばれている。"
        ],
        tags: ["読書会", "映画祭", "関西弁"]
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
  touchCell(){
    if(this.state.cells.indexOf(this.state.selectedCard) === -1){
      const cells = this.state.cells;
      cells.push(this.state.selectedCard);
      this.setState({ selectedCard: null, cells: cells });
    } else {
      this.setState({ selectedCard: null });
    }
  }
  resetCell(){
    const cells = [];
    this.state.cells.forEach(cellNum => {
      if(cellNum !== this.state.selectedCard) cells.push(cellNum);
    });
    this.setState({ selectedCard: null, cells: cells });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 style={{fontWeight: "bold", textAlign: "center"}}>Wanted!</h1>
          </div>
        </div>
        <div className="cards row">
        {this.state.cards.map((card, i) => {
          const cardStyle = {};
          if(this.state.cells.indexOf(i) !== -1){
            cardStyle.background = "#424242";
            cardStyle.color      = "#FFF";
          }
          return(
            <div key={`card${i}`} className={"card col-xs-6 col-sm-2"} style={cardStyle} onClick={this.selectCard.bind(this, i)}>
              <h4 style={{textAlign: "center", fontWeight: "bold"}}>{card.name}</h4>
              <div className="tags" style={{paddingBottom: 15}}>
              {card.tags.map((tag, j)=>{
                return <p key={`card${i}_tag${j}`} className="tag" style={{background: this.tagColors[j]}}>{card.tags[j]}</p>;
              })}
              </div>
            </div>
          );
        })}
        </div>
        {(()=>{
          if(this.state.selectedCard != null){
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
                        {card.tags.map((tag, i)=>{ return <span key={`selectedCard_tag${i}`} className="tag" style={{background: this.tagColors[i]}}>{tag}</span>; })}
                      </div>
                    </div>
                    <div className="row">
                      <div className="contents col-xs-12">
                        {card.contents.map((content, i)=>{
                          return(
                            <div key={`selectedCard_content${i}`} className="content">{content}</div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                      {(()=>{
                        if(this.state.cells.indexOf(this.state.selectedCard) !== -1){
                          return <div className="btn btn-default form-control" style={{margin: "10px auto"}} onClick={this.resetCell.bind(this)}>会えてなかった！</div>;
                        } else {
                          return <div className="btn form-control" style={{margin: "10px auto", background: "#E91E63", color: "#FFF"}} onClick={this.touchCell.bind(this)}>会えた！</div>;
                        }
                      })()}

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
