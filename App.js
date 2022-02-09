const fs = require("fs");
const moment = require("moment");

function separate(data, arr) {
  for (i = 0; i < data.length; i++) {
    var x = data[i].startDate;
    var date = new Date();
    var key = x.split("-")[1] * 1;
    if (arr[key] === undefined) {
      arr[key] = 0;
    }
    arr[key] = arr[key] + data[i].amount;
  }
}

fs.readFile("1-input.json", (err, data) => {
  if (err) console.log(err);
  const user = JSON.parse(data);
  var revenue = {},
    expense = {};
  separate(user.revenueData, revenue);
  separate(user.expenseData, expense);
  year = user.expenseData[0].startDate.split("-")[0];
  var balance = [];

  for (i = 1; i < 12; i++) {
    if (expense[i] == undefined && revenue[i] == undefined) continue;
    if (expense[i] == undefined) expense[i] = 0;
    if (revenue[i] == undefined) revenue[i] = 0;

    var firstDay = new Date(year, i - 1, 2, -18, -30, 00, 00);

    var obj = { amount: revenue[i] - expense[i], startDate: firstDay };

    balance.push(obj);
  }

  for (i in balance) console.log(balance[i]);
});
