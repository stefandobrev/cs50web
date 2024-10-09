import { renderPaginationControls } from './pagination.js';
import { renderPost } from './posts.js';

document.addEventListener('DOMContentLoaded', () => {
    getFollowingPosts(1);
});

async function getFollowingPosts(pageNumber = 1) {
    try {
        const response = await fetch(`/user/fetch-following-posts/?page=${pageNumber}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('GET request failed:', errorData);
            return;
        }

        const data = await response.json()

        const followingView = document.querySelector('#following-container');
        const paginationContainer = document.querySelector('#pagination-controls');

        if (!followingView|| !paginationContainer) {
            console.error('Element not found');
            return;
        }

        followingView.innerHTML = '';

        if (data.posts === 0) {
            followingView.innerHTML = '<p>No posts available.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        data.posts.forEach(post => {
            const postDiv = renderPost(post);
            fragment.append(postDiv);
        });

        followingView.appendChild(fragment);

        renderPaginationControls(data.data_paginator, paginationContainer, getFollowingPosts);
    } catch (error) {
        console.error('Error fetching data(following posts):', error);
    }
}