import React    from 'react';
import { Route, Link } from 'react-router-dom';

import Constants from '../constants';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      selectedCards: []
    };
  }
  componentDidMount(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        const response = JSON.parse(xhr.responseText);
        if(response.cards.length > 0){
          this.setState({ cards: response.cards });
        } else {
          this.setState({
            cards: [{
              id: 1,
              name: "Hiroki",
              age: 26,
              contents: [
                "勉強が好きすぎて大学に5年間通った。",
                "彼女が欲しすぎて出会い系サイトを開発してしまった。",
                "一部ではかいちょーと呼ばれている。"
              ],
              tags: ["広告", "エンジニア", "経済"]
            },{
              id: 2,
              name: "Hiroshi",
              age: 28,
              contents: [
                "勉強が好きすぎて大学に5年間通った。",
                "彼女が欲しすぎて出会い系サイトを開発してしまった。",
                "一部ではかいちょーと呼ばれている。"
              ],
              tags: ["コンサル", "教育", "東大"]
            },{
              id: 3,
              name: "Shiho",
              age: 24,
              contents: [
                "勉強が好きすぎて大学に5年間通った。",
                "彼女が欲しすぎて出会い系サイトを開発してしまった。",
                "一部ではかいちょーと呼ばれている。"
              ],
              tags: ["大学院生", "社会学", "林業"]
            },{
              id: 4,
              name: "にしやん",
              age: 26,
              contents: [
                "勉強が好きすぎて大学に5年間通った。",
                "彼女が欲しすぎて出会い系サイトを開発してしまった。",
                "一部ではかいちょーと呼ばれている。"
              ],
              tags: ["読書会", "映画祭", "関西弁"]
            }]
          });
        }
      }
    }.bind(this);
    xhr.open("GET", `${Constants.apiDomain}/cards?event_id=${Constants.eventId}`, true);
    xhr.send();
  }
  selectCard(card, e){
    const ids    = this.state.selectedCards;
    const newIds = []

    if(ids.indexOf(card.id) === -1){
      ids.push(card.id);
      this.setState({ selectedCards: ids });
    } else {
      ids.forEach(id => {
        if(id !== card.id) newIds.push(id);
      });
      this.setState({ selectedCards: newIds });
    }
    this.props.history.push("/wanted/cards");
  }
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 style={{fontWeight: "bold", textAlign: "center"}}>Wanted!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h5 style={{fontWeight: "bold", textAlign: "center", marginBottom: 15}}>制覇: {this.state.selectedCards.length}人 / {this.state.cards.length}人</h5>
          </div>
        </div>
        <div className="cards row">
        {this.state.cards.map((card, i) => {
          const cardStyle = { display: "block" };
          if(this.state.selectedCards.indexOf(card.id) !== -1){
            cardStyle.background = "#424242";
            cardStyle.color      = "#FFF";
          }
          return(
            <div key={`card${i}`} className={"card col-xs-6 col-sm-3"} style={cardStyle}>
              <Link to={`/wanted/cards/${card.id}`} style={cardStyle}>
                <h4 style={{textAlign: "center", fontWeight: "bold"}}>{card.name}</h4>
                <div className="tags" style={{paddingBottom: 15}}>
                {card.tags.map((tag, j)=>{
                  return <p key={`card${i}_tag${j}`} className="tag" style={{background: Constants.tagColors[j]}}>{card.tags[j]}</p>;
                })}
                </div>
              </Link>
            </div>
          );
        })}
        </div>
        <div className="row" style={{marginTop: 40}}>
          <div className="col-sm-12" style={{textAlign: "right"}}>
            <Link to="/wanted/users" className="btn btn-danger">登録する</Link>
          </div>
        </div>
        <Route path="/wanted/cards/:cardId" render={(props)=>{
          const card = this.state.cards.filter(card => {
            return card.id === Number(props.match.params.cardId);
          }).shift();

          return card ? <CardDetail card={card} colors={Constants.tagColors}
            selected={this.state.selectedCards.indexOf(card.id) !== -1}
            selectCard={this.selectCard.bind(this, card)}
          /> : null;
        }} />
      </div>
    );
  }
}

class CardDetail extends React.Component {
  render(){
    const card = this.props.card;
    return(
      <div className="selectedCard">
        <div className="row">
          <div className="col-xs-12">
            <div>
              <Link to="/wanted/cards" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </Link>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h4>{card.name} {card.age}歳</h4>
              </div>
            </div>
            <div className="row">
              <div className="tags col-xs-12">
                {card.tags.map((tag, i)=>{ return <span key={`selectedCard_tag${i}`} className="tag" style={{background: this.props.colors[i]}}>{tag}</span>; })}
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
                if(this.props.selected){
                  return <div className="btn btn-default form-control" style={{margin: "10px auto"}} onClick={this.props.selectCard}>会えてなかった！</div>;
                } else {
                  return <div className="btn form-control" style={{margin: "10px auto", background: "#E91E63", color: "#FFF"}} onClick={this.props.selectCard}>会えた！</div>;
                }
              })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}