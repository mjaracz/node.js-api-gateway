import {Router} from 'express';
const route = Router();

import {loginService} from './login.service'

route.post('/login', (req, res) => {
  loginService(req, res)
    .then((token: string) => {
      res
        .status(200)
        .send(token)
    })
    .catch(err => {
      err === 'invalid password'
        ? res
            .status(400)
            .send(err)
            .statusMessage = err
        : res
            .status(500)
            .statusMessage = err
    })
});

export default route;
