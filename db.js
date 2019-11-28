const mariadb = require('mariadb/callback');

function execQuery(query) {
  const conn = mariadb.createConnection({
       host: 'localhost', 
       user:'user_projeto_PBD', 
       password: 'admin',
      database: 'LADI',
       connectionLimit: 5
  });
  return new Promise((res, rej) => {
    conn.connect(err => {
      if(err){
        conn.end();
        return rej(err);
      }
      conn.query(query, (err, data) => {
        if(err){
          conn.end();
          return rej(err);
        }
        conn.end();
        return res(data);
      });
    });
  });
}

module.exports = { execQuery };
