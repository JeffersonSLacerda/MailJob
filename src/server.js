import 'dotenv/config'
import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

import Queue from './app/lib/Queue';
import UserController from './app/controllers/UserController';

const app = express();

const serverAdapter = new ExpressAdapter();
app.use(express.json());

createBullBoard({
  queues: Queue.queues.map(queue => new BullAdapter((queue.bull))),
  serverAdapter
});

app.post('/users', UserController.store);
serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
})