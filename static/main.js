const axios = window.axios
// Function to make the POST request
function makeRequest(id, msg, cancelAfter) {
    // https://axios-http.com/docs/cancellation
    const controller = new AbortController();
    console.log(`${id}: Starting request (${msg}) and cancel after ${cancelAfter}ms`)

    axios.get(`/example?wait=5&reqid=${id}`, {
        signal: controller.signal
    })
        .then(response => {
            const messageElement = document.getElementById('message');
            const msg = `${id}: Success: ${response.data}`
            if (messageElement) {
                messageElement.innerHTML += msg
                messageElement.innerHTML += "<br/>"
            }
            console.log(msg);
        })
        .catch(error => {
            const messageElement = document.getElementById('message');
            const msg = `${id}: ERROR: ${error.message}`
            if (messageElement) {
                messageElement.innerHTML += msg
                messageElement.innerHTML += "<br/>"
            }
            console.log(msg);
        });

    if (cancelAfter > 0) {
        setTimeout(() => controller.abort(), cancelAfter)
    }
}

// Call the function when the page loads
makeRequest(Math.floor(+new Date() + Math.random()*1000), "Cancel",  1000);
makeRequest(Math.floor(+new Date() + Math.random()*1000), "Do Not cancel",  -1);






