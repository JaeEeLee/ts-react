import * as React from 'react'
import * as ReactDom from 'react-dom'
import { hot } from 'react-hot-loader/root'


import WordRelay from './WordRelay'

const Hot = hot(WordRelay) // HOC

ReactDom.render(<Hot />, document.querySelector('#root'))


/**
 * 구구단
 * import GuGuDan from './GuGudan'
 * ReactDom.render(<GuGuDan/>, document.querySelector('#root'))
 */