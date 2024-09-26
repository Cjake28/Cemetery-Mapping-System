import {app} from './app.js';
import initTables from './schema/index.js';

initTables().then(() => {
  app.listen(9220, () => {
    console.log('Server listening on port 9220');
  });
}).catch(err => {
  console.error('Failed to create tables', err);
});
