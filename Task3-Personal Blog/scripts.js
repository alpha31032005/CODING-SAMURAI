// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission
    
    const formData = new FormData(event.target); // Get form data
    const formDataObj = Object.fromEntries(formData); // Convert form data to object
    
    // Send the form data using Fetch API
    fetch('https://your-backend-endpoint.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObj),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful form submission
      console.log('Form submitted successfully:', data);
      // You can add further actions here, like displaying a success message
    })
    .catch(error => {
      // Handle error during form submission
      console.error('There was an error submitting the form:', error.message);
      // You can add further actions here, like displaying an error message
    });
  }
  
  // Get the form element
  const contactForm = document.getElementById('contactForm');
  
  // Attach event listener for form submission
  if (contactForm) {
    contactForm.addEventListener('submit', submitForm);
  }
  