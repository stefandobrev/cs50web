document.addEventListener('DOMContentLoaded', () => {
    const textareaPost = document.getElementById('content');
    const buttonPost = document.getElementById('button-post');

    if (textareaPost && buttonPost) {
        const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
        
        buttonPost.addEventListener('click', (event) => {
            event.preventDefault();
            addNewPost(textareaPost, csrfToken).then (() => {
                textareaPost.value = "";
            }); 
        });
    }

    getAllPosts();
});

async function addNewPost(textarea, csrfToken) {
    const content = {
        'content': textarea.value
    };

    try {
        const response = await fetch('posts/new/', {
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

            // Dynamically add new post instead of fetching all data
            addPostToUI(result);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getAllPosts() {
    try {
        const response = await fetch('posts/');
        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error from server:', errorData)
            return;
        }

        const data = await response.json();
        console.log('Posts data:', data);

        const allPostsView = document.querySelector('#view-posts')
        if (!allPostsView) {
            console.error('Element #view-posts not found');
            return;
        }

        if (data.length === 0) {
            allPostsView.innerHTML = '<p>No posts available.</p>';
            return;
        }

        allPostsView.innerHTML = '';

        data.forEach(post => {
            const postDiv = renderPost(post);
            allPostsView.append(postDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }    
}

function renderPost(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('all-posts')
    
    const userUrl = `user/${post.created_by_id}/`; 

    postDiv.innerHTML = `
    <a href="${userUrl}">
        <p class="text-username">${post.created_by}</p>
    </a>
    <p class="text-content">${post.content}</p>
    <p class="text-timestamp">${post.timestamp} · The Network for iPhone</p>
    `;

    return postDiv;
}

function addPostToUI(post) {
    const allPostsView = document.querySelector('#view-posts');
    if (!allPostsView) {
        console.error('Element view-posts not found!')
        return;
    }

    const postDiv = renderPost(post);
    allPostsView.prepend(postDiv);
}