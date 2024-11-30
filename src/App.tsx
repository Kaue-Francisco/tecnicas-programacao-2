import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Client from "./pages/Client/Client";
import Listing from "./pages/Listing/Listing";
import Hosting from "./pages/Hosting/Hosting";
import RegisterClient from "./pages/Client/RegisterClient/RegisterClient";
import EditClient from "./pages/Client/EditClient/EditClient";
import DeleteClient from "./pages/Client/DeleteClient/DeleteCliente";
import AllTitular from "./pages/Listing/AllTitular/Alltitular";
import TitularDependente from "./pages/Listing/TitularDependente/TitularDependente";
import DependenteTitular from "./pages/Listing/DependenteTitular/DependenteTitular";
import ListHotel from "./pages/Hosting/ListHotel/ListHotel";
import Hospedagem from "./pages/Hosting/Hospedagem/Hospedagem";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/alltitular" element={<AllTitular />} />
        <Route path="/listing/dependenteTitular" element={<TitularDependente />} />
        <Route path="/listing/titularDependente" element={<DependenteTitular />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/hosting/list" element={<ListHotel />} />
        <Route path="/hosting/hospedagem" element={<Hospedagem />} />
        <Route path="/clients/register" element={<RegisterClient />} />
        <Route path="/clients/edit" element={<EditClient />} />
        <Route path="/clients/delete" element={<DeleteClient />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;