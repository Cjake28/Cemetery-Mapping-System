import createUsersTable from './users.table.js';

const initTables = async () => {
  await createUsersTable();
};

export default initTables;
