const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const subjectsRouter = require("./routes/subjects");
const academicRouter = require("./routes/academic");
const campusRouter = require("./routes/campus");
const postsRouter = require("./routes/posts");
const eventsRouter = require("./routes/events");

// Initialize Express app FIRST
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory user storage (for development - use a database in production)
let users = [];

// JWT secret (use a strong secret in production)
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}

// Helper function to validate college email
function isValidCollegeEmail(email) {
    // Add your college domain here
    const collegeDomains = [
        '@thapar.edu',
        '@student.thapar.edu',
        // Add other valid college domains
    ];
    
    return collegeDomains.some(domain => email.endsWith(domain));
}

// AUTH ROUTES (after app is initialized)

// REGISTER endpoint
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({ 
                error: 'Name, email and password are required' 
            });
        }
        
        // Check if it's a valid college email
        if (!isValidCollegeEmail(email)) {
            return res.status(400).json({ 
                error: 'Please use your college email ID' 
            });
        }
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ 
                error: 'User already exists with this email' 
            });
        }
        
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create user
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };
        
        users.push(newUser);
        
        // Generate JWT token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, name: newUser.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// LOGIN endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }
        
        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ 
                error: 'Invalid email or password' 
            });
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                error: 'Invalid email or password' 
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user profile (protected route)
app.get('/api/auth/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Profile retrieved successfully',
        user: req.user
    });
});

// Get all users (for testing - remove in production)
app.get('/api/auth/users', (req, res) => {
    const safeUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    }));
    res.json(safeUsers);
});

// Existing routes
app.use("/api/subjects", subjectsRouter);
app.use("/api/academic", academicRouter);
app.use("/api/campus", campusRouter);
app.use("/api/posts", postsRouter);
app.use("/api/events", eventsRouter);

app.get("/", (req, res) => {
    res.json({
        message: "FreshmanOS backend is running!"
    });
});

app.listen(PORT, () => {
    console.log(`FreshmanOS server running on port ${PORT}`);
});
