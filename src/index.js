import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, Button } from 'react-bootstrap';

class Box extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col,this.props.gameState, this.props.boxState)
	}

	render() {
		return(
			<div 
			id={this.props.id}
			onClick={this.selectBox}
			className="box"
			>
			<XorO 
			boxState = {this.props.boxState}
			/>
			</div>
		)
	}
}

class Grid extends React.Component {

render() {
		var rowArr = [];
		var boxState;
		
		for (var i = 0; i < this.props.rows; i++){
			for (var j = 0; j < this.props.cols; j++) {
				let boxId = i + "_" + j;
				boxState = this.props.grid[i][j]
				rowArr.push(
					<Box
						boxState={boxState}
						gameState = {this.props.gameState}
						boxId={boxId}
						key={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}
					/>
				);
			}
		}

        return(
            <div className="grid">
				{rowArr}
            </div>
        )
    }
}


class Main extends React.Component {
	constructor() {
		super();
		this.rows = 3;
		this.cols = 3;

		this.state = {
			grid: createGrid(this.rows),
			gameState: 0,
			
		};
	}
	


	selectBox = (row, col, gameState, boxState) => {
		let gridCopy = arrayClone(this.state.grid)
		if (boxState !== 0) {
			return
		}
		else{
			if (gameState % 2 === 0) {
				gridCopy[row][col] = 1;
			}
			else if (gameState % 2 === 1) {
				gridCopy[row][col] = -1;
			}
			this.setState({
				grid: gridCopy,
				gameState: gameState + 1
			});
		}
	}

	clear = () => {
		let gridCopy = createGrid(3)
		this.setState({
			gameState: 0,
			grid: gridCopy
		})
	}



	render() {
		return(
			<div>
				<h1>Tic Tac Toe</h1>
				<Grid 
					rows = {this.rows}
					cols = {this.cols}
					grid = {this.state.grid	}
					selectBox = {this.selectBox}
					gameState = {this.state.gameState}
				/>
				<div className="button-container">
					<ButtonToolbar>
						<Button bsStyle="primary" onClick={this.clear}>Clear</Button>
					</ButtonToolbar>
				</div>
				<div className="gameState-display">
				<GameState
				gameState = {this.state.gameState}
				grid = {this.state.grid}
				/>
				</div>

			</div>
		)
	}
}

const XorO = (props) => {
	if(props.boxState === 0) {
		return "";
	}
	else if(props.boxState === 1){
		return "O";
	}
	else if(props.boxState === -1){
		return "X";
	}	
}

class GameState extends React.Component {
	render(){
	let grid = this.props.grid;
	// Game Over
	// Check Horizontals and Verticals
	for(let i=0; i<3; i++) {
		var vert1 = 0;
		var hori1 = 0;
		var vert2 = 0;
		var hori2 = 0;

		for (let j=0; j<3; j++) {
			if (grid[i][j] === 1) {
				vert1++;
			}
			if (grid[i][j] === -1) {
				vert2++;
			}
			if (grid[j][i] === 1) {
				hori1++;
			}
			if (grid[j][i] === -1) {
				hori2++;
			}
		}
		if (vert1 === 3 || hori1 === 3) {
			return "Player 1 Wins";
		}

		else if (vert2 === 3 || hori2 === 3) {
			return "Player 2 Wins";
		}
	}
	// Check Diagonals
	var diag1 = 0;
	var revdiag1 = 0;
	var diag2 = 0;
	var revdiag2 = 0;
	for(let i=0; i<3; i++) {
		if (grid[i][i] === 1) {
			diag1++;
		}
		if (grid[i][i] === -1) {
			diag2++;
		}
	}
	for(let i=2, j=0; i>=0; i--, j++) {
		if (grid[i][j] === 1) {
			revdiag1++;
		}
		if (grid[i][j] === -1) {
			revdiag2++;
		}
	}
	if (diag1 === 3 || revdiag1 === 3) {
		return "Player 1 Wins";
	}

	if (diag2 === 3 || revdiag2 === 3) {
		return "Player 2 Wins";
	}
	if(this.props.gameState === 9) {
		return "It is a Tie, Press Clear to restart game!";
	}
		
	// Game still ongoing
	else {
		if(this.props.gameState % 2 === 0) {
			return "It is Player 1's Turn";
		}
		else {
			return "It is Player 2's Turn";
		}
	}
}
}

// Helper Functions

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr))
}

function createGrid(rows) {
	return Array(rows).fill(Array(rows).fill(0))
}

ReactDOM.render(<Main />, document.getElementById('root'));
