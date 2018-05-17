import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import path from 'path'

const app = express(apiRoot, api)

var Express = require('express');
app.use('/', Express.static(path.join(__dirname+ '../../../client/dist/AngularApp/')));
app.use('*',function(req,res){
     res.sendFile(path.join(__dirname + '../../../client/dist/AngularApp/index.html'));
});

const server = http.createServer(app)

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
