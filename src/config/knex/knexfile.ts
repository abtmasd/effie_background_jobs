import { Knex } from "knex";

// Update with your config settings on production.env or development.env.
const rds_aurora_pg: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.RDS_AURORA_HOST,
    user: "postgres",
    password: process.env.RDS_AURORA_PASS,
    port: 55432,
    database: process.env.RDS_AURORA_DB,
  },
  pool: {
    min: 1,
    max: 10,
    /*
	  afterCreate: function (conn: any, done: any) {
      // in this example we use pg driver's connection API
      conn.query('SET TIMEZONE="America/Belem";', function (err:any) {
        if (err) {
          // first query failed, return error and don't try to make next query
          console.log("APP --> Postgres ❌");
          done(err, conn);
        } else {
          console.log("APP --> Postgres ✔️");
          // do the second query...
          conn.query("SELECT NOW()::timestamp;", function (err:any, result:any) {
            // if err is not falsy, connection is discarded from pool
            // if connection aquire was triggered by a query the error is passed to query promise
            done(err, conn);
          });
        }
      });
    },
    */
  },
  /*options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },*/
  useNullAsDefault: true,
};

export { rds_aurora_pg };
