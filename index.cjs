const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
debugger;
const predefinedEmail = 'serge@utrains.com';
const predefinedPassword = 'abc123';

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

debugger;
app.post('/login', (req, res) => {
    debugger;
    const { email, password } = req.body;
    
    // Check if email and password match predefined values
    if (email === predefinedEmail && password === predefinedPassword) {
        // Redirect to sample HTML page if email and password match
        res.redirect('/home.html');
    } else {
        // Display error message if email and password don't match
        res.send('Invalid email or password. Please try again.');
    }
});

app.get('/', (req, res) => {
    res.redirect('/login.html');
});


// index.js
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

