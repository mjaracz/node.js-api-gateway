import {Story} from './types';
const reqStoryValidate = (body: Story) => {
  const condition = (
    typeof body.id === 'number' &&
    typeof body.username === 'string' &&
    typeof body.title === 'string' &&
    typeof body.body ==='string'
  );
  return new Promise((resolve, rejects) => {
    if(condition) resolve(body);
    else rejects('Invalid request body.')
  })
};

export default reqStoryValidate;
