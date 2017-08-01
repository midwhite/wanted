import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.apiDomain = "http://localhost:3000";
    this.tagColors = ["#2196F3", "#009688", "#FF5722"];
    this.eventId   = 1;

    this.state = {
      location: "home",
      selectedCard: null,
      cells: [],
      cards: []
    };

    // cards: [{
    //   name: "Hiroki",
    //   age: 26,
    //   contents: [
    //     "勉強が好きすぎて大学に5年間通った。",
    //     "彼女が欲しすぎて出会い系サイトを開発してしまった。",
    //     "一部ではかいちょーと呼ばれている。"
    //   ],
    //   tags: ["広告", "エンジニア", "経済"]
    // },{
    //   name: "Hiroshi",
    //   age: 28,
    //   contents: [
    //     "勉強が好きすぎて大学に5年間通った。",
    //     "彼女が欲しすぎて出会い系サイトを開発してしまった。",
    //     "一部ではかいちょーと呼ばれている。"
    //   ],
    //   tags: ["コンサル", "教育", "東大"]
    // },{
    //   name: "Shiho",
    //   age: 24,
    //   contents: [
    //     "勉強が好きすぎて大学に5年間通った。",
    //     "彼女が欲しすぎて出会い系サイトを開発してしまった。",
    //     "一部ではかいちょーと呼ばれている。"
    //   ],
    //   tags: ["大学院生", "社会学", "林業"]
    // },{
    //   name: "にしやん",
    //   age: 26,
    //   contents: [
    //     "勉強が好きすぎて大学に5年間通った。",
    //     "彼女が欲しすぎて出会い系サイトを開発してしまった。",
    //     "一部ではかいちょーと呼ばれている。"
    //   ],
    //   tags: ["読書会", "映画祭", "関西弁"]
    // }]
  }
  componentDidMount(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        const response = JSON.parse(xhr.responseText);
        this.setState({ cards: response.cards });
      }
    }.bind(this);
    xhr.open("GET", `${this.apiDomain}/cards?event_id=${this.eventId}`, true);
    xhr.send();
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
  toHome(){
    this.setState({ location: "home" });
  }
  toRegister(){
    this.setState({ location: "registration" });
  }
  register(e){
    e.preventDefault();
    const data = new FormData(e.target);
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        console.log(JSON.parse(xhr.responseText));
      }
    }

    xhr.open("POST", e.target.action, true);
    xhr.send(data);
  }
  render() {
    switch(this.state.location){
      case "home":
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
              <div key={`card${i}`} className={"card col-xs-6 col-sm-3"} style={cardStyle} onClick={this.selectCard.bind(this, i)}>
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
          <div className="row" style={{marginTop: 40}}>
            <div className="col-sm-12" style={{textAlign: "right"}}>
              <button className="btn btn-danger" onClick={this.toRegister.bind(this)}>登録する</button>
            </div>
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
                          <h4>{card.name} {card.age}歳</h4>
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
      case "registration":
        return(
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 style={{textAlign: "center", fontWeight: "bold"}}>Registration</h1>
                <form action={`${this.apiDomain}/cards`} method="POST" id="registrationForm" onSubmit={this.register.bind(this)}>
                  <table className="table table-bordered">
                    <caption>基本情報</caption>
                    <tbody>
                      <tr>
                        <th>
                          <label htmlFor="name">名前</label>
                        </th>
                        <td>
                          <input type="text" name="name" id="name" placeholder="名前" className="form-control" required />
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label htmlFor="age">年齢</label>
                        </th>
                        <td>
                          <input type="number" name="age" min="18" max="60" id="age" placeholder="年齢" className="form-control" required />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table table-bordered">
                    <caption>自分キーワード</caption>
                    <tbody>
                      <tr>
                        <th>
                          <label htmlFor="keyword_1">Word 1</label>
                        </th>
                        <td>
                          <input type="text" name="keyword_1" id="keyword_1" placeholder="例) エンジニア" className="form-control" required />
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label htmlFor="keyword_2">Word 2</label>
                        </th>
                        <td>
                          <input type="text" name="keyword_2" id="keyword_2" placeholder="例) 読書会" className="form-control" required />
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label htmlFor="keyword_3">Word 3</label>
                        </th>
                        <td>
                          <input type="text" name="keyword_3" id="keyword_3" placeholder="例) 関西弁" className="form-control" required />
                        </td>
                      </tr>

                    </tbody>
                  </table>

                  <table className="table table-bordered">
                    <caption>自己紹介</caption>
                    <tbody>

                      <tr>
                        <th>
                          <label htmlFor="profile_1">Profile 1</label>
                        </th>
                        <td>
                          <textarea name="profile_1" id="profile_1" placeholder="例) 勉強が好きすぎて大学に5年間通った。" className="form-control" required></textarea>
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label htmlFor="profile_2">Profile 2</label>
                        </th>
                        <td>
                          <textarea name="profile_2" id="profile_2" placeholder="例) 彼女が欲しすぎて出会い系サイトを作ってしまった。" className="form-control" required></textarea>
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label htmlFor="profile_3">Profile 3</label>
                        </th>
                        <td>
                          <textarea name="profile_3" id="profile_3" placeholder="例) 一部ではかいちょーと呼ばれている。" className="form-control" required></textarea>
                        </td>
                      </tr>

                    </tbody>
                  </table>

                  <input type="hidden" name="event_id" value={this.eventId} id="event_id" />
                  <button className="btn btn-danger form-control">登録！</button>
                </form>
                <button className="btn btn-default form-control" onClick={this.toHome.bind(this)} style={{margin: "15px 0px"}}>戻る</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
}

export default App;
