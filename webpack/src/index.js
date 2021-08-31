import React from 'react'
import {render} from 'react-dom'
import AppService from './models/app.servise'
import {config} from './models/config'
import App from './app'
import './css/index.css'
import './less/index.less'
import './scss/index.scss'
import './models/ts.module'

console.log('config: ', config.key)

const service = new AppService('Hello world')
service.log()


render(<App />, document.getElementById('app'))