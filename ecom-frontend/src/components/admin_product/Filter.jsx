import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch, FiPlus } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    // Filter states
    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    // Dialog states
    const [openDialog, setOpenDialog] = useState(false);
    const [productName, setProductName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [specialPrice, setSpecialPrice] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = prevOrder === "asc" ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        });
    };

    const handleClearFilters = () => {
        navigate({ pathname: window.location.pathname });
    };

    const handleAddProductSubmit = async () => {
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("image", imageFile);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("discount", discount);
        formData.append("specialPrice", specialPrice);

        {/* Add Your API endpoint here */}
        try {
            const response = await fetch("https://yourapi.com/api/products", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert("Product added successfully!");
                setOpenDialog(false);
                // Reset fields
                setProductName("");
                setImageFile(null);
                setDescription("");
                setQuantity("");
                setPrice("");
                setDiscount("");
                setSpecialPrice("");
            } else {
                alert("Failed to add product.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <>
            <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
                {/* SEARCH BAR */}
                <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                    <input
                        type="text"
                        placeholder="Search Products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                    />
                    <FiSearch className="absolute left-3 text-slate-800" size={20} />
                </div>

                {/* FILTER TOOLS */}
                <div className="flex sm:flex-row flex-col gap-4 items-center">
                    <FormControl variant="outlined" size="small">
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                            className="min-w-[120px] text-slate-800"
                        >
                            <MenuItem value="all">All</MenuItem>
                            {categories.map((item) => (
                                <MenuItem key={item.categoryId} value={item.categoryName}>
                                    {item.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Tooltip title={`Sorted by price: ${sortOrder}`}>
                        <Button
                            variant="contained"
                            onClick={toggleSortOrder}
                            color="primary"
                            className="flex items-center gap-2 h-10"
                        >
                            Sort By
                            {sortOrder === "asc" ? <FiArrowUp size={20} /> : <FiArrowDown size={20} />}
                        </Button>
                    </Tooltip>

                    <button
                        className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                        onClick={handleClearFilters}
                    >
                        <FiRefreshCw className="font-semibold" size={16} />
                        <span className="font-semibold">Clear Filter</span>
                    </button>

                    <button
                        className="flex items-center gap-2 bg-green-700 text-white px-3 py-2 rounded-md shadow-md"
                        onClick={() => setOpenDialog(true)}
                    >
                        <FiPlus size={18} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* PRODUCT DIALOG FORM */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent className="mt-4">
                    <div className="flex flex-col gap-4 w-full min-h-[300px]">
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <Button variant="outlined" component="label">
                            Upload Image
                            <input type="file" hidden onChange={(e) => setImageFile(e.target.files[0])} />
                        </Button>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <TextField
                                label="Quantity"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <TextField
                                label="Price"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextField
                                label="Discount (%)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            <TextField
                                label="Special Price"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={specialPrice}
                                onChange={(e) => setSpecialPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProductSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Filter;
