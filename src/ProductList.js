import Header from './Header'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductList() {
    const [data, setData] = useState([]);

    // Function to fetch the list of products from the API
    const fetchData = async () => {
        try {
            let result = await fetch("http://localhost:8000/api/list");
            result = await result.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data, error");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // Function to delete a product by ID
    async function deleteOperation(id) {
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
            method: 'DELETE'
        });
        result = await result.json();
        console.warn(result);
        fetchData(); // Refresh the list after deletion
    }
    return (
        <div>
            <Header />
            <h1>List Of Products</h1>
            <div className="col-sm-8 offset-sm-2">
                <Table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Image</td>
                            <td>Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><img alt="" style={{ width: 100 }} src={"http://127.0.0.1:8000/" + item.file_path} /></td>
                                    <td><button className="delete" onClick={() => deleteOperation(item.id)}>Delete</button></td>
                                    <td>
                                        <Link to={"update/"+item.id}>
                                        <button className="update">Update</button>
                                        </Link>
                                        </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ProductList;