import React    from 'react';
import { Route, Link } from 'react-router-dom';

import Constants from '../constants';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      selectedCards: [],
      hasOwnCard: false
    };
  }
  componentDidMount(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        const response = JSON.parse(xhr.responseText);
        if(response.cards.length > 0){
          const hasOwnCard = response.cards.some(card => { return card.user_id === this.props.currentUser.user_id; });
          if(hasOwnCard){
            this.setState({ cards: response.cards, hasOwnCard: hasOwnCard });
          } else {
            this.props.history.push("/wanted/users");
          }
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
    this.props.history.push("/wanted");
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
            <Link to="/wanted/users" className="btn btn-danger">カードを書き直す</Link>
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
              <Link to="/wanted" className="close" aria-label="Close">
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