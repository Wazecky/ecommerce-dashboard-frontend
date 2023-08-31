import Header from './Header'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

function SearchProduct(key) {


    const [data, setData] = useState([]);

    // Fetch all products initially
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

    // Function to search for products by key
    async function search(key) {

        console.warn(key)
        let result = await fetch("http://localhost:8000/api/search/" + key);
        result = await result.json();
        console.warn(result);

        setData(result)
    }

    return (
        <div>
            <Header />
            <div className='col-sm-6 offset-sm-3'><br />

                <h1>Search Product</h1><br />
                <input type='text' onChange={(e) => search(e.target.value)} className='form-control' placeholder='Search Product' />
                <Table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Image</td>

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

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default SearchProduct