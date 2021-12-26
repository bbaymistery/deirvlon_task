import "./global.scss";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./components/Home/Home";
import Sidebarrr from "./components/SideBar/SideBar";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Modal from "./components/Modal/Modal";
import CArtItems from "./components/CartItems(Sebet)/CArtItems";
import AlertMessage from "./components/AlertMessage/AlertMessage";
//components

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebarrr />
        <Header />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          {/* mehsullar olan cartItems olan yerdi hansiki carta ekliyoruz */}
          <Route path="/mehsullar" element={<CArtItems />} />
        </Routes>
      </BrowserRouter>
      <Modal />
      <AlertMessage />
    </div>
  );
}

export default App;
