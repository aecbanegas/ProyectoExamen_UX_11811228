import React, { Fragment } from 'react';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      textValue: 'Change me',
    }
    this.onPress = this.onPress.bind(this)
  }
  

  onPress = () => {
    this.setState({textValue: 'Joder'});
  }
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-light navbar-expand-md" style={{ background: "rgba(52, 20, 249, 0.57)" }}>
          <a className="navbar-brand text-white">NoteIt</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <form className="form-inline form-row ml-auto">
              <button className="btn btn-outline-light mt-2 mb-2 mx-2" type="button" data-toggle="modal" data-target="#myModal">Add Note</button>
              <input className="form-control mt-2 mb-2 mx-2 mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-light mt-2 mb-2 mx-2" type="submit">Search Tag</button>
            </form>
          </div>
        </nav>
        <div className="App container-fluid">
          <ul className="list-group">
            <li className="list-group-item d-flex">
              <div>Inbox</div>
              <div className="ml-auto">
                <button className="btn btn-outline-dark mx-2" type="button">X</button>
              </div>
            </li>
            <li className="list-group-item d-flex">
              <span className="badge badge-dark">Dark</span>
            </li>
          </ul>
        </div>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">Add a new note</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">
                <label id="comment_head">Notes:</label>
                <textarea className="form-control" rows="5" id="comment">{this.state.textValue}</textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.onPress}>Close</button>
                <button type="button" className="btn btn-success" data-dismiss="modal">Add</button>
              </div>

            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
