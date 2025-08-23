// src/redux/reducers/productReducer.js
const initialState = {
  products: [], // Use array to avoid map errors
  categories: [], // Use array for safety
  pagination: {
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    lastPage: false,
  },
  loading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        pagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
        loading: false,
        error: null,
      };
    case 'FETCH_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload], // Append new product
        loading: false,
        error: null,
      };
    case 'IS_FETCHING':
    case 'CATEGORY_LOADER':
      return { ...state, loading: true, error: null };
    case 'IS_SUCCESS':
      return { ...state, loading: false, error: null };
    case 'IS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};