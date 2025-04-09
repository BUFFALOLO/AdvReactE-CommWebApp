import React from "react";
import Home from "./components/Home";
import NavigationBar from "./components/NavBar";
import ProductsMenu from "./components/ProductsMenu";
import OrderProcessing from "./components/OrderProcessing";
import CustomerForm from "./components/CreateCustomerForm";
import UpdateCustomerForm from "./components/UpdateCustomerForm";
import ListAllCustomers from "./components/ListAllCustomers";
import ProductForm from "./components/CreateProductForm";
import UpdateProductForm from "./components/UpdateProductForm";
import ListAllProducts from "./components/ListAllProducts";
import NotFound from "./components/NotFound";
import CustomerDetails from "./components/CustomerDetails";
import { Route, Routes } from "react-router-dom";
import CustomersAndAccountsMenu from "./components/CustomersAndAccountsMenu";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/ProductsMenu/" element={<ProductsMenu />}/>
        <Route path="/OrderProcessing" element={<OrderProcessing />}/>
        <Route path="/CustomersAndAccountsMenu/" element={<CustomersAndAccountsMenu />}/>
        <Route path="/CreateCustomerForm" element={<CustomerForm />}/>
        <Route path="/UpdateCustomerForm/:id" element={<UpdateCustomerForm />}/>
        <Route path="/ListAllCustomers" element={<ListAllCustomers />}/>
        <Route path="/CreateProductForm" element={<ProductForm />}/>
        <Route path="/UpdateProductForm/:id" element={<UpdateProductForm />}/>
        <Route path="/ListAllProducts" element={<ListAllProducts/>}/>
        <Route path="/CustomerDetails/:id" element={<CustomerDetails />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App;
