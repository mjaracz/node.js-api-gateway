import sendMessageToQueue from '../rabbitMQ/sendMessageToQueue';
import findById from '../mongodb/findById';
import findAll from '../mongodb/findAll';
import deleteOne from '../mongodb/deleteOne';
import reqStoryValidate from '../helpers/reqStoryValidate';

import {Router} from 'express';
const route = Router();

route.get('/stories/all', (req, res) => {
  findAll('documents')
    .then(data => res.json(data))
    .catch(err => {
      res.statusMessage = err.message + 'Internal Server Error';
      res.sendStatus(500);
    })
});

route.get('/story/:id', (req, res) => {
  findById('documents', Number(req.params.id))
    .then(data => res.json(data))
    .catch(err => {
      res.statusMessage = 'ID without Rang';
      res.sendStatus(400);
    });
});

route.post('/story/new', (req, res) => {
  const { body } = req;
  reqStoryValidate(body)
    .then(story => {
      sendMessageToQueue('post_stories', story);
      res.json(story);
    })
    .catch((errorMessage: string) => {
      res
        .status(400)
        .send(errorMessage)
        .statusMessage = errorMessage;
    })
});

route.put('/story/update/:id', (req, res) => {
  const { body } = req;
  reqStoryValidate(body)
    .then(story => {
      sendMessageToQueue('post_stories', story);
      res.json(story);
    })
    .catch((errorMessage: string) => {
      res
        .status(400)
        .send(errorMessage)
        .statusMessage = errorMessage;
    })
});

route.delete(`/story/delete/:id`, (req, res) => {
  deleteOne('documents', Number(req.params.id))
    .then(data => res.json(data))
    .catch(err => {
      res
        .status(500)
        .statusMessage = err.message + 'Internal Server Error';
    });
});

export default route;
