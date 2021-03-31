import React, { ChangeEvent, FormEvent, Fragment, useCallback, useReducer, useRef, useState } from 'react'

const WordRelay = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [word, setWord] = useState('제로초')
	const [value, setValue] = useState('')
	const [result, setResult] = useState('')

	const onSubmitForm = useCallback<(e: FormEvent) =>  void>((e) => {
		e.preventDefault()
		const input = inputRef.current
		if(word[word.length -1] === value[0]) {
			setResult('right')
			setWord(value)
			setValue('')
			input && input.focus()
		} else {
			setResult('wrong')
			setValue('')
			input && input.focus()
		}
		/**
		 * useCallback 이니까 value를 넣어준다. 그래야지만 rerendering이 된다
		 * 또한 useCallback 안에서 쓰이는 state 값들을 모두 [쬬기]에 써줘야한다!!
		 */
		//
	}, [word, value]) //[쬬기]

	//제네릭 안쓴거
	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}, [])

	// const onChange = useCallback<(e: ChangeEvent<HTMLInputElement>) => void> ((e) => {
	// 	setValue(e.currentTarget.value)
	// }, [])

	return (
		<Fragment>
			<div>{word}</div>
			<form onSubmit={onSubmitForm}>
				<input
					ref={inputRef}
					value={value}
					onChange={onChange}
				/>
				<button>enter</button>
			</form>
			<div>{result}</div>
		</Fragment>
	)
}

export default WordRelay