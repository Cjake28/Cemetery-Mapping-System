import {app} from './app.js';
import initTables from './schema/index.js';

initTables().then(() => {
  app.listen(process.env.PORT || 9220, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to create tables', err);
});
