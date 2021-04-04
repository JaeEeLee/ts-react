import React, { Fragment, useCallback, useRef, useState } from 'react'

/**
 * 
 * jaeee의 자체 코드 리팩토링
 */
const ResponseCheck = () => {
	const [state, setState] = useState('waiting')
	const [message, setMessage] = useState('클릭해서 시작하세요.')
	const [result, setResult] = useState<number[]>([])
	// const timeout = useRef<number>(null) // timeout.current 에서 error 발생
	const timeout = useRef<number | null>(null) //중요~~ 제너릭 힌트를 보자아  T | null 을 하나의 타입이라고 생각하자
	const startTime = useRef(0)
	const endTime = useRef(0)

	const onClickScreen = () => {
		let date: number = new Date().getTime()

		if (state === 'waiting') {
			const { floor, random } = Math
			let timeset: number = floor(random() * 1000) + 2000

			timeout.current = window.setTimeout(() => {
				setState('now');
				setMessage('지금 클릭');

				startTime.current = date
			}, timeset) // 2초~3초 랜덤

			setState('ready');
			setMessage('초록색이 되면 클릭하세요.');
		}
		if (state === 'ready') { // 성급하게 클릭
			clearTimeout(timeout.current!);//window 가 없으면 timeout의 타입 에러 nodejs 꺼라서!
			setState('waiting');
			setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
		}
		if (state === 'now') { // 반응속도 체크
			endTime.current = date
			setState('waiting');
			setMessage('클릭해서 시작하세요.');
			setResult(prevResult => {
				return [...prevResult, endTime.current - startTime.current];
			})
		}
	}
	
	//매개변수 안잡혀서 타이핑 불필요
	const onReset = useCallback(() => {
		setResult([]);
	}, [])

	const renderAverage = () => {
		return result.length !== 0 &&
			<Fragment>
				<div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
				<button onClick={onReset}>리셋</button>
			</Fragment>
	};

	return (
		<Fragment>
			<div
				id="screen"
				className={state}
				onClick={onClickScreen} >
				{message}
			</div>
			{renderAverage()}
		</Fragment>
	)
}

export default ResponseCheck

/** 강의에서의 코드
import * as React from 'react';
import { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = () => {
	if (state === 'waiting') {
	  timeout.current = window.setTimeout(() => {
		setState('now');
		setMessage('지금 클릭');
		startTime.current = new Date().getTime();
	  }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
	  setState('ready');
	  setMessage('초록색이 되면 클릭하세요.');
	} else if (state === 'ready') { // 성급하게 클릭
	  clearTimeout(timeout.current!);
	  setState('waiting');
	  setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
	} else if (state === 'now') { // 반응속도 체크
	  endTime.current = new Date().getTime();
	  setState('waiting');
	  setMessage('클릭해서 시작하세요.');
	  setResult((prevResult) => {
		return [...prevResult, endTime.current - startTime.current];
	  });
	}
  };
  const onReset = () => {
	setResult([]);
  };

  const renderAverage = () => {
	return result.length === 0
	  ? null
	  : <>
		<div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
		<button onClick={onReset}>리셋</button>
	  </>
  };

  return (
	<>
	  <div
		id="screen"
		className={state}
		onClick={onClickScreen}
	  >
		{message}
	  </div>
	  {renderAverage()}
	</>
  );
};

export default ResponseCheck;
*/