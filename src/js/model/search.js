const axios = require("axios")

export default class Search {
    constructor(query, page = 1) {
        this.query = query;
        this.page = page
    }

    async getSearchResult() {
        const api_key = process.env.API_KEY;

        try {
            const url = `https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${this.query}&page=${this.page}`;

            const data = await axios(url)

            this.result = data.data

            return this.result
        }
        catch (error) {
            alert(error)
        }
    }
}