const Sequelize = require('sequelize')
const dbCreds = require('./dbCreds')

const database = 'pizza_luvrs'
const host = 'pizza-db.cjhrzby6fvs5.us-east-1.rds.amazonaws.com'

async function pizzaDb(){
  let dbCredsVal  =  JSON.parse(await dbCreds.getCredentials());
  let username = dbCredsVal.username;
  let password = dbCredsVal.password;
  console.log(`USERNAME: ${username}`);
  let pgClient = new Sequelize(
    database,
    username,  
    password,
    {
      host: host,
      dialect: 'postgres'
    }
  )
  let Pizza = pgClient.define('pizza', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    toppings: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.BIGINT
    }
  })
  Pizza.initialize = async () => {
    console.log('in Pizza.initialize')
    return Pizza.sync({ force: true }).then(() => {
      console.log('postgres connection ready')
    }).catch(err => console.error(err))
  }
  
  return Pizza
        
}

module.exports = { pizzaDb }


