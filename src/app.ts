import 'dotenv/config'
import express from 'express';
import routes from './routes';
import emailQueue from './routes/email';
import queryQueue from './routes/query';
import emailEscritorio from './routes/email/Escritorio';
const app = express()
app.disable('x-powered-by');

//Caso necessário adicione cors();

import * as jobs from './bull/registerJobs'

const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use('/effie/email', emailQueue);
app.use('/effie/query', queryQueue);
app.use('/effie/escritorio', emailEscritorio);

//Bull Dashboard
const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: jobs.default.queues.map(queue => new BullAdapter(queue.bull)),
  serverAdapter: serverAdapter
});

serverAdapter.setBasePath('/admin/dashboard');
app.use('/admin/dashboard', serverAdapter.getRouter());

import connect from "./config/mongo";
connect();

//START BULL ENQUEUE JOBS
import Queue from './bull/registerJobs';
Queue.process();


export default app;

