import axios from "axios";

const pixabayAPI = axios.create({
    baseURL: 'https://pixabay.com/api/',
})

export const getPixabayImages = async (query, currentPage) => {
    const { data } = await pixabayAPI.get(
        `?q=${query}&page=${currentPage}&key=29970108-e22fdcbed2b0a29e4c0ee7d8b&image_type=photo&orientation=horizontal&per_page=12
`)
    return data
}
