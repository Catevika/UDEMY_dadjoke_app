import React, { Component } from 'react';
import axios from 'axios';

import './Joke.css';

class Joke extends Component {
	static defaultProps = {
		numJokes: 10,
		emojis: ['😫', '😞', '😃', '😂', '🤣']
	};

	constructor(props) {
		super(props);

		this.state = {
			jokeList: [],
			voteCount: 0,
			joke: '',
			isLoaded: false
		};

		this.voteCountUp = this.voteCountUp.bind(this);
		this.voteCountDown = this.voteCountDown.bind(this);
	}

	voteCountUp() {
		return this.setState({
			voteCount: this.state.voteCount + 1
		});
	}

	voteCountDown() {
		return this.setState({
			voteCount: this.state.voteCount - 1
		});
	}

	emojiDisplay() {
		if (this.state.voteCount < -15) {
			return this.props.emojis[0];
		} else if (this.state.voteCount < -5) {
			return this.props.emojis[1];
		} else if (this.state.voteCount < 5) {
			return this.props.emojis[2];
		} else if (this.state.voteCount < 15) {
			return this.props.emojis[3];
		} else {
			return this.props.emojis[4];
		}
	}

	async componentDidMount() {
		let jokes = [];
		while (jokes.length < this.props.numJokes) {
			let response = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' }
			});
			jokes.push(response.data.joke);
		}
		this.setState({
			jokes: jokes,
			isLoaded: true
		});
	}

	render() {
		return (
			<div className='Joke'>
				{this.state.isLoaded ? (
					<div className='Joke-likes'>
						<i
							className='fas fa-long-arrow-alt-down'
							onClick={this.voteCountDown}
						/>
						<span className='Joke-counter'>{this.state.voteCount}</span>
						<i
							className='fas fa-long-arrow-alt-up'
							onClick={this.voteCountUp}
						/>
						<p className='Joke-text'>{this.state.jokes}</p>
						<p className='Joke-emoji'>{this.emojiDisplay()}</p>
					</div>
				) : (
					<div className='loader'>
						<div className='dot dot1' />
						<div className='dot dot2' />
						<div className='dot dot3' />
						<div className='dot dot4' />
					</div>
				)}
				<hr />
			</div>
		);
	}
}

export default Joke;
