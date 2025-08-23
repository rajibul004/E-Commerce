import api from "../../api/api";

// Fetch products with pagination info
export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.error(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
};

// Fetch categories
export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.error(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
        });
    }
};

// Add product
export const addProduct = (categoryId, productData, toast, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post(`/admin/categories/${categoryId}/product`, productData);
        dispatch({ type: "ADD_PRODUCT", payload: data });
        toast.success("Product added successfully");
        navigate("/admin/products");
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to add product");
    } finally {
        setLoader(false);
    }
};

// Add item to cart
export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
    const { products } = getState().products;
    const product = products.find((item) => item.productId === data.productId);

    if (product && product.quantity >= qty) {
        dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        toast.success(`${data.productName} added to the cart`);
    } else {
        toast.error("Out of stock");
    }
};

// Increase cart quantity
export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) => (dispatch, getState) => {
    const { products } = getState().products;
    const product = products.find((item) => item.productId === data.productId);

    if (product && product.quantity > currentQuantity) {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);
        dispatch({ type: "ADD_CART", payload: { ...data, quantity: newQuantity } });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
        toast.error("Quantity Reached to Limit");
    }
};

// Decrease cart quantity
export const decreaseCartQuantity = (data, newQuantity) => (dispatch, getState) => {
    dispatch({ type: "ADD_CART", payload: { ...data, quantity: newQuantity } });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

// Remove item from cart
export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: data });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    toast.success(`${data.productName} removed from cart`);
};

// Authenticate user sign-in
export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        dispatch({ type: "LOGIN_USER", payload: data });
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Login Success");
        navigate("/");
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
        setLoader(false);
    }
};

// Register new user
export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signup", sendData);
        toast.success(data?.message || "User Registered Successfully");
        reset();
        navigate("/login");
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
    } finally {
        setLoader(false);
    }
};

// Log out user
export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");
    navigate("/login");
};

// Add or update address
export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
        if (addressId) {
            await api.put(`/addresses/${addressId}`, sendData);
        } else {
            await api.post("/addresses", sendData);
        }
        dispatch(getUserAddresses());
        dispatch({ type: "IS_SUCCESS" });
        toast.success("Address saved successfully");
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({ type: "IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};

// Delete user address
export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        dispatch({ type: "IS_SUCCESS" });
        toast.success("Address deleted successfully");
    } catch (error) {
        console.error(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some Error Occurred",
        });
    } finally {
        setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress = () => ({
    type: "REMOVE_CHECKOUT_ADDRESS",
});

export const getUserAddresses = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get("/addresses");
        dispatch({ type: "USER_ADDRESS", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.error(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
        });
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    };
};

export const addPaymentMethod = (method) => ({
    type: "ADD_PAYMENT_METHOD",
    payload: method,
});

export const createUserCart = (sendCartItems) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post("/cart/create", sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.error(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
        });
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get("/carts/users/cart");
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId,
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.error(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
        });
    }
};

export const createStripePaymentSecret = (totalPrice) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.post("/order/stripe-client-secret", {
            amount: Number(totalPrice) * 100,
            currency: "usd",
        });
        dispatch({ type: "CLIENT_SECRET", payload: data });
        localStorage.setItem("client-secret", JSON.stringify(data));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.error(error);
    }
};

export const stripePaymentConfirmation = (sendData, setErrorMessage, setLoading, toast) => async (dispatch) => {
    try {
        setLoading(true);
        const { data } = await api.post("/order/users/payments/online", sendData);
        if (data) {
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("client-secret");
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
            dispatch({ type: "CLEAR_CART" });
            toast.success("Order Accepted");
        } else {
            setErrorMessage("Payment Failed");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage(error?.response?.data?.message || "Payment failed");
    } finally {
        setLoading(false);
    }
};
