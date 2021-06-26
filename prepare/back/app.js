const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');

const app = express();

db.sequelize.sync()
    .then(() => {
        console.log('🌈  DB Connected 🌈')
    })
    .catch(console.error);

app.get('/', (req, res) => {
    res.send('Hello express')    
})

app.use('post', postRouter);

app.listen(3065, () => console.log(`🌈 Server is running`));


// app.use('/post', postRouter);

// post가 prefix로 붙는다.