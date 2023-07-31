// app.js

const ctx = document.getElementById('Graph').getContext('2d');
const TheYear = document.getElementById('TheYear');

// Function to fetch data and update the chart for the selected year
async function updateChart(year) {
  try {
    const response = await fetch('/data');
    const data = await response.json();
    console.log(data)

    // Get the data for the selected year
    const selectedData = data[year];
    console.log('here is selected data', selectedData)

    // Extract labels and data for the selected year
    const labels = selectedData.map(item => item.name);
    const chartData = selectedData.map(item => item.price);

    // Destroy the existing Chart instance, if it exists
    if (currentChart) {
      currentChart.destroy();
    }

    // Create a new chart and store the instance in the currentChart variable
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Prices for ${year}`,
          data: chartData,
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Listen for changes on the dropdown button
TheYear.addEventListener('change', (event) => {
  const selectedYear = event.target.value;
  updateChart(selectedYear);
});

// Initial update with the default year in this case its 2000
const defaultYear = '2000';
let currentChart; // Keep track of the current Chart instance
updateChart(defaultYear);
