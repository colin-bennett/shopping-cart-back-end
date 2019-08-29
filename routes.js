const express = require("express");
const router = express.Router();
const pool = require("./connection");
function getAllItems(req, res) {
  pool.query("select * from ShoppingCart order by id").then(result => {
    res.send(result.rows);
  });
}
router.get("/cart-items", getAllItems);

router.post("/cart-items", (req, res) => {
  pool
    .query(
      "insert into shoppingcart (product, price, quantity) values ($1::text, $2::money, $3::int)",
      [req.body.product, req.body.price, req.body.quantity]
    )
    .then(() => {
      getAllItems(req, res);
    });
});

router.put("/cart-items/:id", (req, res) => {
  pool
    .query("update shoppingcart set quantity=$1::int where id=$2::int", [
      req.body.quantity,
      req.params.id
    ])
    .then(() => {
      getAllItems(req, res);
    });
});

router.delete("/cart-items/:id", (req, res) => {
  pool
    .query("delete from shoppingcart where id=$1::int", [req.params.id])
    .then(() => {
      getAllItems(req, res);
    });
});
module.exports = router;
