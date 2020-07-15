import { elements } from "./elements"

// getting input from textfield
export const getInput = () => {
    return elements.searchMovie.value
}

// truncating overview of movie
function truncateResult(data, limit = 20) {
    data = data.split(' ')
    return data.slice(0, limit).join(' ') + "..."
}

// rendering search results
function renderSearchResult(movieData) {
    const mockup = `<li class="search-list">
    <div class="movie-img">
        <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="" />
        </div>
    <div class="movie-content">
        <div class="movie-title">
            ${movieData.original_title}
        </div>
        <div class="movie-description">
            ${truncateResult(movieData.overview)}
        </div>
    </div>
    </li>`
    if (movieData.overview != undefined && movieData.original_title != undefined && movieData.poster_path != null) {

        elements.movieSearchResults.insertAdjacentHTML("beforeend", mockup)
    }

}

// rendering pagination
function renderPagination(current_page, last_page) {
    let btns = ""
    if (current_page == 1 && last_page > 1) {
        btns = `
        <div class="pagination">
        <button type="button" class="btn" id="right--btn" data-page=${current_page + 1}>
			Next<img src="https://img.icons8.com/metro/26/000000/right.png" />
        </button>
        </div>
        `
    }
    else if (current_page > 1 && current_page < last_page) {
        btns = `
        <div class="pagination">
        <button type="button" class="btn" id="left--btn" data-page=${current_page - 1}>
			<img src="https://img.icons8.com/metro/26/000000/left.png" />Prev
		</button>

        <button type="button" class="btn" id="right--btn" data-page=${current_page + 1}>
			Next<img src="https://img.icons8.com/metro/26/000000/right.png" />
        </button>
        </div>
        `
    }
    else if (last_page > 1) {
        btns = `
        <div class="pagination">
        <button type="button" class="btn" id="left--btn data-page=${current_page - 1}">
        <img src="https://img.icons8.com/metro/26/000000/left.png" />Prev
    </button>
    </div>
        `
    }
    elements.moviePagination.insertAdjacentHTML("beforeend", btns)
}


// rendering clear button
function renderClearButton() {
    let markup = `
    <button class="clear">Clear</button>
    `

    elements.clearBtn.insertAdjacentHTML("afterbegin", markup)
}


export function renderResult(data) {
    console.log(data.results)
    try {
        if (data.results.length == 0) {
            alert("Movie not found")
        }
        else {

            data.results.forEach(renderSearchResult);
            renderClearButton()
            renderPagination(data.page, data.total_pages)

        }
    }
    catch (error) {
        console.log(error)
    }
}

export function renderLoader() {
    const mockup = `
    <div class="loader">
        <img src="./assets/loader.svg" alt="" />
	</div>
    `;
    // console.log("Loader")
    elements.searchMovie.value = "";
    elements.movieSearchResults.innerHTML = ""
    elements.moviePagination.innerHTML = ""
    elements.movieSearchResults.insertAdjacentHTML("beforeend", mockup)

}

export function removeLoader() {
    elements.movieSearchResults.innerHTML = ""
    elements.moviePagination.innerHTML = ""
    elements.clearBtn.innerHTML = ""
}