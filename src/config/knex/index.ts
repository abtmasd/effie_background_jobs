const knexfile = require("./knexfile");
const knexPostgre = require("knex")(knexfile['rds_aurora_pg']);
export { knexPostgre };
