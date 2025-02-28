import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';
import { ToastContainer } from 'react-toastify';





const App = () => {
  return (
    <>
     <ToastContainer />
      <CommonProvider>
        <FiltersProvider>
          <CartProvider>
           
            <Header />
            <RouterRoutes />
            <AdminRoutes />
            <Footer />
            <BackTop />
          
          </CartProvider>
        </FiltersProvider>
      
      </CommonProvider>
    </>
  );
};

export default App;
