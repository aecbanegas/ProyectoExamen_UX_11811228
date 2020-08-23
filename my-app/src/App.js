import React, { Fragment, Text } from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      globaldatas: [],
    }
  }

  componentDidMount() {
    this.refs.note.focus();
    const json = localStorage.getItem('datas');
    const datas = JSON.parse(json) || [];
    const json2 = localStorage.getItem('globaldatas');
    const globaldatas = JSON.parse(json2) || [];
    this.setState({ datas, globaldatas });
  }

  fSubmit = (e) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let note = this.refs.note.value;
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "/" + months[current_datetime.getMonth()] + "/" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    console.log(formatted_date)
    let date = formatted_date;
    let tags_origen = this.refs.tags.value;
    console.log(String(tags_origen));
    let tags = String(tags_origen).split(',');
    let data = {
      note, date, tags
    }
    let globaldata = {
      note, date, tags
    }
    datas.push(data);
    let globaldatas = this.state.globaldatas;
    globaldatas.push(globaldata)

    this.setState({
      datas: datas,
      globaldatas: globaldatas,
    });
    localStorage.setItem('datas', JSON.stringify(datas));
    localStorage.setItem('globaldatas', JSON.stringify(globaldatas));
    this.refs.myForm.reset();
    this.refs.note.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    let globaldatas = this.state.globaldatas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });
    localStorage.setItem('datas', JSON.stringify(datas));
    localStorage.setItem('globaldatas', JSON.stringify(globaldatas));
    this.refs.myForm.reset();
    this.refs.note.focus();
  }

  fSearch = (e) => {
    let searchWord = String(this.refs.wordsearch.value);
    console.log("La palabra es " + searchWord);
    let datas = this.state.datas;
    let globaldatas = this.state.globaldatas;
    if (searchWord = '') {
      datas = globaldatas;
    } else {
      let arraydata = [];
      for (let index = 0; index < globaldatas.length; index++) {
        console.log(typeof globaldatas[index].tags)
        console.log(globaldatas[index].tags)
        if (globaldatas[index].tags.includes(searchWord)) {
          arraydata.push(globaldatas[index]);
          console.log("entra al if: " + globaldatas[index].tags)
        }
      }
      datas = arraydata;
    }
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
            <form ref="search" className="form-inline ml-auto">
              <input type="text" ref="wordsearch" placeholder="Search..." className="formField" />
              <button type="submit" className="btn btn-outline-light mt-2 mb-2 mx-2" onClick={(e) => this.fSearch(e)}>Search Tag</button>
            </form>
          </div>
        </nav>
        <div className="App container-fluid">
          <form ref="myForm">
            <div className="form-group-lg">
              <label id="addNotes" className="mt-2 mb-2 mx-2">Add Notes:</label>
              <input type="text" ref="note" placeholder="Your new note..." className="formField" />
              <label id="addTags" className="mt-2 mb-2 mx-2">Add Tags:</label>
              <input type="text" ref="tags" placeholder="e.g. tag1,tag2,tag3" className="formField" />
              <button type="submit" className="btn btn-outline-light mt-2 mb-2 mx-2" style={{ background: "rgba(52, 20, 249, 0.57)" }} onClick={(e) => this.fSubmit(e)}>Add Note</button>
            </div>
          </form>
          <ul className="list-group">
            {datas.map((data, i) =>
              <li key={i} className="list-group-item d-flex flex-wrap justify-content-between">
                <div>
                  <p className="text-justify text-break">Note: {data.note}</p>
                  <div className="d-flex flex-wrap">Date: {data.date}</div>
                  <div className="d-flex flex-wrap">
                    {data.tags.map((tag) =>
                      <span className="badge badge-primary mt-2 mb-2 mx-2" style={{ background: "rgba(52, 20, 249, 0.57)" }}>{tag}</span>
                    )}
                  </div>
                </div>
                <div>
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
