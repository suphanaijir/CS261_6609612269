function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    const userInfoBox = document.getElementById('user-info-box');


    const digitPattern = /\d{10,}/; 

    if (!digitPattern.test(username)) {
        messageElement.innerText = '* Username must contain at least 10 digits.';
        messageElement.style.color = 'red';
        return;
    }

    if (password.length < 6) {
        messageElement.innerText = '* Password must be at least 6 characters long.';
        messageElement.style.color = 'red';
        return;
    }


    messageElement.style.color = 'initial';


    const requestBody = {
        UserName: username, 
        PassWord: password  
    };


    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Application-Key": "TU18bbfe2d383671b26b42e604126ea4e2d0404a5e07f4250751ea4f3454c854184847e14ac8099c336ff47391e956d147", 
        },
        body: JSON.stringify(requestBody) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
    
        if (data.tu_status && data.displayname_th && data.displayname_en && data.email && data.department && data.faculty) {
        
            messageElement.innerText = '';
            userInfoBox.style.display = 'block'; 

           
            document.getElementById('status').innerText = `Status: ${data.tu_status}`;
            document.getElementById('displayname_th').innerText = `Name (TH): ${data.displayname_th}`;
            document.getElementById('displayname_en').innerText = `Name (EN): ${data.displayname_en}`;
            document.getElementById('email').innerText = `Email: ${data.email}`;
            document.getElementById('department').innerText = `Department: ${data.department}`;
            document.getElementById('faculty').innerText = `Faculty: ${data.faculty}`;
        } else {
            messageElement.innerText = 'Login successful, but some information is missing from the response.';
            messageElement.style.color = 'orange';
            userInfoBox.style.display = 'none'; 
        }
    })
    .catch(error => {

        console.error('Error:', error);
        messageElement.innerText = `An error occurred: ${error.message}`;
        messageElement.style.color = 'red';
        userInfoBox.style.display = 'none'; 
    });
}
