import React, { useEffect, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import EmptyView from '../components/common/EmptyView';
import data from '../data/productsData';

const AllProducts = () => {
    useDocTitle('All Products');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) throw new Error("Failed to fetch products");

                const apiData = await response.json();

                // ✅ Ensure Image URL is Formatted Correctly
                const formattedApiData = apiData.map(product => ({
                    ...product,
                    imageUrl: product.imageUrls && product.imageUrls.length > 0 
                        ? (product.imageUrls[0].startsWith("/uploads") 
                            ? `http://localhost:5000${product.imageUrls[0]}` 
                            : product.imageUrls[0]) 
                        : '/placeholder.jpg' // Default image for missing images
                }));

                // ✅ Combine Static & Dynamic Products
                setProducts([...data, ...formattedApiData]);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([...data]); // Load local data if API fails
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <section id="all_products" className="section">
                {/* Filter Bar */}
                <FilterBar />

                <div className="container">
                    {loading ? (
                        <h2>Loading Products...</h2>
                    ) : products.length > 0 ? (
                        <div className="wrapper products_wrapper">
                            {products.map((item) => (
                                <ProductCard key={item._id || item.id} {...item} />
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
