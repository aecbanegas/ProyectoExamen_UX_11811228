import React from 'react';

class NavBar extends React.Component {
    //metodo para obtener la informacion del input JSX de search
    catch = (query) => {
        query = this.textInput.value 
        this.props.genQuery(query)
    }
    
    render() {
        let query;
        return (
            <nav className="navbar navbar-light navbar-expand-md" style={{ background: "rgba(52, 20, 249, 0.57)" }}>
                <a className="navbar-brand text-white">NoteIt</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <form ref="search" className="form-inline ml-auto">
                        <input ref="wordsearch" placeholder="Search..." ref={(input) => { this.textInput = input }} onChange={()=>this.catch(query) }/>
                    </form>
                </div>
            </nav>
        );
    }
}

export default NavBar