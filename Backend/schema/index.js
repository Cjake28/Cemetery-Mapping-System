import createUsersTable from './users.table.js';
import createGravesiteTable from './gravesite.table.js';

const initTables = async () => {
  await createUsersTable();
  await createGravesiteTable();
};

export default initTables;
