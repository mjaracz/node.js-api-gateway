import {User} from "./types";
const reqUserValidate = (body: User) => {
  const condition = typeof body.username === 'string' && typeof body.password === 'string';
  return new Promise((resolve, reject) => {
    if(condition) resolve(body);
    else reject('Invalid request body.');
  });
};
export default reqUserValidate;
