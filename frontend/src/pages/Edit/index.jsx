import Input from "../../components/Input";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(false);
  const [errorsName, setErrorName] = useState([]);
  const [errorsPrice, setErrorPrice] = useState([]);
  const [errorsStock, setErrorStock] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/${id}`
      );
      setName(response.data.name);
      setPrice(response.data.price);
      setStock(response.data.stock);
      setStatus(response.data.status);
    };
    getProductById();
  }, [id]);

  const editProduct = async (e) => {
    e.preventDefault();
    let messageName = [];
    let messagePrice = [];
    let messageStock = [];
    let valid = true;

    if(name.length === 0 || name.length < 3){
      messageName = [...messageName, "Nama tidak boleh kosong dan kurang dari 3 karakter"];
    }
    if(price.length === 0 || parseInt(price) < 1000){
      messagePrice = [...messagePrice, "Harga tidak boleh kosong dan kurang dari 1000"];
    }
    if(stock.length === 0){
      messageStock = [...messageStock, "Stock tidak boleh kosong"];
    }
    
    if(messageName.length !== 0){
      setErrorName(messageName);
      valid = false;
    }
    if(messagePrice.length !== 0){
      setErrorPrice(messagePrice);
      valid = false;
    }
    if(messageStock.length !== 0){
      setErrorStock(messageStock);
      valid = false;
    }

    if(valid){
      try {
        await axios.put(`http://localhost:3000/api/v1/products/${id}`, {
          name,
          price,
          stock,
          status,
        });
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={editProduct}>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            error={errorsName}
          />
          <Input
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            error={errorsPrice}
          />
          <Input
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            error={errorsStock}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            onChange={(e) => setStatus(e.target.checked)}
            checked={status}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
