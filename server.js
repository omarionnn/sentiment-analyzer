const express = require('express');
const Sentiment = require('sentiment');
const path = require('path');

const app = express();
const sentiment = new Sentiment();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Add console log to verify static file serving
app.get('/js/main.js', (req, res, next) => {
    console.log('Attempting to serve main.js');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { result: null });
});

app.post('/analyze', (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        console.log('Analyzing text:', text); // Debug log
        const result = sentiment.analyze(text);
        console.log('Analysis result:', result); // Debug log
        
        // Calculate total sentiment points (absolute values)
        const totalPoints = Math.abs(result.score) + result.positive.length + result.negative.length;
        
        // Calculate percentages
        let positivePercentage = 0;
        let negativePercentage = 0;
        let neutralPercentage = 0;

        if (totalPoints === 0) {
            // If no sentiment is detected, consider it 100% neutral
            neutralPercentage = 100;
        } else {
            positivePercentage = Math.round((result.positive.length / totalPoints) * 100);
            negativePercentage = Math.round((result.negative.length / totalPoints) * 100);
            neutralPercentage = 100 - (positivePercentage + negativePercentage);
        }

        const response = {
            score: result.score,
            comparative: result.comparative,
            tokens: result.tokens,
            positive: result.positive,
            negative: result.negative,
            percentages: {
                positive: positivePercentage,
                negative: negativePercentage,
                neutral: neutralPercentage
            }
        };

        console.log('Sending response:', response); // Debug log
        res.json(response);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 