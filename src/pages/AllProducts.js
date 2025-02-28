import React, { useContext } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import filtersContext from '../contexts/filters/filtersContext';
import EmptyView from '../components/common/EmptyView';



const AllProducts = () => {
    useDocTitle('All Products');

    // Get `allProducts` from filtersContext
    const { allProducts } = useContext(filtersContext);

    return (
        <>
            <section id="all_products" className="section">
                {/* Filter Bar */}
                <FilterBar />

                <div className="container">
                    {allProducts && allProducts.length > 0 ? (
                        <div className="wrapper products_wrapper">
                            {allProducts.map((item) => (
                                <ProductCard key={item.id} {...item} />
                            ))}
                        </div>
                    ) : (
                        <EmptyView
                            icon={<BsExclamationCircle />}
                            msg="No Results Found"
                        />
                    )}
                </div>
            </section>

            {/* Additional Services Section */}
            <Services />
        </>
    );
};

export default AllProducts;
