import React    from 'react';
import { Link } from 'react-router-dom';

import Constants from '../constants';

export default class Registration extends React.Component {
  register(e){
    e.preventDefault();
    const data = new FormData(e.target);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        this.props.history.push("/wanted/cards");
      }
    }.bind(this)
    xhr.open("POST", e.target.action, true);
    xhr.send(data);
  }
  render(){
    return(
      <div className="container">
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

              <input type="hidden" name="event_id" value={Constants.eventId}         id="event_id" />
              <input type="hidden" name="uid"      value={this.props.currentUser.id} id="uid" />
              <button className="btn btn-danger form-control">登録！</button>
            </form>
            <Link to="/wanted/cards" className="btn btn-default form-control" style={{margin: "15px 0px"}}>戻る</Link>
          </div>
        </div>
      </div>
    );
  }
}