import React, { FormEvent } from 'react'
import { useRef, useState } from 'react';
import Try from './Try';
import { TryInfo } from './types'; //.ts

const getNumbers = () => {
	const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const array = []
	for (let i = 0; i < 4; i += 1) {
		const { floor, random } = Math
		let mathLogic = floor(random() * (9 - i))
		const chosen = candidates.splice(mathLogic, 1)[0];

		array.push(chosen);
	}

	return array
};

const NumberBaseball = () => {
	const [answer, setAnswer] = useState(getNumbers());
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');
	const [tries, setTries] = useState<TryInfo[]>([]);
	const inputEl = useRef<HTMLInputElement | null>(null);

	//useCallback 사용시 매개변수에 [value, answer] 넣어주기
	const onSubmitForm = (e: FormEvent) => {
		e.preventDefault();
		const input = inputEl.current;
		if (value === answer.join('')) {
			setTries((t) => ([
				...t,
				{
					try: value,
					result: '홈런!',
				},
			]));
			setResult('홈런!');
			alert('게임을 다시 실행합니다.');
			setValue('');
			setAnswer(getNumbers());
			setTries([]);
			if (input) {
				input.focus();
			}
		} else {
			const answerArray = value.split('').map(v => parseInt(v))
			let strike = 0
			let ball = 0
			if (tries.length >= 9) {
				setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
				alert('게임을 다시 시작합니다.');
				setValue('');
				setAnswer(getNumbers());
				setTries([]);
				if (input) {
					input.focus();
				}
			} else {
				console.log('답은', answer.join(''));
				for (let i = 0; i < 4; i += 1) {
					if (answerArray[i] === answer[i]) {
						console.log('strike', answerArray[i], answer[i]);
						strike += 1;
					} else if (answer.includes(answerArray[i])) {
						console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
						ball += 1;
					}
				}
				setTries(t => ([
					...t,
					{
						try: value,
						result: `${strike} 스트라이크, ${ball} 볼입니다.`,
					},
				]));
				setValue('');
				if (input) {
					input.focus();
				}
			}
		}
	};

	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={onSubmitForm}>
				<input
					ref={inputEl}
					maxLength={4}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button>build!</button>
			</form>
			<div>try this: {tries.length}</div>
			<ul>
				{tries.map((v, i) => (
					<Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
				))}
			</ul>
		</>
	)
};

export default NumberBaseball;
