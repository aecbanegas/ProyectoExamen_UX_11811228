import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App container-fluid">
      <ul class="list-group">
        <li class="list-group-item d-flex">
          <div>Inbox</div>
          <div class="ml-auto">
            <button class="btn btn-outline-dark mx-2" type="button">X</button>
          </div>
        </li>
        <li class="list-group-item d-flex">
        <span class="badge badge-dark">Dark</span>
        </li>
      </ul>
    </div>
  );
}

export default App;
