import Api from './services/api'
import express from 'express'

const app = express()
const api = new Api(app)
api.start()
