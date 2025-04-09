import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
import { calculateDiscount, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import useActive from '../hooks/useActive';
import cartContext from '../contexts/cart/cartContext';
import productsData from '../data/productsData';
import SectionsHead from '../components/common/SectionsHead';
import RelatedSlider from '../components/sliders/RelatedSlider';
import ProductSummary from '../components/product/ProductSummary';
import Services from '../components/common/Services';

const ProductDetails = () => {
    useDocTitle('Product Details');

    const { handleActive, activeClass } = useActive(0);
    const { addItem } = useContext(cartContext);
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [productCategory, setProductCategory] = useState(''); // <-- NEW STATE

    useEffect(() => {
        const fetchProduct = async () => {
            if (!isNaN(productId)) {
                const localProduct = productsData.find(item => item.id === parseInt(productId));
                if (localProduct) {
                    setProduct(localProduct);
                    setPreviewImg(localProduct.images?.[0] || '/placeholder.jpg');
                    setProductCategory(localProduct.category); // <-- Set category from local
                    return;
                }
            }

            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}`);
                if (!response.ok) throw new Error('Failed to fetch product');

                const data = await response.json();

                const formattedImages = data.imageUrls?.length
                    ? data.imageUrls.map(img =>
                        img.startsWith('/uploads') ? `http://localhost:5000${img}` : img
                    )
                    : [];

                setProduct({ ...data, formattedImages });
                setPreviewImg(formattedImages[0] || '/placeholder.jpg');

                // 🔹 Try to match category with static data if not provided
                if (data.category) {
                    setProductCategory(data.category);
                } else {
                    const match = productsData.find(p => p.title === data.title);
                    setProductCategory(match?.category || '');
                }

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) return <h2>Loading product details...</h2>;

    const { title, info, category, finalPrice, originalPrice, ratings, rateCount, formattedImages, images } = product;

    const productImages = formattedImages?.length ? formattedImages : images || [];
    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);
    const savedPrice = displayMoney(originalPrice - finalPrice);
    const savedDiscount = calculateDiscount(originalPrice - finalPrice, originalPrice);

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">

                        {/*=== Product Details Left-content ===*/}
                        <div className="prod_details_left_col">
                            <div className="prod_details_tabs">
                                {productImages.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`tabs_item ${activeClass(i)}`}
                                        onClick={() => setPreviewImg(img)}
                                    >
                                        <img src={img} alt="product-img" />
                                    </div>
                                ))}
                            </div>
                            <figure className="prod_details_img">
                                <img src={previewImg} alt="product-img" />
                            </figure>
                        </div>

                        {/*=== Product Details Right-content ===*/}
                        <div className="prod_details_right_col">
                            <h1 className="prod_details_title">{title}</h1>
                            <h4 className="prod_details_info">{info}</h4>

                            <div className="prod_details_ratings">
                                <span className="rating_star">
                                    {[...Array(rateCount || 0)].map((_, i) => <IoMdStar key={i} />)}
                                </span>
                                <span>|</span>
                                <Link to="*">{ratings} Ratings</Link>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {newPrice} &nbsp;
                                        <small className="del_price"><del>{oldPrice}</del></small>
                                    </h2>
                                    <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p>
                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                </div>

                                <div className="badge">
                                    <span><IoMdCheckmark /> In Stock</span>
                                </div>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_offers">
                                <h4>Offers and Discounts</h4>
                                <ul>
                                    <li>No Cost EMI on Credit Card</li>
                                    <li>Pay Later & Avail Cashback</li>
                                </ul>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_buy_btn">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => addItem(product)}
                                >
                                    Add to cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <ProductSummary {...product} />

            {/* ✅ Related Products based on static category */}
            <section id="related_products" className="section">
                <div className="container">
                    <SectionsHead heading="Related Products" />
                    <RelatedSlider category={productCategory} />
                </div>
            </section>

            <Services />
        </>
    );
};

export default ProductDetails;
