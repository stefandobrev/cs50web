import { renderPaginationControls } from './pagination.js';
import { renderPost } from './posts.js';

document.addEventListener('DOMContentLoaded', () => {
    user_profile();
});

async function user_profile() {
    try {      
        const response = await fetch(`/user/${userId}/data/`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('GET request failed:', errorData); 
            return;
        }

        const data = await response.json();
        console.log(data);

       const userprofileView = document.querySelector('#userprofile-container');
       if (!userprofileView) {
        console.error('Element #userprofile-container not found!');
        return;
       }

       const profileDiv = renderProfile(data);
       userprofileView.append(profileDiv);  
       
       await getUserPosts(1);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderProfile(viewed_user) {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('user-profile');

    profileDiv.innerHTML = `
    <h1>${viewed_user.username}</h1>
    <p class="profile-text">Joined ${viewed_user.date_joined}</p>
    `;

    const followStatsDiv = document.createElement('div');
    followStatsDiv.classList.add('follow-stats-row');

    if (loggedIn && isDiffUser) {
        const followButton = document.createElement('button');
        followButton.id = "follow-button";
        followButton.classList.add('follow-button-class');

        followButton.textContent = isFollowed ? 'Unfollow' : 'Follow';

        followButton.addEventListener('click', (event) => {
            event.preventDefault();
            toggleFollowStatus();
        });

        followStatsDiv.append(followButton);
    }

    const statsDiv = document.createElement('div');
    statsDiv.classList.add('user-stats');
    statsDiv.innerHTML = `
    <p class="profile-text" id="following-count"><b style="color:black">${viewed_user.following_count}</b> Following</p>
    <p class="profile-text" id="followers-count"><b style="color:black">${viewed_user.followers_count}</b> Followers</p>
    `;

    followStatsDiv.append(statsDiv);
    profileDiv.append(followStatsDiv);

    return profileDiv;
}

async function fetchFollowCounts() {
    try {
        const response = await fetch(`/user/${userId}/follower-count/`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching updated counts:', errorData);
            return null; // Return null if the fetch fails
        }

        return await response.json(); // Return the JSON data if successful
    } catch (error) {
        console.error('Error updating follow counts:', error);
        return null; // Return null if there is an error
    }
}

async function toggleFollowStatus() {
    isFollowed = !isFollowed;

    const followButton = document.querySelector('#follow-button');
    if (followButton) {
        followButton.textContent = isFollowed ? 'Unfollow' : 'Follow'; 
    }

    try {
        const response = await fetch(`/user/${userId}/change-follow-status`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ userId: userId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from server:', errorData);
            return;
        }

        // Use the new helper function to update follow counts
        const data = await fetchFollowCounts();
        if (data) {
            document.querySelector('#following-count b').textContent = data.following_count;
            document.querySelector('#followers-count b').textContent = data.followers_count;
        }

    } catch (error) {
        console.error('Error fetching data (follow status):', error);
        // Revert any changes if there is an error
        isFollowed = !isFollowed; 
        if (followButton) {
            followButton.textContent = isFollowed ? 'Unfollow' : 'Follow'; 
        }
    }
}

async function getUserPosts(pageNumber = 1) {
    try {
        const response = await fetch(`/user/${userId}/posts/?page=${pageNumber}`);
        if (!response.ok) {
            const errorData = await response.json();
            console.log('GET request for posts failed:', errorData);
            return;
        }

        const data = await response.json();
        const userPostsView = document.querySelector('#userpage-user-posts');
        const paginationContainer = document.querySelector('#pagination-controls');

        if (!userPostsView|| !paginationContainer) {
            console.error('Element not found');
            return;
        }

        userPostsView.innerHTML = '';

        if (data.posts === 0) {
            userPostsView.innerHTML = '<p>No posts available.</p>';
            return;
        }
        
        const fragment = document.createDocumentFragment();

        data.posts.forEach(post => {
            const postDiv = renderPost(post);
            fragment.append(postDiv);
        });

        userPostsView.appendChild(fragment);

        renderPaginationControls(data.data_paginator, paginationContainer, getUserPosts);

    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}