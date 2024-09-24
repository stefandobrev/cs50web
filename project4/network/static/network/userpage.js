
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

       const profileDiv = renderProfile(data.viewed_user, data.posts);
       userprofileView.append(profileDiv);
       
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderProfile(viewed_user, posts) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('user-profile');

    postDiv.innerHTML = `
    <h1>${viewed_user.username}</h1>
    `;

    if (posts) {
        posts.forEach(post => {
            const postsUser = renderPostsUser(viewed_user, post);
            postDiv.append(postsUser);
           });
    }
    return postDiv;
}

// rendering all posts created by the user
function renderPostsUser(viewed_user, post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('all-posts')
    
    const userUrl = `/user/${viewed_user.id}/`; 

    postDiv.innerHTML = `
    <a href="${userUrl}">
        <p class="text-username">${post.created_by}</p>
    </a>
    <p class="text-content">${post.content}</p>
    <p class="text-timestamp">${post.timestamp} · The Network for iPhone</p>
    `;

    return postDiv;
}