import { getConnection } from '../../data_base/data_base';



//--------------------------------------GET ALL ACTIONS----------------------------------

async function getActions(req, res, next) {
    const accountNumber = req.params.accountNumber

    const result = await getActionsHandler(accountNumber)
    if (!result) throw new Error("Data not found!")
    console.log(accountNumber)
    return res.status(200).json(result);
}

async function getActionsHandler(accountNumber) {
    const query = getActionsQuery();
    const [result] = await getConnection().execute(query, [accountNumber]);
    console.log(result)
    console.log("******************ACTIONS FATCHED FROM DB**********************")
    return result;
}

const getActionsQuery = () => {
    //     return `SELECT 
    //     actions.id as action_id,
    //     account_number,
    //     deposit_sum,
    //     deposit_date,
    //     withdrawal_sum,
    //     withdrawal_date,
    //     hypothec_sum,
    //     commission,
    //     payments,
    //     hypothec_date
    // FROM
    //     bank_accounts.actions
    //         LEFT JOIN
    //     bank_accounts.accounts ON bank_accounts.accounts.id = bank_accounts.actions.account_id
    //         LEFT JOIN
    //     bank_accounts.deposit ON bank_accounts.deposit.id = bank_accounts.actions.deposit_id
    //         LEFT JOIN
    //     bank_accounts.hypothec ON bank_accounts.hypothec.id = bank_accounts.actions.hypothec_id
    //         LEFT JOIN
    //     bank_accounts.withdrawal ON bank_accounts.withdrawal.id = bank_accounts.actions.withdrawal_id
    // WHERE (account_number = ?)`;

    return `SELECT 
actions.id as action_id,
account_number,
deposit_sum,
deposit_date,
withdrawal_sum,
withdrawal_date,
hypothec_sum,
commission,
payments,
hypothec_date
FROM
bank_accounts.actions
    LEFT JOIN
bank_accounts.accounts ON bank_accounts.accounts.account_number = bank_accounts.actions.action_account_number
    LEFT JOIN
bank_accounts.deposit ON bank_accounts.deposit.id = bank_accounts.actions.deposit_id
    LEFT JOIN
bank_accounts.hypothec ON bank_accounts.hypothec.id = bank_accounts.actions.hypothec_id
    LEFT JOIN
bank_accounts.withdrawal ON bank_accounts.withdrawal.id = bank_accounts.actions.withdrawal_id
WHERE (account_number = ?)`
};

//------------------------------------ POST ACTION-------------------------------------------------

async function postAction(req, res) {
    console.log(req.body)
    const { action_id, account_number, deposit_sum, withdrawal_sum, hypothec_sum, commission, payments } = req.body

    if (deposit_sum || account_number) {
        const results = await postDepositHandler(action_id, deposit_sum);
        const results2 = await postDepositActionHandler(account_number, action_id);

        res.json({ message: "DEPOSIT ACTION ADDET TO DB", products: results });

    } else if (account_number || withdrawal_sum) {
        const results = await postWithdrawalHandler(action_id, withdrawal_sum);
        const results2 = await postWithdrawalActionHandler(account_number, action_id);


        res.json({ message: "WITHDRAWAL ACTION ADDET TO DB", products: results });

    } else if (account_number || hypothec_sum || commission || payments) {
        const results = await postHypothecHandler(action_id, hypothec_sum, commission, payments);
        const results2 = await postHypothecActionHandler(account_number, action_id);


        res.json({ message: "HYPOTHEC ACTION ADDET TO DB", products: results });
    }
}

//---

async function postDepositHandler(action_id, deposit_sum) {
    const query = postDepositQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [action_id, deposit_sum]);
    console.log("******************DEPOSIT ADDET TO DB**********************")
    return result;
}

const postDepositQuery = () => {
    return `INSERT INTO bank_accounts.deposit (id, deposit_sum) VALUES (?,?);
    `;
};

//---

async function postHypothecHandler(action_id, hypothec_sum, commission, payments) {
    const query = postHypothecQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [action_id, hypothec_sum, commission, payments]);
    console.log("******************HYPOTHEC ADDET TO DB**********************")
    return result;
}

const postHypothecQuery = () => {
    return `INSERT INTO bank_accounts.hypothec (id, hypothec_sum, commission, payments) VALUES (?, ?, ?, ?);
    `;
};

//---

async function postWithdrawalHandler(action_id, withdrawal_sum) {
    const query = postWithdrawalQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [action_id, withdrawal_sum]);
    console.log("******************WITHDRAWAL ADDET TO DB**********************")
    return result;
}

const postWithdrawalQuery = () => {
    return `INSERT INTO bank_accounts.withdrawal (id, withdrawal_sum) VALUES (?, ?);
    `;
};







//********* */

async function postDepositActionHandler(account_number, action_id) {
    const query = postDepositActionQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [account_number, action_id]);
    console.log("******************DEPOSIT ADDET TO DB**********************")
    return result;
}

const postDepositActionQuery = () => {
    return `INSERT INTO bank_accounts.actions (action_account_number, deposit_id) VALUES (?,?);
    `;
};



//********* */



async function postHypothecActionHandler(account_number, action_id) {
    const query = postHypothecActionQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [account_number, action_id]);
    console.log("******************DEPOSIT ADDET TO DB**********************")
    return result;
}

const postHypothecActionQuery = () => {
    return `INSERT INTO bank_accounts.actions (action_account_number, withdrawal_id) VALUES (?,?);
    `;
};


//********* */



async function postWithdrawalActionHandler(account_number, action_id) {
    const query = postWithdrawalActionQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [account_number, action_id]);
    console.log("******************DEPOSIT ADDET TO DB**********************")
    return result;
}

const postWithdrawalActionQuery = () => {
    return `INSERT INTO bank_accounts.actions (action_account_number, hypothec_id) VALUES (?,?);
    `;
};




export {
    getActions,
    postAction,
}