import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bankAccountsSchema = new Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    action: {
      values: ["cashWithdrawal", "cashDeposit", "mortgage"]
    },
    required: false,
    default: "cashWithdrawal"
  },
  cashWithdrawal:
  {
    action: "cashWithdrawal",
    quantity: Number,
    actionDate: new Date(),
    required: true,
  },
  cashDeposit:
  {
    action: "cashDeposit",
    quantity: Number,
    actionDate: new Date(),
    required: true,
  },
  mortgage:
  {
    action: "mortgage",
    type: Number,
    quantity: Number,
    actionDate: new Date(),
    numberOfPayments: Number,
    interest: Number,
    necessity: String,
    required: true,
  },

}, { timestamps: true });

const BankAccounts = mongoose.model('BankAccounts', bankAccountsSchema);

export default BankAccounts






// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// const bankAccountsSchema = new Schema({
//   objectId: {
//     type: String,
//     required: true,
//   },
//   accountNumber: {
//     type: Number,
//     required: true,
//   },
//   type: {
//     type: String,
//     action: {
//       values: ["cashWithdrawal", "cashDeposit", "mortgage"]
//     },
//     required: false,
//     default: "cashWithdrawal"
//   }, balance: {
//     type: Number,
//     default: function () {
//       if (this.type === "cashWithdrawal") {
//         return {
//           type: Number,
//           actionDate: new Date(),
//           required: false,
//         }
//       } else if (this.type === "cashDeposit") {
//         return {
//           type: Number,
//           quantity: Number,
//           actionDate: new Date(),
//           required: false,
//         }
//       } else if (this.type === "mortgage") {
//         return {
//           type: Number,
//           quantity: Number,
//           actionDate: Date,
//           numberOfPayments: Number,
//           interest: Number,
//           necessity: String,
//           required: false,
//         }
//       }
//     }
//   },

// }, { timestamps: true });

// const BankAccounts = mongoose.model('BankAccounts', bankAccountsSchema);

// export default BankAccounts 