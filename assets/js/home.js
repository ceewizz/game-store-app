let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
// Initialize favorites array to be able to later store steam ID's.
let storedFavorites = localStorage.getItem('favorites');
let favorites;
if (!storedFavorites || storedFavorites === "null") {
    favorites = [];
} else {
    favorites = JSON.parse(storedFavorites);
}
console.log(favorites);

  
fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=1", requestOptions)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            // Save to local storage
            localStorage.setItem('dealsData', JSON.stringify(data));
            // Data
            console.log('Deal ID: ' + item.dealID);
            console.log('Deal Rating: ' + item.dealRating);
            console.log('Game ID: ' + item.gameID);
            console.log('Internal Name: ' + item.internalName);
            console.log('Is On Sale: ' + item.isOnSale);
            // If added to template literal, "item.lastChange" needs to be converted to a readable date and to string type.
            console.log('Last Change: ' + item.lastChange);
            console.log('Metacritic Link: ' + item.metacriticLink);
            console.log('Metacritic Score: ' + item.metacriticScore);
            console.log('Normal Price: ' + item.normalPrice);
            // If added to template literal, "item.releaseDate" needs to be converted to a readable date and to string type.
            console.log('Release Date: ' + item.releaseDate);
            console.log('Sale Price: ' + item.salePrice);
            console.log('Savings: ' + item.savings);
            console.log('Steam App ID: ' + item.steamAppID);
            console.log('Steam Rating Count: ' + item.steamRatingCount);
            console.log('Steam Rating Percent: ' + item.steamRatingPercent);
            console.log('Steam Rating Text: ' + item.steamRatingText);
            console.log('Store ID: ' + item.storeID);
            console.log('Thumbnail URL: ' + item.thumb);
            console.log('Title: ' + item.title);
            console.log('-------------------');
            // Modify savings to not show any decimals
            let percentage = Math.round(parseFloat(item.savings))

            // Create gallery item HTML string. Need to include cheapshark redirect link as a condition for free usage.
            let galleryItemHtml = `
                <div class="gallery-item" data-steamid="${item.steamAppID}">
                    <div class="image-container">
                        <img src="${item.thumb}" alt="${item.title}" onerror="missingImage(this)">
                        <div class="overlay">
                            <div class="overlay-content">
                                <p>${item.title}</p>
                                <a href="https://www.metacritic.com${item.metacriticLink}">Metacritic: ${item.metacriticScore}</a>
                                <p>Steam rating: ${item.steamRatingPercent}</p>
                                <p>Deal rating: ${item.dealRating}</p>
                                <a href="https://www.cheapshark.com/redirect?dealID=${item.dealID}">See the deal!</a>
                            </div>
                        </div>
                    </div>
                    <div class="item-footer">
                        <div class="game-details">
                            <div class="savings">-${percentage}%</div>
                            <div class="prices">
                                <div class="salePrice">$${item.salePrice}</div>
                                <div class="normalPrice">$${item.normalPrice}</div>
                            </div>
                        </div>
                        <div class="heart">
                            &#9829;
                        </div>
                    </div>
                </div>
            `;
            let sanitizedItem = DOMPurify.sanitize(galleryItemHtml);
            // Add event delegation to each image container to hide and show. 
            $('.image-container').on('click', function() {
                $(this).find('.overlay').show();

                $(this).find('.overlay a').each(function() {
                    $(this).attr('target', '_blank');
                    $(this).attr('rel', 'noopener');
                });

            });

            $('.overlay').on('click', function(event) {
                event.stopPropagation();
                $(this).hide();
            });
            // Append the new gallery item to the gallery
            $('.gallery').append(sanitizedItem);
        });
    })
    .catch((error) => {
        console.log('error', error);
    });

// Add event listeners to each gallery item
$('.gallery').on('click', '.heart', function(event) {
    event.stopPropagation();
    $(this).toggleClass('red-heart');
    // Use all lowercase for data attributes. This is becauese JS/jQuery will access attribute and convert to lower case.
    let steamID = $(this).closest('.gallery-item').data('steamid');
    let index = favorites.indexOf(steamID);
    if (index === -1) {
        favorites.push(steamID);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
});

$(window).on('load', function() {
    $('img').each(function() {
        // Check HTML image element properties.
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            this.src = './assets/images/missing.png'; 
        }
    });
    // After all is done loading, access stored steam ID's to be able to determine favorites.
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    $('.gallery-item').each(function() {
        let steamID = $(this).data('steamid');
        if (favorites.includes(steamID)) {
            $(this).find('.heart').addClass('red-heart');
        }
    });
});