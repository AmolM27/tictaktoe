import * as React from 'react';
import styles from './Tictaktoe.module.scss';
import { ITictaktoeProps } from './ITictaktoeProps';
import { escape } from '@microsoft/sp-lodash-subset';

export class Square extends React.Component<any,any> {
  public render() {
    return (
      <div className={["ms-Grid-col ms-u-sm4 ms-u-md4", styles.squareCont].join(' ')} onClick={() => this.props.OnSquareClick()}>{this.props.value}</div>
    )
  }
}

export class Board extends React.Component<any,any> {

  constructor()
  {
    super();
    var initalVals = ['', 'X', 'O',
                        'O', 'X', 'A',
                        '', 'X', ''];
    
    var p1 = {name:"Player 1", value: "X"}
    var p2 = {name:"Player 2", value: "O"}
    this.state = {
      values: initalVals,
      player1: p1,
      player2: p2,
      currentPlayer: p1
    }
  }

  handleSquareClick(id:number) {
    let vals = this.state.values.slice();
    vals[id] = this.state.currentPlayer.value;
    this.setState({values: vals});
    if (this.state.currentPlayer == this.state.player1)
    {
      this.setState({currentPlayer: this.state.player2})
    }
    else {
      this.setState({currentPlayer: this.state.player1})
    }
    console.log("Hey id " + id);
  }


  private renderRow(startIndex: number, colCount: number) {

    var col = [];
    for (var i=0; i < colCount; i++) {
      let index = startIndex;
      col.push(<Square key={index} OnSquareClick={() => this.handleSquareClick(index)} value={this.state.values[index]} />)
      startIndex++;
    }

    return (
      <div className="ms-Grid-row">
      {col}
      </div>
    );
  }

  public render() {
    return (
      <div className={["ms-Grid", styles.gridCont].join(' ')}>
          <h2>Hello from board</h2>
          <h3>It is {this.state.currentPlayer.name} turn</h3>
          {this.renderRow(0, 3)}
          {this.renderRow(3, 3)}
          {this.renderRow(6, 3)}
      </div>
    );
  }
}
export class Game extends React.Component<any,any> {
  public render() {
    return (
      <div>
        <h2>Hello from the {this.props.name}</h2>
        <Board/>
      </div>
    );
  }
}
export default class Tictaktoe extends React.Component<ITictaktoeProps, {}> {

  public render(): React.ReactElement<ITictaktoeProps> {
    return (
      <div className={styles.tictaktoe}>
        <div className={styles.container}>
          <Game name="Game 1"/>
          {/*
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
          */}
        </div>
      </div>
    );
  }
}
