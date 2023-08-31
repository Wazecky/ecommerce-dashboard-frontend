import Header from './Header'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function Addproduct() {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('product')) {
            navigate("/")
        }
    }, [])

    async function AddProduct() {
        console.warn(name, file, price, description)

        // Create a FormData object to send the data as multipart/form-data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('description', description);

        // Send a POST request to add the product
        let result = await fetch("http://localhost:8000/api/addproduct", {
            method: 'POST',
            body: formData
        });

        // Show an alert when the product is added successfully
        alert("Product has been added")
        navigate("/")
    }
    return (
        <div>
            <Header />
            <div className='col-sm-6 offset-sm-3'><br />
                <input type="text" className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    placeholder='name' /> <br />

                <input type="file" className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    placeholder='file' /> <br />

                <input type="text" className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='price' /> <br />

                <input type="text" className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='description' /> <br />

                <button onClick={AddProduct} className='btn btn-primary'>Add Product</button>
            </div>
        </div>
    )
}

export default Addproduct