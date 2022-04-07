import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.scss';

const Home = () => {
  const [products, setProduct] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getProduct(keyword);
  }, [keyword]);
  
  const getProduct = async (keyword) => {
    if(keyword){
      const response = await axios.get(`http://localhost:3000/api/v1/products?search=${keyword}`);
      setProduct(response.data);
    } else {
      const response = await axios.get("http://localhost:3000/api/v1/products");
      setProduct(response.data);
    }
  };

  const deleteProduct = async (id) => {
    try {
      if(window.confirm("Yakin mau dihapus ?")){
        await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
        getProduct();
      } else {
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input  onChange={(e) => setKeyword(e.target.value)}  type="text" placeholder="Masukan kata kunci berdasarkan nama..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td className="text-right">{product.price}</td>
              <td className="text-center">
                <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                <Link to="#" onClick={() => deleteProduct(product._id)} className="btn btn-sm btn-danger">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;