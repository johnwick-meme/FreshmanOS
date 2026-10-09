const API = "http://localhost:5000"; // Change to your deployed URL later

// Login function
async function login(email, password) {
    try {
        const response = await fetch(`${API}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect to main page after 1 second
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
            
        } else {
            showMessage(data.error || 'Login failed', 'error');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please check your connection.', 'error');
    }
}

// Register function
async function register(name, email, password) {
    try {
        const response = await fetch(`${API}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            showMessage('Registration successful! Redirecting...', 'success');
            
            // Redirect to main page after 1 second
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
            
        } else {
            showMessage(data.error || 'Registration failed', 'error');
        }
        
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('Network error. Please check your connection.', 'error');
    }
}

// Show message function
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 10px 15px;
        margin: 10px 0;
        border-radius: 5px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' ? 
            'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Add to form
    const form = document.querySelector('form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Form validation
function validateEmail(email) {
    const collegeEmailRegex = /@(thapar\.edu|student\.thapar\.edu)$/i;
    return collegeEmailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '../index.html';
        return;
    }
    
    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Validation
            if (!email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Please use your college email ID (@thapar.edu)', 'error');
                return;
            }
            
            // Call login function
            login(email, password);
        });
    }
    
    // Handle register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Please use your college email ID (@thapar.edu)', 'error');
                return;
            }
            
            if (!validatePassword(password)) {
                showMessage('Password must be at least 6 characters long', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            // Call register function
            register(name, email, password);
        });
    }
    
    // Handle form switching (if you have login/register tabs)
    const switchButtons = document.querySelectorAll('[data-switch]');
    switchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-switch');
            
            // Hide all forms
            document.querySelectorAll('.form-container').forEach(form => {
                form.style.display = 'none';
            });
            
            // Show target form
            const targetForm = document.getElementById(target);
            if (targetForm) {
                targetForm.style.display = 'block';
            }
        });
    });
    
});

// Logout function (for other pages)
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login/index.html';
}
