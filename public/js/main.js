document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const textInput = document.getElementById('textInput');
    const results = document.getElementById('results');
    const sentimentScore = document.getElementById('sentimentScore');
    const sentimentComparative = document.getElementById('sentimentComparative');
    const positiveWords = document.getElementById('positiveWords');
    const negativeWords = document.getElementById('negativeWords');
    const charCount = document.getElementById('charCount');
    let sentimentChart = null;
    let wordChart = null;

    // Character counter
    textInput.addEventListener('input', () => {
        const remaining = 500 - textInput.value.length;
        charCount.textContent = remaining;
        charCount.style.color = remaining < 50 ? '#dc3545' : '#666';
    });

    function createSentimentChart(percentages) {
        if (sentimentChart) {
            sentimentChart.destroy();
        }

        const ctx = document.getElementById('sentimentGauge').getContext('2d');
        sentimentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [
                        percentages.positive,
                        percentages.neutral,
                        percentages.negative
                    ],
                    backgroundColor: [
                        '#28a745',  // green for positive
                        '#ffc107',  // yellow for neutral
                        '#dc3545'   // red for negative
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    function createWordChart(positive, negative) {
        if (wordChart) {
            wordChart.destroy();
        }

        const ctx = document.getElementById('wordChart').getContext('2d');
        wordChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Positive Words', 'Negative Words'],
                datasets: [{
                    data: [positive.length, negative.length],
                    backgroundColor: ['#28a745', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    analyzeBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter some text to analyze');
            return;
        }

        // Show loading state
        analyzeBtn.classList.add('loading');
        results.style.display = 'none'; // Hide previous results while loading

        try {
            console.log('Sending text for analysis:', text); // Debug log
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json(); // Only parse JSON once
            console.log('Received data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }

            if (!data.percentages) {
                throw new Error('Invalid response format: missing percentages');
            }
            
            // Display results with animation
            results.style.display = 'block';
            
            // Create/update charts
            createSentimentChart(data.percentages);
            createWordChart(data.positive, data.negative);
            
            // Set sentiment score and interpretation
            const dominantSentiment = 
                data.percentages.positive > data.percentages.negative && data.percentages.positive > data.percentages.neutral ? 'Positive 😊' :
                data.percentages.negative > data.percentages.positive && data.percentages.negative > data.percentages.neutral ? 'Negative 😟' :
                'Neutral 😐';

            sentimentScore.textContent = `Overall Sentiment: ${dominantSentiment}`;
            
            // Set sentiment distribution
            sentimentComparative.textContent = 
                `Distribution: ${data.percentages.positive}% Positive, ${data.percentages.neutral}% Neutral, ${data.percentages.negative}% Negative`;
            
            // Display words with animation
            positiveWords.textContent = data.positive.join(', ') || 'None';
            negativeWords.textContent = data.negative.join(', ') || 'None';

        } catch (error) {
            console.error('Error details:', error);
            results.style.display = 'none';
            alert(`Error analyzing text: ${error.message}`);
        } finally {
            // Hide loading state
            analyzeBtn.classList.remove('loading');
        }
    });
}); 