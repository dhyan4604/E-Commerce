const filtersReducer = (state, action) => {
    switch (action.type) {
      case 'LOAD_ALL_PRODUCTS':
        return {
          ...state,
          allProducts: action.payload.products,
          selectedPrice: {
            ...state.selectedPrice,
            price: action.payload.maxPrice,
            minPrice: action.payload.minPrice,
            maxPrice: action.payload.maxPrice,
          },
        };
  
      case 'SET_SORTED_VALUE':
        return { ...state, sortedValue: action.payload.sortValue };
  
      case 'CHECK_BRANDS_MENU':
        return {
          ...state,
          updatedBrandsMenu: state.updatedBrandsMenu.map(item =>
            item.id === action.payload.id ? { ...item, checked: !item.checked } : item
          ),
        };
  
      case 'CHECK_CATEGORY_MENU':
        return {
          ...state,
          updatedCategoryMenu: state.updatedCategoryMenu.map(item =>
            item.id === action.payload.id ? { ...item, checked: !item.checked } : item
          ),
        };
  
      case 'HANDLE_PRICE':
        return {
          ...state,
          selectedPrice: {
            ...state.selectedPrice,
            price: Number(action.payload.value),
          },
        };
  
      case 'MOB_SORT_VISIBILITY':
        return {
          ...state,
          mobFilterBar: { ...state.mobFilterBar, isMobSortVisible: action.payload.toggle },
        };
  
      case 'MOB_FILTER_VISIBILITY':
        return {
          ...state,
          mobFilterBar: { ...state.mobFilterBar, isMobFilterVisible: action.payload.toggle },
        };
  
      case 'CLEAR_FILTERS':
        return {
          ...state,
          sortedValue: null,
          updatedBrandsMenu: state.updatedBrandsMenu.map(item => ({ ...item, checked: false })),
          updatedCategoryMenu: state.updatedCategoryMenu.map(item => ({ ...item, checked: false })),
          selectedPrice: {
            ...state.selectedPrice,
            price: state.selectedPrice.maxPrice,
          },
        };
  
      case 'APPLY_FILTERS':
        let updatedProducts = [...state.allProducts];
  
        if (state.sortedValue) {
          switch (state.sortedValue) {
            case 'Price(Lowest First)':
              updatedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
              break;
            case 'Price(Highest First)':
              updatedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
              break;
            case 'Featured':
              updatedProducts = updatedProducts.filter(p => p.tag === 'featured-product');
              break;
            case 'Top Rated':
              updatedProducts = updatedProducts.filter(p => p.rateCount > 4);
              break;
            case 'Latest':
              updatedProducts = updatedProducts.slice(-6);
              break;
          }
        }
  
        const selectedBrands = state.updatedBrandsMenu.filter(b => b.checked).map(b => b.label.toLowerCase());
        if (selectedBrands.length) {
          updatedProducts = updatedProducts.filter(p => selectedBrands.includes(p.brand.toLowerCase()));
        }
  
        const selectedCategories = state.updatedCategoryMenu.filter(c => c.checked).map(c => c.label.toLowerCase());
        if (selectedCategories.length) {
          updatedProducts = updatedProducts.filter(p => selectedCategories.includes(p.category.toLowerCase()));
        }
  
        updatedProducts = updatedProducts.filter(p => p.finalPrice <= state.selectedPrice.price);
  
        return { ...state, filteredProducts: updatedProducts };
  
      default:
        return state;
    }
  };
  
  export default filtersReducer;
  