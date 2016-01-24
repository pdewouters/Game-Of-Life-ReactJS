import React, { Component } from 'react'
import Cell from './Cell'
import _ from 'underscore'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            rowCount:50, colCount:70, rows:[], generations:0, delay: 2000
        }
    }

    componentDidMount(){
        this.initGrid()
        this.timer = setInterval(() => {
            this.step()
        }, this.state.delay)
       // this.step()
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    defaultSeed(){
        var rowIdx = this.state.rowCount / 2, colIdx = this.state.colCount / 2
        for(var i=rowIdx-5;i<=rowIdx+5;i++){
            for(var j=colIdx-5;j<=colIdx+5;j++){
                if(j%2===0){
                    this.state.rows[i][j] = 'live'
                }
            }
        }
    }

    toggleCell(){
        cell.status = cell.status === 'live' ? 'dead' : 'live'
    }

    initGrid(){
        for(var i=0;i<this.state.rowCount;i++){
            this.state.rows[i] = []
            for(var j=0;j<this.state.colCount;j++){
                this.state.rows[i][j] = 'dead'
            }
        }
        this.setState({rows:this.state.rows})
        this.defaultSeed()
        let generations = this.state.generations + 1
        this.setState({rows:this.state.rows,generations:generations})
    }

    step(){
        // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by over-population.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        this.state.rows.forEach((row, rowIdx)=>{
            row.forEach((cell, cellIdx)=> {

                let live = 0, dead = 0
                for(var i=rowIdx-1;i<=rowIdx+1;i++){
                    for(var j=cellIdx-1;j<=cellIdx+1;j++){
                        if(i<0 || i>this.state.rowCount-1){
                            continue
                        }
                        if(j<0 || j>this.state.colCount-1){
                            continue
                        }
                        if(i === rowIdx && j === cellIdx) {
                            continue
                        }
                        if(this.state.rows[i][j]==='live'){
                            live++
                        }
                        if(this.state.rows[i][j]==='dead'){
                            dead++
                        }
                    }
                }
                if(this.state.rows[rowIdx][cellIdx] === 'live' && live < 2){
                    this.state.rows[rowIdx][cellIdx] = 'dead'
                } else if(this.state.rows[rowIdx][cellIdx] === 'live' && (live===2 || live === 3)) {
                    this.state.rows[rowIdx][cellIdx] = 'live'
                } else if(this.state.rows[rowIdx][cellIdx] === 'live' && live > 3) {
                    this.state.rows[rowIdx][cellIdx] = 'dead'
                } else if( cell === 'dead' && live === 3){
                    this.state.rows[rowIdx][cellIdx] = 'live'
                }

            })
        })

        this.setState({rows:this.state.rows,generations: this.state.generations + 1})
    }

    render(){
        let cells = []
        this.state.rows.forEach((row, rowIdx)=>{
            row.forEach((cell, cellIdx)=> {
                cells.push(<div onClick={this.toggleCell} key={'cell-' + rowIdx + '-' + cellIdx} className={'gol-cell ' + cell}></div>)
            })
        })

        let width = this.state.colCount * 10, height = this.state.rowCount * 10
        return(
            <div className="gol-app default" style={{width: width + 'px', height: height + 'px'}}>
                <h1>Game of life</h1>
                {cells}
            </div>
        )
    }
}
