import React, { Component } from 'react';

export default class Cell extends Component {
    render(){
        return (
            <div className={"gol-cell " + this.props.cell.status}></div>
        )
    }
}
