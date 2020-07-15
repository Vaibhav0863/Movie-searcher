import "../css/style.scss"
const axios = require('axios')
import { elements } from './view/elements'
// importing modules from views
import * as searchView from "./view/searchView"

// importing modules from models
import Search from "./model/search"

/*
    What it contains

    1. Search object
*/
let state = {}

const controlSearch = async (query, page = 1) => {
    // getting query from search view
    state.query = query
    // query = query.split(" ").join('%20')

    if (query) {
        // Storing search object into global state
        state.search = new Search(query, page)

        //TODO - Prepare UI for results
        // 1. adding loader
        // 2. clear search text
        searchView.renderLoader();

        // Getting searches for given query
        await state.search.getSearchResult()

        // Render collected data on UI
        // console.log(state.search.result)
        searchView.removeLoader()
        searchView.renderResult(state.search.result)
    }
}


elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    controlSearch(searchView.getInput())
})

elements.moviePagination.addEventListener("click", (e) => {
    controlSearch(state.query, e.target.closest('.btn').dataset.page)
})

elements.clearBtn.addEventListener('click', (e) => {
    searchView.removeLoader()
})