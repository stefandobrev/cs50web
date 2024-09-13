document.addEventListener('DOMContentLoaded', () => {
    const textareaPost = document.getElementById('content');
    const buttonPost = document.getElementById('button-post');
    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    buttonPost.addEventListener('click', (event) => {
        event.preventDefault();
        addNewPost(textareaPost, csrfToken).then (() => {
            textareaPost.value = "";
        }); 
    });
});

async function addNewPost(textarea, csrfToken) {
    const content = {
        'content': textarea.value
    };

    try {
        const response = await fetch('/new-post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(content)
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from server:', errorData);
        }
        else {
            const result = await response.json();
            console.log('Success:', result);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}