# Sentiment Analyzer

A web-based sentiment analysis tool that provides real-time analysis of text with visual feedback about emotional tone and sentiment distribution.

## Features

- Real-time sentiment analysis
- Interactive pie chart showing sentiment distribution (Positive, Neutral, Negative)
- Bar chart displaying word analysis
- Lists of positive and negative words identified
- Character counter with 500-character limit
- Loading animations and smooth transitions
- Responsive design for all devices

## Demo

Enter any text to analyze its sentiment. The tool will:
- Calculate sentiment percentages
- Display an interactive pie chart of sentiment distribution
- Show positive and negative words found
- Provide an overall sentiment score
- Display word frequency analysis

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/sentiment-analyzer.git

2. Navigate to project directory

cd sentiment-analyzer


3. Install dependencies:

npm install

4. Start the server:

npm start

5. Open your browser and visit:

http://localhost:3000


## Technologies Used

- **Frontend:**
  - HTML5/CSS3
  - JavaScript (ES6+)
  - Chart.js for data visualization
  - Responsive CSS with Flexbox/Grid

- **Backend:**
  - Node.js
  - Express.js
  - EJS templating
  - Sentiment npm package for analysis

## API Endpoints

### POST /analyze
Analyzes provided text and returns sentiment data.

Request body:

json
{
"text": "Your text to analyze"
}

Response:
json
{
"score": 5,
"comparative": 0.5,
"tokens": ["array", "of", "words"],
"positive": ["array", "of", "positive", "words"],
"negative": ["array", "of", "negative", "words"],
"percentages": {
"positive": 60,
"negative": 20,
"neutral": 20
}
}


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Sentiment](https://www.npmjs.com/package/sentiment) - AFINN-based sentiment analysis tool
- [Chart.js](https://www.chartjs.org/) - Simple yet flexible JavaScript charting
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework for Node.js
