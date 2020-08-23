import React, { Fragment, Text} from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: [],
    }
  }

  componentDidMount() {
    this.refs.note.focus();
  }

  fSubmit = (e) => {
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let note = this.refs.note.value;
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "/" + months[current_datetime.getMonth()] + "/" + current_datetime.getFullYear() +" "+current_datetime.getHours()+":"+current_datetime.getMinutes()+":"+current_datetime.getSeconds()
    console.log(formatted_date)
    let date = formatted_date;


    let data = {
      note, date,
    }
    datas.push(data);


    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.note.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.note.focus();
  }
  render() {
    let datas = this.state.datas;
    return (
      <Fragment>
        <nav className="navbar navbar-light navbar-expand-md" style={{ background: "rgba(52, 20, 249, 0.57)" }}>
          <a className="navbar-brand text-white">NoteIt</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <form className="form-inline form-row ml-auto">
              <input className="form-control mt-2 mb-2 mx-2 mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-light mt-2 mb-2 mx-2" type="submit">Search Tag</button>
            </form>
          </div>
        </nav>
        <div className="App container-fluid">
          <form ref="myForm">
            <div className="form group">
              <label id="addNotes">Add Notes:</label>
              <input type="text" ref="note" placeholder="Your new note..." className="formField" />
              <button type="submit" className="btn btn-outline-light mt-2 mb-2" style={{ background: "rgba(52, 20, 249, 0.57)" }} onClick={(e) => this.fSubmit(e)}>Add Note</button>
            </div>
          </form>
          <ul className="list-group">
            {datas.map((data, i) =>
              <li key={i} className="list-group-item d-flex flex-wrap">
                <div>
                  <div className="d-flex flex-wrap">Note: {data.note}</div>
                  <div className="d-flex flex-wrap">Date: {data.date}</div>
                </div>
                <div className="ml-auto">
                  <button onClick={() => this.fRemove(i)} className="btn btn-outline-dark mt-2 mb-2 mx-2">remove </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default App;
