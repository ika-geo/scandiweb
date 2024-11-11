import {HashRouter, Routes, Route} from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import {Component} from "react";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Routes>
                    <Route element={<Header/>}>
                        <Route path="/" element={<CategoryPage/>} exact />
                        <Route path='/categories/:categoryName' element={<CategoryPage/>}/>
                        <Route path="/product/:productId" element={<ProductPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        );
    }
}

export default App;
