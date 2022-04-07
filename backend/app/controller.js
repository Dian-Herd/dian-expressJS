const Product = require("./model");

const index = (req, res) => {
  const {search} = req.query;
  if(search){
    Product.find({name: {$regex: search, $options: "i"}})
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    Product.find()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const view = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  Product.create({ name, price, stock, status })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  Product.updateOne({ _id: id }, { $set: {name, price, stock, status } })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const destroy = (req, res) => {
  const { id } = req.params;
  Product.deleteOne({ _id: id })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  store,
  view,
  update,
  destroy
};
