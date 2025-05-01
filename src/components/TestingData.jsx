import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactSlider from 'react-slider'
import { useGetAllProductsBySubcatIdQuery, useGetAllSubCategoriesByCategoriesQuery } from '../services/poductsApi'
import Breadcrumb from './Breadcrumb'
import { useMemo } from 'react'

const ShopSection = () => {
    var {id}=useParams()
    var {isLoading: isLoadingProducts,data: productsData}=useGetAllProductsBySubcatIdQuery(id)
     const {
            isLoading: isLoadingCategories,
            data: categoriesData
          } = useGetAllSubCategoriesByCategoriesQuery();

    let [grid, setGrid] = useState(false)

    let [active, setActive] = useState(false)
    let sidebarController = () => {
        setActive(!active)
    }
    

    const brandsList = useMemo(() => {
            if (!productsData?.data) return [];
            const allBrands = productsData.data.map((item) => item.product_brand);
            const uniqueBrands = [...new Set(allBrands)];
            return uniqueBrands;
          }, [productsData]);

          if (isLoadingProducts || !productsData) {
            return <div>Loading...</div>
        }

    return (  
        <>
        <Breadcrumb details={productsData.details}/>
        <section className="shop py-80">
            <div className={`side-overlay ${active && "show"}`}></div>
            <div className="container container-lg">
                <div className="row">
                    {/* Sidebar Start */}
                    <div className="col-lg-3">
                        <div className={`shop-sidebar ${active && "active"}`}>
                            <button onClick={sidebarController}
                                type="button"
                                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                            >
                                <i className="ph ph-x" />
                            </button>
                            <div className="accordion" id="mainAccordion">
                                            {/* Main CATEGORIES Accordion Item */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingCategories">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="true" aria-controls="collapseCategories">
                                                        CATEGORIES
                                                    </button>
                                                </h2>
                                                <div id="collapseCategories" className="accordion-collapse collapse show" aria-labelledby="headingCategories" data-bs-parent="#mainAccordion">
                                                    <div className="accordion-body">
                                                        <div className="accordion" id="categoriesAccordion">
                                                            {!isLoadingCategories && categoriesData?.data?.map((cat) => (
                                                                <div className="accordion-item" key={cat.category_id}>
                                                                    <h2 className="accordion-header" id={`heading-${cat.category_id}`}>
                                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${cat.category_id}`} aria-expanded="false" aria-controls={`collapse-${cat.category_id}`}>
                                                                            {cat.category_name}
                                                                        </button>
                                                                    </h2>
                                                                    <div id={`collapse-${cat.category_id}`} className="accordion-collapse collapse" aria-labelledby={`heading-${cat.category_id}`} data-bs-parent="#categoriesAccordion">
                                                                        <div className="accordion-body">
                                                                            {cat.subcategories?.map((subcat) => (
                                                                                <div key={subcat.subcategory_id} className="mb-2">
                                                                                    <Link className={`subcategory-link ${String(subcat.subcategory_id) === id ? 'active' : ''}`} to={`/shop/${subcat.subcategory_id}`}>
                                                                                        {subcat.sub_category_name}
                                                                                    </Link>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            
                                        {/* Brands Section (optional - outside accordion) */}
                                        
                                        <div className="accordion" id="subAccordion">
                                            <div className="accordion-item" >
                                                <h5 className="accordion-header" id="headingBrands">
                                                    <button
                                                        className="accordion-button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseBrands"
                                                        aria-expanded="false"
                                                        aria-controls="collapseBrands"
                                                        type="button"
                                                    >
                                                        Brands
                                                    </button>
                                                </h5>
                                            
                                            <div id="collapseBrands" className="accordion-collapse collapse show" aria-labelledby="headingBrands" data-bs-parent="#subAccordion">
                                                <div className="card-body">
                                                    {brandsList.map((brand, idx) => (
                                                        <div key={idx} className="form-check mb-2">
                                                            <input type="checkbox" className="form-check-input" id={`brand-${idx}`} />
                                                            <label htmlFor={`brand-${idx}`} className="form-check-label">
                                                                {brand}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                            
                        </div>
                    </div>
                    {/* Sidebar End */}
                    {/* Content Start */}
                    <div className="col-lg-9">
                        {/* Top Start */}
                        <div className="flex-between gap-16 flex-wrap mb-40 ">
                            <span className="text-gray-900">Number of products {productsData?.data?.length}</span>
                            <div className="position-relative flex-align gap-16 flex-wrap">
                                <div className="list-grid-btns flex-align gap-16">
                                    <button onClick={() => setGrid(true)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${grid === true && "border-main-600 text-white bg-main-600"}`}
                                    >
                                        <i className="ph-bold ph-list-dashes" />
                                    </button>
                                    <button onClick={() => setGrid(false)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${grid === false && "border-main-600 text-white bg-main-600"}`}
                                    >
                                        <i className="ph ph-squares-four" />
                                    </button>
                                </div>
                                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                                    <label htmlFor="sorting" className="text-inherit flex-shrink-0">
                                        Sort by:{" "}
                                    </label>
                                    <select defaultValue={1}
                                        className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                                        id="sorting"
                                    >
                                        <option value={1} >
                                            Product
                                        </option>
                                        <option value={1} >
                                            Price(Low to High)
                                        </option>
                                        <option value={1}>Price(High to Low)</option>
                                        <option value={1}>Discount(High to Low)</option>
                                        <option value={1}>Name(A to Z)</option>
                                    </select>
                                </div>
                                <button onClick={sidebarController}
                                    type="button"
                                    className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                                >
                                    <i className="ph-bold ph-funnel" />
                                </button>
                            </div>
                        </div>
                        {/* Top End */}
                        <div className={`list-grid-wrapper ${grid && "list-view"}`}>
                        {
                        isLoadingProducts && <b>Loading...</b>
                    }
                   {
                      !isLoadingProducts &&
                      productsData.data.map((cat)=>{
                            return (
                            <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                <Link
                                    to="/product-details-two"
                                    className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                >
                                    <img
                                        src={`${cat.product_img_200}`}
                                        alt=""
                                        className="w-auto max-w-unset"
                                    />
                                    <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                        Upto {cat.discount_percentage}% off{" "}
                                    </span>
                                </Link>
                                <div className="product-card__content mt-16">
                                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                        <Link
                                            to="/product-details-two"
                                            className="link text-line-2"
                                            tabIndex={0}
                                        >
                                           {cat.product_name}
                                        </Link>
                                    </h6>
                                    
                                    <div className="product-card__price my-20">
                                        <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        ₹{cat.mrp}
                                        </span>
                                        <span className="text-heading text-md fw-semibold ">
                                        ₹{cat.sale_price} <span className="text-gray-500 fw-normal">/{cat.unit_value}{cat.unit_type}</span>{" "}
                                        </span>
                                    </div>
                                    <Link
                                        to="/cart"
                                        className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                                        tabIndex={0}
                                    >
                                        Add To Cart <i className="ph ph-shopping-cart" />
                                    </Link>
                                </div>
                            </div>
                            )
                        })
                    }
                            
                        </div>
                        
                    </div>
                    {/* Content End */}
                </div>
            </div>
        </section>
        </>
    )
}

export default ShopSection