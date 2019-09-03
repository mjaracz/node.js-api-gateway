import reqUserValidate from "../helpers/reqUserValidate";
import createToken from "../helpers/createToken";
import bcrypt from 'bcrypt';
import {User} from "../helpers/types";
import findUser from "../mongodb/findUser";

export const loginService = (req, res) => {
  const { body } = req;
  return new Promise((resolve, rejects) => {
    reqUserValidate(body)
      .then((userFromReq: User) => {
        findUser('users', userFromReq.username)
          .then((userFromDB: User) => {
            let token: string;
            const passwordCorrect = bcrypt.compareSync(userFromReq.password, userFromDB.password);
            if (passwordCorrect) resolve(createToken(userFromDB.username));
            else throw new Error('invalid password');
          })
      })
  });
};
