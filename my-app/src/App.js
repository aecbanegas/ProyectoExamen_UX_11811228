import React, { Fragment} from 'react';
import './App.css';
import NavBar from './NavBar'

class App extends React.Component {
  //Constructor base
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      search:'',
    }
  }
  //funcion que asigna la query que se trae desde navbar a App.js
  genQuery = (qry) => {
    this.setState({ search: qry })
  }
  //Al montar eel componente recupera informacion de local storage
  componentDidMount() {
    this.refs.note.focus();
    const json = localStorage.getItem('datas');
    const datas = JSON.parse(json) || [];
    this.setState({ datas,});
  }
  //Al hacer click a insertar en el button Add Note de JSX se obtiene la informacion por medio de referencias y se guarda en local storage
  fSubmit = (e) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    e.preventDefault();

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
    datas.push(data);

    this.setState({
      datas: datas,
    });
    //Localstorage
    localStorage.setItem('datas', JSON.stringify(datas));
    this.refs.myForm.reset();
    this.refs.note.focus();
  }
  //Funcion encargada de eliminar una nota, esta tambien se elimina de localstorage por igual
  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });
    localStorage.setItem('datas', JSON.stringify(datas));
    this.refs.myForm.reset();
    this.refs.note.focus();
  }

  render() {
    let datas = this.state.datas;
    return (
      <Fragment>
        <NavBar genQuery={this.genQuery}/>
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
            (buscar(data.tags, this.state.search)) && (
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
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}


function buscar(arr, qry){
  if (!arr.length) {
      return true
  }
  for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      if (el.includes(qry)) {
         return true 
      }
  }
  return false
}

export default App;
