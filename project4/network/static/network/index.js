import { renderPaginationControls } from './pagination.js';
import { renderPost } from './posts.js';

document.addEventListener('DOMContentLoaded', () => {
    const textareaPost = document.getElementById('content');
    const buttonPost = document.getElementById('post-button');

    if (textareaPost && buttonPost) {
        const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
        
        buttonPost.addEventListener('click', (event) => {
            event.preventDefault();
            addNewPost(textareaPost, csrfToken);
        });
    }

    getAllPosts(1);
});

async function addNewPost(textarea, csrfToken) {
    const content = {
        'content': textarea.value
    };

    if (!content.content.trim()) {
        alert('Content should not be empty.'); 
        return; 
    }

    console.log('Sending new post:', content);
    try {
        const response = await fetch('/posts/new/', {
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
            alert(errorData.error);
            textarea.value = content.content;
        }
        else {
            const result = await response.json();
            console.log('Success:', result);

            // Dynamically add new post instead of fetching all data
            addPostToUI(result);
            textarea.value = ""; 
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getAllPosts(pageNumber = 1) {
    try {
        const response = await fetch(`/posts?page=${pageNumber}`);
        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error from server:', errorData)
            return;
        }

        const data = await response.json();

        const allPostsView = document.querySelector('#view-posts');
        const paginationContainer = document.querySelector('#pagination-controls');

        if (!allPostsView || !paginationContainer) {
            console.error('Element not found');
            return;
        }

        allPostsView.innerHTML = '';

        
        data.posts.forEach(post => {
            const postDiv = renderPost(post);
            allPostsView.append(postDiv);
        });

        renderPaginationControls(data.data_paginator, paginationContainer, getAllPosts);

    } catch (error) {
        console.error('Error fetching data:', error);
    }    
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