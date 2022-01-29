'use strict'
let changeIdr = (salary) => {
  return salary.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
  });
};

module.exports = changeIdr;