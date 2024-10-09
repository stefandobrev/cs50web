export function renderPaginationControls (data, paginationContainer, callback) {
    paginationContainer.innerHTML = '';

    if (data.num_pages <= 1) {
        return;
    }

    if (data.has_previous) {
        const prevButton = document.createElement('button');
        prevButton.classList.add('pagination-button');
        prevButton.innerText = 'Previous';
        prevButton.onclick = () => callback(data.current_page - 1);
        paginationContainer.appendChild(prevButton);
    }

    if (data.has_next) {
        const nextButton = document.createElement('button');
        nextButton.classList.add('pagination-button');
        nextButton.innerText = 'Next';
        nextButton.onclick = () => callback(data.current_page + 1);
        paginationContainer.appendChild(nextButton);
    } 
}