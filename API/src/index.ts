import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import BankAccounts from './models/data';
import cors from "cors";

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://Ruslan-test:1234@ruslan-test.odepovq.mongodb.net/?retryWrites=true&w=majority";

app.use(cors({
  origin: "*",
}))

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
app.get('/add-data', (req, res) => {
  const data = new BankAccounts({
    accountNumber: Math.floor(Math.random() * 9999),
    actions: [

      {
        action: "cashWithdrawal",
        quantity: 1000,
      },
      {
        action: "cashDeposit",
        quantity: Math.floor(Math.random() * 9999),
      },
      {
        action: "mortgage",
        quantity: Math.floor(Math.random() * 9999),
        numberOfPayments: 6,
        interest: 5.8,
        necessity: "need food",
      }
    ]

  })

  data.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/post-action', (req, res) => {
  console.log(req.body)
  const payload = req.body
  const data = new BankAccounts({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  data.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/get-all', (req, res) => {
  BankAccounts.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});



app.get('/get-single', (req, res) => {
  BankAccounts.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/get-single/:id', (req, res) => {
  const id = req.params
  BankAccounts.findById(id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});









// app.get('/post-action', (req, res) => {
//   console.log(req.body)
//   const payload = req.body
//   const data = new BankAccounts({
//     objectId: Math.floor(Math.random() * 9999),
//     accountNumber: Math.floor(Math.random() * 9999),
//     action: {
//       values: "cashWithdrawal"
//     },
//     balance: {
//       quantity: 400,
//     }
//   })