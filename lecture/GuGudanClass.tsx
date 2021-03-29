// import * as React from 'react' //이건 typescript 문법!!
import React, { useRef, Fragment, useState, FormEvent, Component, InputHTMLAttributes, ChangeEvent } from 'react'

// interface IState {
interface State {
	first: number,
	second: number,
	value: string,
	result: string
}

class GuGuDanClass extends Component<{}, State> {
	state = {
		first: Math.ceil(Math.random() * 9),
		second: Math.ceil(Math.random() * 9),
		value: '',
		result: ''
	}

	onSubmitForm = (e: FormEvent<HTMLFormElement>): void => { //HTML 부분은 생략하기도함
		e.preventDefault()
		let { value, first, second } = this.state
		if (parseInt(value) === first * second) {
			this.setState((prevState) => {
				return {
					result: 'answer: ' + prevState.value,
					first: Math.ceil(Math.random() * 9),
					second: Math.ceil(Math.random() * 9),
					value: ''
				}
			})
			if(this.input) 
				this.input.focus()
		} else {
			this.setState({
				result: 'wrong',
				value: ''
			})
			if(this.input) 
				this.input.focus()
		}
	}

	onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		this.setState({ value: e.target.value })
	}

	input: HTMLInputElement | null = null; // type 을 union 을 사용해서 맞춰준다 (ex) null)

	onRefInput = (c: HTMLInputElement) => {
		this.input = c
	}

	render() {
		const { first, second, value, result } = this.state

		return (
			<Fragment>
				<div>{first} 곱하기 {second}는?</div>
				<form onSubmit={this.onSubmitForm}>
					<input
						ref={this.onRefInput}
						type='number'
						value={value}
						onChange={this.onChange}
					/>
				</form>
				<div>{result}</div>
			</Fragment>
		)
	}

}

export default GuGuDanClass