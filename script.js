let mainHtml = ``
let myData = {
    title: '',
    imdbRating: '',
    moviePoster: '',
    runtime: '',
    genre: '',
    plot: ''

}
let myWishlist = {}
const searchBtn = document.getElementById('search-btn')
const movieTitleEl = document.getElementById('movie-title')
const mainEl = document.getElementById('main')
const mainWishlistEl = document.getElementById('main-wishlist')
const addWishlist = document.getElementById('add')
const dataFromLocalStorage = JSON.parse(localStorage.getItem('myWishlist'))

// if(dataFromLocalStorage) {
//     myWishlist = dataFromLocalStorage
//     // render(myWishlist)
// }

// function render(movieDetails) {
//     let movieList = ""
//     for (const item of movieDetails) {
//         movieList += `
//         <div class="movies">
//             <div class="poster-el">
//                  <img class="poster" src="${poster}" alt="${item.Title} poster">
//             </div>
//             <div class="main-details">
//                 <div class="title-details">
//                     <h3 id="movie-title">${item.Title}</h3>
//                     <p id="movie-rating"><img src="images/star-icon.png" class="star" alt="reviews">${item.imdbRating}</p>
//                 </div>
//                 <div class="more-info">
//                     <p class="movie-duration">${item.Runtime}</p>
//                     <p class="movie-genre">${item.Genre}</p>
//                     <button id="remove"><img class="remove-icon" src="images/remove-from-wishlist.png">Remove</button>
//                 </div>
//                 <div class="plot">
//                     <p class="movie-plot">${item.Plot}</p>
//                 </div>
//             </div>
//         </div>
//         `
//     }
//     mainWishlistEl.innerHTML = movieList
// }

// addWishlist.addEventListener('click', async function() {
//     const res = fetch()
// })

searchBtn.addEventListener('click',async function() {
    console.clear()
    mainEl.innerHTML = ''
    let poster = ''
    let movieName = movieTitleEl.value;
    movieTitleEl.value = ''
    const response = await fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=8f0c340c&page=1-4`)
    const data = await response.json()
    console.log(data)
    console.log("Response", typeof(data.Response))

    // If movie is not found
    if (data.Response == 'False') {
        mainHtml = `No data found. Please Seach for some other title.`
        mainEl.textContent = mainHtml
    } else {
        let i =0;
    // If movie is found
        for(let item of data.Search) {
            let res = await fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=8f0c340c`)
            const movieData = await res.json()
    
            if(movieData.Poster == 'N/A') {
                poster = "images/image-not-found.webp"
            } else {
                poster = movieData.Poster
            }

            // Adding all data we got to myData object, so we can render it when needed
            // myData{title, imdbRating, moviePoster, runtime, genre, plot} = movieData
            myData[i].title = "hello"
            myData[i].imdbRating = movieData.imdbRating
            myData[i].moviePoster = poster
            myData[i].runtime = movieData.Runtime
            myData[i].genre = movieData.Genre
            myData[i].plot = movieData.Plot
            mainHtml = `
            <div class="movies">
                <div class="poster-el">
                    <img class="poster" src="${poster}" alt="${myData[i].Title} poster">
                </div>
                <div class="main-details">
                    <div class="title-details">
                        <h3 id="movie-title">${myData[i].Title}</h3>
                        <p id="movie-rating"><img src="images/star-icon.png" class="star" alt="reviews">${myData[i].imdbRating}</p>
                    </div>
                    <div class="more-info">
                        <p class="movie-duration">${myData[i].Runtime}</p>
                        <p class="movie-genre">${myData[i].Genre}</p>
                        <button id="add"><img class="add-icon" src="images/add-to-wishlist.png">Wishlist</button>
                    </div>
                    <div class="plot">
                        <p class="movie-plot">${myData[i].Plot}</p>
                    </div>
                </div>
            </div>
            `
            console.log(myData[i])
            i++;
            mainEl.innerHTML += mainHtml 
        }
        console.log("My Data: ", myData)
    }
    
    
})