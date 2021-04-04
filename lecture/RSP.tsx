import React, { useEffect, useRef, useState } from 'react'

const rspCoords = {
	바위: '0',
	가위: '-142px',
	보: '-284px'
} as const // readonly

const scores = {
	가위: 1,
	바위: 0,
	보: -1,
} as const // readonly

type ImgCoords = typeof rspCoords[keyof typeof rspCoords]
// type ImgCoords = '0' | '-142px' | '-284px' // 위에와 같음 but 중복때문에 안함


const computerChoice = (imgCoords: ImgCoords) => {
	// return (Object.keys(rspCoords)).find((k) => { // 강제 형변환 필요 Object.keys 때문에(제네릭 지원 ㄴ)
	return (Object.keys(rspCoords) as ['바위', '가위', '보']).find((k) => {
		return rspCoords[k] === imgCoords;
	})!
	// }) 타입스크립트의 한계!! '바위', '가위', '보' | undefined 도 나오기때문에 이를 막아주기위해 뒤에 느낌표
}

const RSP = () => {
	const [result, setResult] = useState('');
	// const [imgCoord, setImgCoord] = useState(rspCoords.바위);// useState err
	const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.바위);
	const [score, setScore] = useState(0);
	const interval = useRef<number>();
	const clicked = useRef<boolean>(false);

	useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
		console.log('다시 실행');
		interval.current = window.setInterval(changeHand, 100) // node.js or window 
		return () => { // componentWillUnmount 역할
			console.log('종료');
			clearInterval(interval.current);
		}
	}, [imgCoord]);

	const changeHand = () => {
		if (imgCoord === rspCoords.바위) {
			setImgCoord(rspCoords.가위) // useState에 제네릭을 붙여줘서 타입추론이 가능하게 해준다
		} else if (imgCoord === rspCoords.가위) {
			setImgCoord(rspCoords.보) // useState에 제네릭을 붙여줘서 타입추론이 가능하게 해준다
		} else if (imgCoord === rspCoords.보) {
			setImgCoord(rspCoords.바위) // useState에 제네릭을 붙여줘서 타입추론이 가능하게 해준다
		}
	};

	const onClickBtn = (choice: keyof typeof rspCoords) => () => {
		if (!clicked.current) {
			clearInterval(interval.current);
			clicked.current = true;
			const myScore = scores[choice];
			const cpuScore = scores[computerChoice(imgCoord)];
			const diff = myScore - cpuScore;
			if (diff === 0) {
				setResult('비겼습니다!');
			} else if ([-1, 2].includes(diff)) {
				setResult('이겼습니다!');
				setScore((prevScore) => prevScore + 1);
			} else {
				setResult('졌습니다!');
				setScore((prevScore) => prevScore - 1);
			}
			setTimeout(() => {
				interval.current = window.setInterval(changeHand, 100);
				clicked.current = false;
			}, 1000);
		}
	}

	return (
		<>
			<div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
			<div>
				<button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
				<button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
				<button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
			</div>
			<div>{result}</div>
			<div>현재 {score}점</div>
		</>
	);
}

export default RSP;