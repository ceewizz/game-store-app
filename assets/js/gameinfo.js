// DOM Elements
var saveBtn = document.querySelector('#saveBtn');




// Record users input
$(document).ready(function() {
    // saveBtn click listener
    $(".saveBtn").on("click", function() {
        // Get user input value and saves to wishlist
        var text = $(this).siblings(".description").val();
        var wishlist = $(this).parent().attr("data-wishlist") 

        

        // Saves user input to wishlist in local storage
        localStorage.setItem(wishlist, text);
    })

    function listTracker() {
        // Save wishlist in local storage
        var wishNow = localStorage.getItem

        $(".wish-list").each(function () {
            var listNow  = parseInt($(this).attr("data-wishlist"));

            if (listNow = wishNow) {
                localStorage.setItem(listNow, wishNow);
         
            } 
        })
    }

        // Get item from local storage if any

        $("#wishNumber .description").val(localStorage.getItem("wishlists"));
        
        listTracker();
    });
    
    
    
    
