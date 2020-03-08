/** @format */

import * as React from 'react'
import app from './app.scss'
import image from '../assets/image/test.png'

console.log('image', image)

class App extends React.Component {
    public render() {
        return <div className={app.app}>Hello React</div>
    }
}

export default App
