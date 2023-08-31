import Header from "./Header";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState({});
    const [updatedData, setUpdatedData] = useState({
        name: '',
        price: '',
        description: '',
        file: null,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch the product data for the specified id
                const result = await fetch(`http://localhost:8000/api/product/${id}`);
                const productData = await result.json();
                setData(productData);
                setUpdatedData(productData); // Set initial data in form
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setUpdatedData({
            ...updatedData,
            file: event.target.files[0],
        });
    };

    const handleUpdate = async () => {
        console.log("Updating product...");
        const formData = new FormData();
        formData.append('name', updatedData.name);
        formData.append('price', updatedData.price);
        formData.append('description', updatedData.description);
        if (updatedData.file) {
            formData.append('file', updatedData.file);
        }

        try {

            // Send a PUT request to update the product data
            const response = await fetch(`http://localhost:8000/api/update/${id}`, {
                method: 'PUT', // Use PUT method here
                body: formData,
            });
            const result = await response.json();
            console.log(result); // Handle response accordingly

            // Show if the product was updated successfully
            if (response.ok) {
                alert("Product updated successfully");
                // Optionally, navigate to another page after successful update
                navigate('/');
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            <Header />
            <h1>Update Product Page</h1>
            <input type="text" name="name" value={updatedData.name} onChange={handleInputChange} /> <br /><br />
            <input type="text" name="price" value={updatedData.price} onChange={handleInputChange} /> <br /><br />
            <input type="text" name="description" value={updatedData.description} onChange={handleInputChange} /> <br /><br />
            <input type="file" name="file" onChange={handleFileChange} /> <br /><br />
            <img alt="" style={{ width: 100 }} src={"http://localhost:8000/" + data.file_path} /> <br /><br />
            <button onClick={handleUpdate}>Update Product</button>
        </div>
    );
}

export default UpdateProduct;
