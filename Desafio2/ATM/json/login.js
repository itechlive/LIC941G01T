// Assuming the JSON file is in the same directory and named 'bank.json'
fetch('../json/bank.json')
    .then(response => response.json())
    .then(data => {
        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            let cuenta = document.getElementById('cuenta').value;
            let password = document.getElementById('password').value;

            let user = data.find(user => user.cuenta === cuenta && user.password === password);

            if(user) {
                window.location.href = 'main.html'; // Redirect to main.html if login is successful
            } else {
                alert('Invalid cuenta or password'); // Show an error message if login is unsuccessful
            }
        });
    })
    .catch(error => console.error('Error:', error));
