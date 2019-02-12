import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
      super();
      this.state = {
          items: [],
          caratulas: [],
          categorias: [],
          seleccion: '*'
      }
      this.btnTap = this
            .btnTap
            .bind(this);
    }
    btnTap(etiqueta) {
        this.setState({seleccion:etiqueta})
        this.render(etiqueta);
    }
  

  componentDidMount() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(response => response.json())
      .then(responseFeed => responseFeed.feed)
      .then( ({ entry : items }) => { localStorage.setItem("Caratulas",JSON.stringify(items)) 
      })  
    }

  render() {
    this.state.caratulas=JSON.parse(localStorage.getItem("Caratulas"));
    if(this.state.seleccion=='*'){
      return (
          <div className="App" style={{backgroundColor:"pink", margin:100}}>


             <div class="container">
                <div class="row">
                  <div class="col-sm-3" style={{backgroundColor:"red"}}>
                    <p>Muzik</p>
                  </div>
                  <div class="col-sm-9" style={{backgroundColor:"grey"}}>
                    <p>Music Songs</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3" style={{backgroundColor:"black", color:"white"}}>
                    <p>Categorias</p>
                    <ul>
                      {this.state.caratulas.map(cat => this.renderCategoria(cat.category))}
                    </ul>
                  </div>
                  <div class="col-sm-9" style={{backgroundColor:"white"}}>
                    <div class="row">
                      {this.state.caratulas.map(elemento => this.renderElemento(elemento['im:artist'],elemento['im:image'], "*"))}
                    </div>
                  </div>
                </div>

            </div>
           </div>
  
      );
    }else{
      this.state.categorias=[];

      return (
          <div className="App" style={{backgroundColor:"pink", margin:100}}>


             <div class="container">
                <div class="row">
                  <div class="col-sm-3" style={{backgroundColor:"red"}}>
                    <p>Muzik</p>
                  </div>
                  <div class="col-sm-9" style={{backgroundColor:"grey"}}>
                    <p>Music Songs</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3" style={{backgroundColor:"black", color:"white"}}>
                    <p>Categorias</p>
                    <ul>
                      {this.state.caratulas.map(cat => this.renderCategoria(cat.category))}
                    </ul>
                  </div>
                  <div class="col-sm-9" style={{backgroundColor:"white"}}>
                    {this.state.caratulas.map(elemento => 
                  this.renderElemento(elemento['im:artist'], elemento['im:image'], this.state.seleccion, elemento.category))}
                  </div>
                </div>

            </div>
           </div>
  
      );
    }
  }



  renderElemento(titulo, imagen, cat, categoria ) {
    if(cat=="*"){
      return (
          <div class="media" style={{display:"flex", flexDirection: "column"}}>
            <div class="img-rounded">
              <img src={imagen[2].label} class="media-object" style={{width:170, padding:2}}/>
            </div>
            <div class="media-body">
              <label style={{fontSize:10}}>{titulo.label}</label>
            </div>
          </div>
      )
    }else{
      if(cat==categoria.attributes.label){ 
        return (
            <div class="media" style={{display:"flex", flexDirection: "column"}}>
            <div class="img-rounded">
              <img src={imagen[2].label} class="media-object" style={{width:170, padding:2}}/>
            </div>
            <div class="media-body">
              <label style={{fontSize:10}}>{titulo.label}</label>
            </div>
          </div>
        )
      }
    }
  }

  renderCategoria(categoria ) {
    var salir=false;
    this.state.categorias.forEach( function(valor, indice, array) {
        if( valor==categoria.attributes.label){
          salir=true;
        }
    })
    if(salir==false){
      this.state.categorias.push(categoria.attributes.label);
      return (
            <li onClick={() => 
              this.btnTap(categoria.attributes.label)}>{categoria.attributes.label }</li>
      )
    }
  }

  
}

export default App;
