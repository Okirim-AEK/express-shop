//npm i express
//npm i body-parser
//npm i nodemon
//npm i mongoose;

import mongoose  from 'mongoose';
import app from './app.mjs';

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.xrwyw.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('database is connected'))
    .catch(err => console.log('database error: ' + err))
        
const port = process.env.PORT;
const server=app.listen(port, () => console.log(`app is running on port ${port}`))

process
  .on('unhandledRejection', (reason, p) => {
    server.close(()=>process.exit(1))
  })
//mongodb+srv://root:root@cluster0.xrwyw.mongodb.net/shop?retryWrites=true&w=majority
// "start": "nodemon server.mjs" //it can be executed by: npm start
//"dev":"" //it can be executed by: npm run dev
// http://127.0.0.1:port
// http://localhost:port