import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';


const styles = {
  root: {
    flexGrow: 1,
  },
};





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
             <div style={{justifyContent: 'center', backgroundColor:"purple", padding:100,}}>
              <Flex p={2} align='center'>
                <Box px={2} w={1/4}><h1 style={{backgroundColor:"red"}}>Muzik</h1></Box>
                <Box px={2} w={1}><h2 style={{backgroundColor:"lightGrey"}}>Music Songs</h2></Box>
              </Flex>
              <Flex p={2} align='flex-start' >
                
                <Box px={2} w={1/2}>
                <label>Categorias</label>
                <ul>
                  {this.state.caratulas.map(cat => 
                  this.renderCategoria(cat.category))}
                </ul>
                </Box>
                <Flex p={2} align='center' justify='center' wrap >
                  {this.state.caratulas.map(elemento => 
                    <Box w={1/4}>{this.renderElemento(elemento['im:artist'], elemento['im:image'], '*')}</Box>)}
                </Flex>
              </Flex>
           </div>
  
      );
    }else{
      this.state.categorias=[];
      return(
      <div style={{justifyContent: 'center', backgroundColor:"purple", padding:100,}}>
              <Flex p={2} align='center'>
                <Box px={2} w={1/4}><h1 style={{backgroundColor:"red"}}>Muzik</h1></Box>
                <Box px={2} w={1}><h2 style={{backgroundColor:"lightGrey"}}>Music Songs</h2></Box>
              </Flex>
              <Flex p={2} align='flex-start' >
                
                <Box px={2} w={1/2}>
                <label>Categorias</label>
                <ul>
                  {this.state.caratulas.map(cat => 
                  this.renderCategoria(cat.category))}
                </ul>
                </Box>
                <Flex p={2} align='center' justify='center' wrap >
                  {this.state.caratulas.map(elemento => 
                  this.renderElemento(elemento['im:artist'], elemento['im:image'], this.state.seleccion, elemento.category))}
                </Flex>
              </Flex>
           </div>
        );
    }  
  }

  renderElemento(titulo, imagen, cat, categoria ) {
    if(cat=='*'){
      return (
          <Box w={1/4}><label style={{backgroundColor:"grey"}}><img src={imagen[2].label} /> {titulo.label} </label></Box>
      )
    }else{
      if(cat==categoria.attributes.label){ 
        return (
            <Box w={1/4}><label style={{backgroundColor:"grey"}}><img src={imagen[2].label} /> {titulo.label} </label></Box>
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
            <li><button onClick={() => 
              this.btnTap(categoria.attributes.label)}>{categoria.attributes.label }</button></li>
      )
    }
  }

  

}

export default App;
