import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './index.scss';

const Detail = () => {
  const { id } = useParams();
  const [productById, setProductById] = useState([]);

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
      setProductById(response.data);
    }
    getProductById();
  }, [id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{productById._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{productById.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{productById.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>{productById.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;