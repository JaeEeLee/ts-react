import React, { ChangeEvent, Component, createRef, FormEvent, Fragment, useCallback, useReducer, useRef, useState } from 'react'

interface State {
	word: string,
	value: string,
	result: string
}

class WordRelay extends Component<{}, State> {
	state = {
		word: '제로초',
		value: '',
		result: ''
	}

	onSubmitForm = (e: FormEvent) => {
		e.preventDefault()

		const input = this.onRefInput.current // typeB
		// const input = this.input // typeA
		let { word, value } = this.state

		let isCorrect = word[word.length - 1] === value[0]

		if (isCorrect) {
			this.setState({
				result: 'right',
				word: value,
				value: '',
			})
		} else {
			this.setState({
				result: 'wrong',
				value: '',
			})
		}

		input && input.focus()
	}


	onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			value: e.currentTarget.value
		})
	}

	/**
	 * creatRef를 쓴 경우 : typeB
	 * createRef<제네리이익>()
	 * hooks 와 마찬가지로 type 추론을 제네릭으로 해주면 된다.
	 */
	onRefInput = createRef<HTMLInputElement>() //typeB

	/**
	 * createRef를 쓰지않은 경우 : typeA
		// ??왜 여기다가 하는거징..
		  input: HTMLInputElement | null = null
	
		onRefInput = (c: HTMLInputElement) => {
			this.input = c
		}
	*/

	render() {
		let { word, value, result } = this.state
		let { onSubmitForm, onRefInput, onChangeInput } = this

		return (
			<Fragment>
				<div>{word}</div>
				<form onSubmit={onSubmitForm}>
					<input
						ref={onRefInput}
						value={value}
						onChange={onChangeInput}
					/>
					<button>enter</button>
				</form>
				<div>{result}</div>
			</Fragment>
		)
	}
}

export default WordRelay