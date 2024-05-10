const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize-config');
const DataModel = require('./DataModel');
const AccountModel = require('./AccountModel');
const LeaderModel = require('./LeaderModel');
const MemberModel = require('./MemberModel');
const EventModel = require('./EventModel');
const SettleModel = require('./SettleModel');
const { where } = require('sequelize');
// require('./Leader');
// require('./Member');
// require('./Event');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
// Sync the Sequelize model with the database
sequelize.sync().then


(() => {
  console.log('Database synchronized');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

app.post('/api/register', async (req, res) => {
  try {
    // Extract data from the POST request
    const { accbal, password, username } = req.body;

    // Create a new record in the Data table
    const newData = await DataModel.create({ accbal, password, username });

    console.log('Data saved to database:', newData);
    res.json({ success: true, message: 'Registered successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.json({ err: true, error: 'username already exists!' });
  }
});

app.post('/api/login', async (req, res) => {
  const { password, username } = req.body;
  try {
    const user = await DataModel.findOne({ where: { username, password } });
    if (!user) {
      res.json({ success: false, message: 'Invalid username or password' });
    } else {
      // If authentication succeeds, return success
      res.json({ success: true, message: 'Login successfully' });
    }
  }
  catch (error) {
    console.error('error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.get('/api/getUsers/:userName', async (req, res) => {
  const uName = req.params.userName;
  try {
    const user = await DataModel.findOne({ where: { username: uName } });
    if (!user) {
      res.json({ error: 'User not found' });
    } else {
      console.log(user);
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/getHistory/:history', async (req, res) => {
  const name = req.params.history;
  try {
    const hist = await AccountModel.findAll({ where: { name: name } });
    if (!hist) {
      res.json({ error: 'User not found' });
    } else {
      console.log(hist);
      res.json(hist);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/creditdebit', async (req, res) => {
  try {
    // Extract data from the POST request
    const { description, name, type, amount, date, bal } = req.body;
    // Create a new record in the Data table
    const newData = await AccountModel.create({ name, description, amount, type, date, bal });

    try {
      const rowsUpdated = await DataModel.update(
        { accbal: bal },
        { where: { username: name } }
      );
      console.log(`Updated ${rowsUpdated} rows`);
    } catch (error) {
      console.error('Error updating user:', error);
    }

    console.log('Data saved to database:', newData);
    res.json({ success: true, message: 'signup completed' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/getAccounts', async (req, res) => {
  try {
    const users = await DataModel.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});



app.post('/api/createevent/:gname', async (req, res) => {
  try {
    const gname = req.params.gname;
    let a = [];
    a = req.body;
    const newData = await LeaderModel.create({ leader: a[0].username, eventname: gname });

    try {
      for (let i = 0; i < a.length; i++) {
        const memb = await MemberModel.create({ members: a[i].username, expenses: 0, leaderid: newData.id });
        console.log("data saved");
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
    console.log('Data saved to database:', newData);
    res.json(newData);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getevents/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const getevents = await MemberModel.findAll({
      where: { members: name }, include: [
        {
          model: LeaderModel,
          attributes: ['id', 'leader', 'eventname']
        }
      ]
    });
    res.json(getevents);
  } catch (error) {
    console.error('Error fetching', error);
    throw error;
  }
});


app.get('/api/geteventdetails/:id', async (req, res) => {
  try {
    const iyd = req.params.id;
    const eventdetails = await EventModel.findAll({ where: { leaderid: iyd } });
    console.log(eventdetails);
    res.json(eventdetails);
  } catch (error) {
    console.error('Error fetching', error);
    throw error;
  }
});

app.post('/api/posteventdetails/:gid', async (req, res) => {
  try {
    const lid = req.params.gid;
    const { username, description, amount } = req.body;
    const data = await EventModel.create({ username: username, description: description, amount: amount, leaderid: lid });
    res.json({ success: true, message: "expense added" })
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/getmembers/:gid/:name', async (req, res) => {
  try {
    const gid = req.params.gid;
    const name = req.params.name;
    console.log(gid + '' + "" + name);
    const expenses = await MemberModel.findAll({ where: { leaderid: gid } });
    res.json(expenses);
  } catch (error) {
    console.log(error);
  }
});
app.post('/api/eventdebit', async (req, res) => {
  try {
    // Extract data from the POST request
    const { description, name, type, amount, date, bal } = req.body;
    // Create a new record in the Data table
    const newData = await AccountModel.create({ name, description, amount, type, date, bal });

    try {
      const rowsUpdated = await DataModel.update(
        { accbal: bal },
        { where: { username: name } }
      );
      console.log(`Updated ${rowsUpdated} rows`);
    } catch (error) {
      console.error('Error updating user:', error);
    }
    // try {
    //   const exUpdated = await MemberModel.update(
    //     { expenses:amount },
    //     { where: { members: name } }
    //   );
    //   console.log(`Updated ${rowsUpdated} rows`);
    // } catch (error) {
    //   console.error('Error updating user:', error);
    // }

    console.log('Data saved to database:', newData);
    res.json({ success: true, message: 'completed' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/postsettle/:desc/:amount/:name', async (req, res) => {
  try {
    const desc = req.params.desc;
    const amount = req.params.amount;
    const name = req.params.name;
    let a = [];
    a = req.body;
    for (let i = 0; i < a.length; i++) {
      const newData = await SettleModel.create({ member: a[i].members, leaderid: a[i].leaderid, description: desc, amount: amount, payfor: name });
    }
    res.json({ success: true, message: "success equal" });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/postsettleue/:gid', async (req, res) => {
  try {
    let gid = req.params.gid;
    let a = [];
    a = req.body;
    for (let i = 0; i < a.length; i++) {
      const newData = await SettleModel.create({ member: a[i].member, leaderid: gid, description: a[i].description, amount: a[i].amount, payfor: a[i].payfor });
    }
    res.json({ success: true, message: "success" });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getsettlements/:id/:name', async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.params.name;

    const settlements = await SettleModel.findAll({ where: { leaderid: id, member: name } });
    res.json(settlements);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/api/deletesettle/:id', async (req, res) => {
  try {
    const id = req.params.id;
   

    const settlements = await SettleModel.destroy({ where: {id:id} });
    res.json({success:true,message:"settlement finished"});
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/getuserexpense/:gid/:name', async (req, res) => {
  try {
    const gid = req.params.gid;
    const name = req.params.name;

    const expenses = await EventModel.findAll({ where: { leaderid: gid,username:name} });
    res.json(expenses);
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/geteventexpense/:gid', async (req, res) => {
  try {
    const gid = req.params.gid;
    

    const expenses = await EventModel.findAll({ where: { leaderid: gid}});
    res.json(expenses);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});