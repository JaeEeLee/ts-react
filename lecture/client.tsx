import * as React from 'react'
import * as ReactDom from 'react-dom'
import { hot } from 'react-hot-loader/root'


 import Rsp from './Rsp'
 const Hot = hot(Rsp) // HOC


ReactDom.render(<Hot />, document.querySelector('#root'))



/**
 * 가위바위보
 * import Rsp from './Rsp'
 * const Hot = hot(Rsp) // HOC
 * ReactDom.render(<Hot />, document.querySelector('#root'))
 */


/**
 * 속도 측정 게임
 * import ResponseCheck from './ResponseCheck'
 * const Hot = hot(ResponseCheck) // HOC
 * ReactDom.render(<Hot />, document.querySelector('#root'))
 */


/**
 * 야구게임
 * import NumberBaseball from './NumberBaseball'
 * const Hot = hot(NumberBaseball) // HOC
 * ReactDom.render(<Hot />, document.querySelector('#root'))
 */

/**
 * 끝말잇기
 * import WordRelay from './WordRelay'
 * const Hot = hot(WordRelay) // HOC
 * ReactDom.render(<Hot />, document.querySelector('#root'))
 */

/**
 * 구구단
 * import GuGuDan from './GuGudan'
 * ReactDom.render(<GuGuDan/>, document.querySelector('#root'))
 */