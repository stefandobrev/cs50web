export function renderPost(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('all-posts')
    
    const userUrl = `/user/${post.created_by_id}/`; 

    postDiv.innerHTML = `
    <a href="${userUrl}">
        <p class="text-username">${post.created_by}</p>
    </a>
    <p class="text-content" id="content-${post.id}">${post.content}</p>
    <p class="text-bottom-profile">${post.timestamp} · The Network for iPhone</p>
    <div id="likes-container-${post.id}" class="likes-container">
        <p id="likes-count-${post.id}" class="text-bottom-profile"><b style="color: black">${post.likes}</b> Likes</p>
    </div>
    `;

    if (post.can_like) {
        const selectLikesContainer = postDiv.querySelector(`#likes-container-${post.id}`);
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = post.liked ? 'Unlike' : 'Like'; 

        likeButton.addEventListener('click', () => {
            handleLikeButton(post, likeButton);
        });

        selectLikesContainer.append(likeButton);
    }

    if (post.can_edit) {
        const editDiv = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.classList.add('edit-icon');

        editButton.innerHTML = `<img src="${editIconUrl}" alt="Edit" id="edit-button"/>`;

        editButton.addEventListener('click', () => {
            handleEdit(post, editButton);
        });

        postDiv.append(editButton);
        postDiv.append(editDiv);
    }

    return postDiv;
}

async function handleLikeButton(post, likeButton) {
    try { 
        const response = await fetch(`/like-post/${post.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error saving like', errorData);
            return;
        }

        const updateLikes = await response.json();
        document.querySelector(`#likes-count-${post.id} b`).innerText = updateLikes.likes;
        likeButton.innerHTML = updateLikes.liked ? 'Unlike' : 'Like'; 
    } catch (error) {
        console.error('Error fetching likes', error);
    }
}

function handleEdit(post, editButton) {
    const contentElement = document.getElementById(`content-${post.id}`);
    const currentContent = contentElement.innerText;

    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea-edit');
    textarea.value = currentContent;
    textarea.rows = 1;

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.innerText = 'Save';

    contentElement.innerHTML = ''; 
    contentElement.appendChild(textarea);
    contentElement.parentElement.appendChild(saveButton);

    editButton.style.display = 'none';
    textarea.focus();

    saveButton.addEventListener('click', () => {
        const newContent = textarea.value.trim();
        saveEditedPost(post.id, newContent, editButton);
        saveButton.remove();
    });

    saveButton.addEventListener('click', async () => {
        const newContent = textarea.value.trim(); 

        if (!newContent) {
            alert('Content should not be empty.'); 
            contentElement.innerHTML = currentContent; 
            saveButton.remove(); 
            editButton.style.display = 'block'; 
            return; 
        }

        const isSuccess = await saveEditedPost(post.id, newContent, editButton);
        if (!isSuccess) {
            contentElement.innerHTML = currentContent; 
            editButton.style.display = 'block'; 
        }
    });
}

async function saveEditedPost(postId, newContent, editButton) {
    try {
        const response = await fetch(`/edit-post/${postId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({"content": newContent})
        });

        if(!response.ok) {
            const errorData = await response.json();
            console.log('Error saving post:', errorData);
            return;
        }

        const updatedPost = await response.json();
        document.getElementById(`content-${postId}`).innerHTML = updatedPost.content;

        editButton.style.display = 'block';
        return true;
    } catch (error) {
        console.error('Error fetching save:', error);
    }
}