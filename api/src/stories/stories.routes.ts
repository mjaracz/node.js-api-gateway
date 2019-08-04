import sendMessageToQueue from '../rabbitMQ/sendMessageToQueue';
import findById from '../mongodb/findById';
import findAll from '../mongodb/findAll';
import {
  asyncHandler,
  responseOf,
  asString,
  asObject,
  sanitize,
  asNumber
} from '@restless/restless';
import deleteOne from '../mongodb/deleteOne';

import {Router} from 'express';
const route = Router();

route.get('/stories/all', async (req, res) => {
  await findAll('documents')
    .then(data => res.json(data))
    .catch(err => {
      res.statusMessage = "Internal Server Error";
      res.sendStatus(500);
    })
});

route.get('/story/:id', async (req, res) => {
  await findById('documents', Number(req.params.id))
    .then(data => res.json(data))
    .catch(err => {
      res.statusMessage = 'ID without Rang';
      res.sendStatus(400);
    });
});

route.post('/story/new', asyncHandler(
  sanitize({
    body: asObject({
      id: asNumber,
      username: asString,
      title: asString,
      body: asString
    })
  }),
   reqData => {
   sendMessageToQueue('new.json.stories', reqData);
   return responseOf(reqData)
  }
));

route.put('/story/update/:id', asyncHandler(
  sanitize({
    id: asNumber,
    body: asObject({
      username: asString,
      title: asString,
      body: asString
    })
  }),
  reqData => {
    sendMessageToQueue('update.json.stories', reqData);
    return responseOf(reqData)
  }
));

route.delete(`/story/delete/:id`, async (req, res) => {
  await deleteOne('documents', Number(req.params.id))
    .then(data => res.json(data))
    .catch(err => {
      res.statusMessage = "Internal Server Error";
      res.sendStatus(500);
    });

});

export default route;
