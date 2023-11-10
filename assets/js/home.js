let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=1", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=1", requestOptions)
//     .then(
//         (response) => {
//         return response.json();
//         }
//     )
//     .then(
//         (data) => {
//             console.log(data);
//             for(let i = 0; i < 5; i++) {
//                 console.log('Deal ID: ' + data[i].dealID);
//                 console.log('Deal Rating: ' + data[i].dealRating);
//                 console.log('Game ID: ' + data[i].gameID);
//                 console.log('Internal Name: ' + data[i].internalName);
//                 console.log('Is On Sale: ' + data[i].isOnSale);
//                 console.log('Last Change: ' + data[i].lastChange);
//                 console.log('Metacritic Link: ' + data[i].metacriticLink);
//                 console.log('Metacritic Score: ' + data[i].metacriticScore);
//                 console.log('Normal Price: ' + data[i].normalPrice);
//                 console.log('Release Date: ' + data[i].releaseDate);
//                 console.log('Sale Price: ' + data[i].salePrice);
//                 console.log('Savings: ' + data[i].savings);
//                 console.log('Steam App ID: ' + data[i].steamAppID);
//                 console.log('Steam Rating Count: ' + data[i].steamRatingCount);
//                 console.log('Steam Rating Percent: ' + data[i].steamRatingPercent);
//                 console.log('Steam Rating Text: ' + data[i].steamRatingText);
//                 console.log('Store ID: ' + data[i].storeID);
//                 console.log('Thumbnail URL: ' + data[i].thumb);
//                 console.log('Title: ' + data[i].title);
//                 console.log('-------------------');
//                 // Insert Gallery Item

//             }
//         }
//     )
//     .catch(
//         (error) => {
//         console.log('error', error);
//         }
//     )
  
fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=1", requestOptions)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
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

            // Create gallery item HTML string
            let galleryItemHtml = `
                <div class="gallery-item">
                    <img src="${item.thumb}" alt="${item.title}">
                    <div class="savings">-${percentage}%</div>
                    <div class="prices">
                        <div class="salePrice">$${item.salePrice}</div>
                        <div class="normalPrice">$${item.normalPrice}</div>
                    </div>
                </div>
            `;
            let sanitizedItem = DOMPurify.sanitize(galleryItemHtml);

            // Append the new gallery item to the gallery
            $('.gallery').append(sanitizedItem);
        });
    })
    .catch((error) => {
        console.log('error', error);
    });