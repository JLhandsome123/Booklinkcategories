const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const categoryController = require('./controllers/categoryController');

// Set up multer storage and file handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded images in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique file names
    }
});

const upload = multer({ storage: storage });

// Set up view engine
app.set('view engine', 'ejs');

// Enable static files and form processing middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));  // Serve uploaded images

// Define routes
app.get('/', categoryController.getCategories);
app.get('/category/:id', categoryController.getCategory);
app.get('/addCategory', categoryController.addCategoryForm);
app.post('/addCategory', upload.single('categoryImage'), categoryController.addCategory);  // Handle image upload
app.get('/editCategory/:id', categoryController.editCategoryForm);
app.post('/editCategory/:id', upload.single('categoryImage'), categoryController.editCategory);  // Handle image upload
app.get('/deleteCategory/:id', categoryController.deleteCategory);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
