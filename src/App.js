import logo from './logo.svg';
import './App.css';
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import Protected from './Protected';
import ProductList from './ProductList'
import SearchProduct from './SearchProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*<h1>E-commerce Dashboard Project</h1>*/}
        <Routes>
           {/* Define routes using the Routes component */}
          <Route path="/login"
            element={<Login />} />
          <Route path="/register"
            element={<Register />} />
          <Route path="/add" element={<Protected Cmp={AddProduct} />} />
          <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} />} />
          <Route path="/" element={<Protected Cmp={ProductList} />} />
          <Route path="/search" element={<Protected Cmp={SearchProduct} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
