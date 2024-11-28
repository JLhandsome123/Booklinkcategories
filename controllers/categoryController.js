const db = require('../db');

// Display list of categories
exports.getCategories = (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error retrieving categories:', error);
            return res.status(500).render('error', { message: 'Failed to retrieve categories' });
        }
        res.render('index', { categories: results });
    });
};

// Display individual category
exports.getCategory = (req, res) => {
    const categoryId = req.params.id;
    const sql = 'SELECT * FROM categories WHERE categoryId = ?';
    db.query(sql, [categoryId], (error, results) => {
        if (error) {
            console.error('Error retrieving category by ID:', error);
            return res.status(500).render('error', { message: 'Failed to retrieve category' });
        }
        results.length
            ? res.render('category', { category: results[0] })
            : res.status(404).render('error', { message: 'Category not found' });
    });
};

// Display form to add new category
exports.addCategoryForm = (req, res) => {
    res.render('addCategory');
};

// Add new category
exports.addCategory = (req, res) => {
    const { categoryName, categoryDescription } = req.body;

    // Ensure values are provided
    if (!categoryName || !categoryDescription) {
        return res.status(400).render('error', { message: 'Category name and description are required' });
    }

    const sql = 'INSERT INTO categories (categoryName, categoryDescription) VALUES (?, ?)';
    db.query(sql, [categoryName, categoryDescription], (error) => {
        if (error) {
            console.error('Error adding category:', error);
            return res.status(500).render('error', { message: 'Failed to add category' });
        }
        res.redirect('/');
    });
};

// Display form to edit category
exports.editCategoryForm = (req, res) => {
    const categoryId = req.params.id;
    const sql = 'SELECT * FROM categories WHERE categoryId = ?';
    db.query(sql, [categoryId], (error, results) => {
        if (error) {
            console.error('Error retrieving category:', error);
            return res.status(500).render('error', { message: 'Failed to retrieve category' });
        }
        results.length
            ? res.render('editCategory', { category: results[0] })
            : res.status(404).render('error', { message: 'Category not found' });
    });
};

// Edit category
exports.editCategory = (req, res) => {
    const categoryId = req.params.id;
    const { categoryName, categoryDescription } = req.body;

    // Ensure values are provided
    if (!categoryName || !categoryDescription) {
        return res.status(400).render('error', { message: 'Category name and description are required' });
    }

    const sql = 'UPDATE categories SET categoryName = ?, categoryDescription = ? WHERE categoryId = ?';
    db.query(sql, [categoryName, categoryDescription, categoryId], (error) => {
        if (error) {
            console.error('Error updating category:', error);
            return res.status(500).render('error', { message: 'Failed to update category' });
        }
        res.redirect('/');
    });
};

// Delete category
exports.deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    const sql = 'DELETE FROM categories WHERE categoryId = ?';
    db.query(sql, [categoryId], (error) => {
        if (error) {
            console.error('Error deleting category:', error);
            return res.status(500).render('error', { message: 'Failed to delete category' });
        }
        res.redirect('/');
    });
};
