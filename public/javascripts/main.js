// app.js

const ctx = document.getElementById('Graph').getContext('2d');
const TheYear = document.getElementById('TheYear');

// Function to fetch data and update the chart for the selected year
// ...

// Function to fetch data and update the chart for the selected year
async function updateChart(year) {
  try {
    const response = await fetch('/data');
    const data = await response.json();

    // Get all the available years from the data
    const availableYears = Object.keys(data);

    // Update the dropdown options
    const selectYearDropdown = document.getElementById('TheYear');
    selectYearDropdown.innerHTML = ''; // Clear existing options

    availableYears.forEach((optionYear) => {
      const option = document.createElement('option');
      option.value = optionYear;
      option.textContent = optionYear;
      selectYearDropdown.appendChild(option);
    });

    // Set the selected year in the dropdown
    selectYearDropdown.value = year;

    // Get the data for the selected year
    const selectedData = data[year] || [];

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

// ...
async function addData(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('dataForm'));
  const year = formData.get('year');
  const item = formData.get('item');
  const price = parseInt(formData.get('price'));

  // Send the form data to the server to add the new data to graph.json
  try {
    await fetch('/add-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year, item, price }),
    });

    // Update the chart with the new data after adding it
    updateChart(year);
    
    // Clear the form fields after successful submission
    document.getElementById('year').value = '';
    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
  } catch (error) {
    console.error('Error adding data:', error);
  }
}

// Listen for form submission event
document.getElementById('dataForm').addEventListener('submit', addData);

// Listen for changes on the dropdown button
TheYear.addEventListener('change', (event) => {
  const selectedYear = event.target.value;
  updateChart(selectedYear);
});

// Initial update with the default year in this case its 2000
const defaultYear = '2000';
let currentChart; // Keep track of the current Chart instance
updateChart(defaultYear);
