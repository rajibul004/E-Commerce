import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Filter from './components/products/Filter'; // adjust the path if needed

const sampleCategories = [
  { categoryId: 1, categoryName: 'Electronics' },
  { categoryId: 2, categoryName: 'Fashion' },
  { categoryId: 3, categoryName: 'Books' },
];

const TestFilterPage = () => {
  return (
    <Router>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Filter Component Test</h1>
        <Filter categories={sampleCategories} />
      </div>
    </Router>
  );
};

export default TestFilterPage;
