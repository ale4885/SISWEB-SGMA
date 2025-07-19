document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('observacionesModal');
            const openModalBtn = document.getElementById('openModalBtn');
            const closeButton = document.querySelector('.close-button');
            const modalBody = modal.querySelector('.modal-body');

            openModalBtn.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                modal.style.display = 'block';

                // Load content from Observaciones.html
                fetch('Observaciones.html')
                    .then(response => response.text())
                    .then(html => {
                        // Create a temporary div to parse the HTML
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;

                        // Extract the specific elements you want from Observaciones.html
                        const vehicleInfoCard = tempDiv.querySelector('.card.vehicle-info');
                        const observationsCard = tempDiv.querySelector('.card.observations-card');
                        const footerActions = tempDiv.querySelector('.footer-actions');

                        modalBody.innerHTML = ''; // Clear previous content

                        if (vehicleInfoCard) {
                            modalBody.appendChild(vehicleInfoCard);
                        }
                        if (observationsCard) {
                            modalBody.appendChild(observationsCard);
                        }
                        if (footerActions) {
                            modalBody.appendChild(footerActions);
                        }

                        // Re-attach event listeners for buttons inside the loaded content if necessary
                        const sendButton = modalBody.querySelector('.btn');
                        if (sendButton) {
                            sendButton.addEventListener('click', function(e) {
                                e.preventDefault();
                                modal.style.display = 'none';
                                alert('Actualización enviada!');
                            });
                        }
                    })
                    .catch(error => console.error('Error loading observations:', error));
            });

            closeButton.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            // Close the modal if the user clicks anywhere outside of the modal content
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });