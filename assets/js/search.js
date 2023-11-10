var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=1", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=1", requestOptions)
    .then(
        (response) => {
        return response.json();
        }
    )
    .then(
        (data) => {
        console.log(data);
        for(let i = 0; i < 5; i++) {
        console.log('Deal ID: ' + data[i].dealID);
        console.log('Deal Rating: ' + data[i].dealRating);
        console.log('Game ID: ' + data[i].gameID);
        console.log('Internal Name: ' + data[i].internalName);
        console.log('Is On Sale: ' + data[i].isOnSale);
        console.log('Last Change: ' + data[i].lastChange);
        console.log('Metacritic Link: ' + data[i].metacriticLink);
        console.log('Metacritic Score: ' + data[i].metacriticScore);
        console.log('Normal Price: ' + data[i].normalPrice);
        console.log('Release Date: ' + data[i].releaseDate);
        console.log('Sale Price: ' + data[i].salePrice);
        console.log('Savings: ' + data[i].savings);
        console.log('Steam App ID: ' + data[i].steamAppID);
        console.log('Steam Rating Count: ' + data[i].steamRatingCount);
        console.log('Steam Rating Percent: ' + data[i].steamRatingPercent);
        console.log('Steam Rating Text: ' + data[i].steamRatingText);
        console.log('Store ID: ' + data[i].storeID);
        console.log('Thumbnail URL: ' + data[i].thumb);
        console.log('Title: ' + data[i].title);
        console.log('-------------------');
        }
        }
    )
    .catch(
        (error) => {
        console.log('error', error);
        }
    )
  
