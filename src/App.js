import React, { Component } from 'react';
import Cell from './Cell';

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            rows:4, cols:4, cells:[], generations:0
        }
    }
    componentDidMount(){
        this.initGrid()
    }
    defaultSeed(){
        let seed = [{rowIdx:0,colIdx:0},{rowIdx:1,colIdx:1},{rowIdx:2,colIdx:2}]
        for(var i=0;i<seed.length;i++){
            this.toggleCell(seed[i])
        }
    }
    toggleCell(coords){
        // expects an object like {rowIdx:0,colIdx:0}
        //this.state.cells[coords.rowIdx,coords.colIdx].status = !this.state.cells[coords.rowIdx,coords.colIdx].status
    }
    initGrid(){
        for(var i=0;i<this.state.rows;i++){
            for(var j=0;j<this.state.cols;j++){
                this.state.cells.push(<Cell key={'cell-' + i.toString() + '-' + j.toString()} status={'dead'} coords={[i,j]} />)
            }
        }
        this.defaultSeed()
        let generations = this.state.generations +1
        this.setState({cells:this.state.cells,generations:generations})
    }
    render(){
        return(
            <div className="gol-app default">
                <h1>Game of life</h1>
                {this.state.cells}
            </div>
        )
    }
}
