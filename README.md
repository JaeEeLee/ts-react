## typescript 강의 학습용 repository

### 초기 세팅
1. npm init
2. npm i typescript
3. npm i react react-dom
4. npm i webpack webpack-cli -D
5. npm i awesome-typescript-loader -D    대신에 npm i ts-loader --save-dev 가능
6. npm i @types/react @types/react-dom

### 코드 수정 후 저장시 매번 새로고침을 해줘야하는데 이를 저장할때마다 로딩되게 해주는 webpack-dev-server 설치하기
**설치 안하면 npx webpack 사용**
1. npm i -D webpack-dev-server
2. package.json 에서 scripts: .. dev: "webpack serve --env development --hot"
> 이건 webpack-cli@4버전. 3 버전은 "webpack-dev-server --hot"
3. webpack.config.js 에서 아래와 같이 작성
```javascript
output: {
		filename: 'app.js',
		path: path.join(__dirname, 'dist')
	},
devServer: {
	port: 8080,
	publicPath: '/dist/', // 이 부분 넣어주고 dist폴더 제거(다시 빌드 되게)
	hot: true
}
```
4. npm run dev 로 실행

***
