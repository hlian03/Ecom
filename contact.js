// Validation and Regular 
document.getElementById('contactForm').addEventListener('submit', function(e) {
         e.preventDefault();
         
         // Get form elements
         const form = this;
         const name = document.getElementById('name').value.trim();
         const email = document.getElementById('email').value.trim();
         const subject = document.getElementById('subject').value;
         const message = document.getElementById('message').value.trim();
         
         // Basic validation
         let isValid = true;
         
         // Name validation
         if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
         } else {
            clearError('name');
         }
         
         // Email validation
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailPattern.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
         } else {
            clearError('email');
         }
         
         // Subject validation
         if (!subject) {
            showError('subject', 'Please select a subject');
            isValid = false;
         } else {
            clearError('subject');
         }
         
         // Message validation
         if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
         } else {
            clearError('message');
         }
         
         // If all validations pass
         if (isValid) {
            // Hide form and show thank you message
            form.style.display = 'none';
            document.getElementById('thank-you').style.display = 'block';
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted successfully!', {
               name: name,
               email: email,
               phone: document.getElementById('phone').value,
               subject: subject,
               message: message,
               newsletter: document.getElementById('newsletter').checked
            });
         }
      });
      
      // Show error message
      function showError(fieldId, message) {
         const field = document.getElementById(fieldId);
         const existingError = field.parentNode.querySelector('.error-message');
         
         if (existingError) {
            existingError.textContent = message;
         } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
         }
         
         field.style.borderColor = '#e74c3c';
      }
      
      // Clear error message
      function clearError(fieldId) {
         const field = document.getElementById(fieldId);
         const errorMessage = field.parentNode.querySelector('.error-message');
         
         if (errorMessage) {
            errorMessage.remove();
         }
         
         field.style.borderColor = '#27ae60';
      }
      
      // Reset form function
      function resetForm() {
         document.getElementById('contactForm').reset();
         document.getElementById('contactForm').style.display = 'block';
         document.getElementById('thank-you').style.display = 'none';
         
         // Clear all error states
         const inputs = document.querySelectorAll('input, select, textarea');
         inputs.forEach(input => {
            input.style.borderColor = '#ddd';
         });
         
         // Remove error messages
         const errorMessages = document.querySelectorAll('.error-message');
         errorMessages.forEach(error => error.remove());
      }
      
      // Real-time validation
      document.querySelectorAll('input, select, textarea').forEach(field => {
         field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
               showError(this.id, 'This field is required');
            } else if (this.id === 'email' && this.value) {
               const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               if (!emailPattern.test(this.value)) {
                  showError(this.id, 'Please enter a valid email address');
               } else {
                  clearError(this.id);
               }
            } else if (this.id === 'name' && this.value && this.value.trim().length < 2) {
               showError(this.id, 'Name must be at least 2 characters long');
            } else if (this.id === 'message' && this.value && this.value.trim().length < 10) {
               showError(this.id, 'Message must be at least 10 characters long');
            } else if (this.value) {
               clearError(this.id);
            }
         });
      });
