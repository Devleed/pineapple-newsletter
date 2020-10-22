const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// * configuring app
const app = express();

// * enabling cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, auth-token'
  );
  next();
});

// * setting view engine for database view
app.set('view engine', 'pug');

// * requiering models
const User = require('./models/User');

// * port declaration
const port = process.env.PORT || 5000;

// * server startup
app.listen(port, () => console.log(`listening on port ${port}`));

// * middlewares
app.use(express.json());

// * mongodb setup
mongoose
  .connect(
    'mongodb+srv://waleed:karachi12@cluster0.03o81.mongodb.net/users?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log('database connected'))
  .catch(e => console.log(`error => ${e}`));

// ! checking the environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// * test route
app.get('/', (req, res) => {
  res.json('workin');
});

// * ROUTES
app.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const provider = email.split('@')[1].replace('.com', '');

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) return res.status(403).send('email is required');
    else if (!emailRegex.test(email))
      return res.status(403).send('Please provide a valid email address');

    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(403).send('already subscribed with that email');

    const user = await new User({
      email,
      provider,
      date: Date.now()
    }).save();

    res.json(user);
  } catch (error) {
    res.status(500).send('internal server error');
  }
});

app.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await User.aggregate([
      {
        $group: {
          _id: '$provider',
          emails: {
            $push: '$email'
          }
        }
      }
    ]);

    res.render('databaseView', { subs: subscribers });
  } catch (error) {
    console.log(error);
    res.status(500).send('internal server error');
  }
});

app.get('/subscribers/:email', async (req, res) => {
  try {
    const user = await User.find({ email: req.params.email });

    if (!user) res.send('no user found');

    res.json(user);
  } catch (error) {
    res.status(500).send('internal server error');
  }
});

app.delete('/subscribers/:email', async (req, res) => {
  try {
    await User.deleteOne({ email: req.params.email });

    res.send('success');
  } catch (error) {
    res.status(500).send('internal server error');
  }
});
