import React    from 'react';
import { Link } from 'react-router-dom';

import Constants from '../constants';

export default class Registration extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.exampleTags = ["エンジニア", "読書会", "関西弁"];
    this.exampleContents = ["勉強が好きすぎて大学に5年間通った。", "彼女が欲しすぎて出会い系サイトを作ってしまった。", "一部ではかいちょーと呼ばれている。"];
  }
  register(e){
    e.preventDefault();
    const data = new FormData(e.target);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        this.props.history.push("/wanted");
      }
    }.bind(this);
    xhr.open("POST", e.target.action, true);
    xhr.send(data);
  }
  render(){
    return(
      <div className="container">
      {(()=>{
        if(this.props.currentUser){
          return(
            <div className="row">
              <div className="col-sm-12">
                <h1 style={{textAlign: "center", fontWeight: "bold"}}>Registration</h1>
                <form action={`${Constants.apiDomain}/cards`} method="POST" id="registrationForm" onSubmit={this.register.bind(this)}>
                  <table className="table table-bordered">
                    <caption>基本情報</caption>
                    <tbody>
                      <tr>
                        <th>
                          <label htmlFor="name">名前</label>
                        </th>
                        <td>
                          <input type="text" name="name" id="name" placeholder="名前" className="form-control" required defaultValue={this.props.currentUser.name} />
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label htmlFor="age">年齢</label>
                        </th>
                        <td>
                          <input type="number" name="age" min="18" max="60" id="age" placeholder="年齢" className="form-control" defaultValue={this.props.currentUser.age} required />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table table-bordered">
                    <caption>自分キーワード</caption>
                    <tbody>
                    {this.props.currentUser.tags.map((tag, i) => {
                      return(
                        <tr key={`registrationTags_${i}`}>
                          <th>
                            <label htmlFor={`keyword_${i+1}`}>Word {i+1}</label>
                          </th>
                          <td>
                            <input type="text" name={`keyword_${i+1}`} id={`keyword_${i+1}`} placeholder={`例）${this.exampleTags[i]}`} className="form-control" defaultValue={this.props.currentUser.tags[i]} required />
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>

                  <table className="table table-bordered">
                    <caption>自己紹介</caption>
                    <tbody>
                    {this.props.currentUser.contents.map((content, i) => {
                      return(
                        <tr key={`registrationContents_${i}`}>
                          <th>
                            <label htmlFor={`profile_${i+1}`}>Profile {i+1}</label>
                          </th>
                          <td>
                            <textarea name={`profile_${i+1}`} id={`profile_${i+1}`} placeholder={`例）${this.exampleContents[i]}`} className="form-control" defaultValue={this.props.currentUser.contents[i]} required></textarea>
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>

                  <input type="hidden" name="event_id" value={Constants.eventId}         id="event_id" />
                  <input type="hidden" name="uid"      value={this.props.currentUser.uid} id="uid" />
                  <button className="btn btn-danger form-control">登録！</button>
                </form>
                <Link to="/wanted" className="btn btn-default form-control" style={{margin: "15px 0px"}}>戻る</Link>
              </div>
            </div>
          );
        }
      })()}
      </div>
    );
  }
}