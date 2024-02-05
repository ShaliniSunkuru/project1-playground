
var authorName = "ray bradbury" // TO DO: get author name from search box
var authorKey = ""
var coversArray =[]

queryUrl = "https://openlibrary.org/search/authors.json?q=" + authorName;

worksQueryUrl=  "" 

//fetch author data
fetch(queryUrl)
.then(function(response){
    return response.json()
})
.then(function(authorData){
 
    authorKey = authorData.docs[0].key;
    worksQueryUrl ="https://openlibrary.org/authors/" + authorKey + "/works.json"

    //fetch author works
    fetch(worksQueryUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(authorWorks){
        for(var i = 0; i< (authorWorks.entries).length; i++){
            //check if cover ID exists for work
            if('covers' in authorWorks.entries[i]){
                var coverToPush = authorWorks.entries[i].covers[0];
                if(coverToPush > 0){
                    coversArray.push(coverToPush);
                }
                                            
            }
        }
        displayBookCarousel(coversArray);
    })

})

function displayBookCarousel(array){

    //create an array of sub-arrays of a length = number of books per carsousel item
    var arrayOfArrays = [];
    var size = 3;
    for(var i = 0; i<array.length; i++){
        arrayOfArrays.push(array.slice(i, i+=size))
    }

    //set first carousel item of carousel 
    var firstArray = arrayOfArrays[0];
    var firstCardWrapper = $('#firstCardWrapper');
    for(var i = 0; i < firstArray.length; i++){
 
        var coverUrl = "https://covers.openlibrary.org/b/id/" + firstArray[i] + "-M.jpg"
        var newCard = $('<div>')
        newCard.addClass("card")
        var coverImg = $('<img>')
        coverImg.attr('src', coverUrl );
        newCard.append(coverImg);
        firstCardWrapper.append(newCard);
    }

    
    var innerCarousel = $("#innerCarousel");
    //append more carousel items
    for(var j = 1 ; j < arrayOfArrays.length; j++){

       
        var newCarouselItem = $('<div>')
        newCarouselItem.addClass('carousel-item');
        var newCardDiv = $('<div>');
        newCardDiv.addClass("card-wrapper")
        newCarouselItem.append(newCardDiv);
        for(var i = 0; i < arrayOfArrays[j].length; i++){   
            var coverUrl = "https://covers.openlibrary.org/b/id/" + arrayOfArrays[j][i] + "-M.jpg"
        var newCard = $('<div>')
        newCard.addClass("card")
        var coverImg = $('<img>')
        coverImg.attr('src', coverUrl );
        newCard.append(coverImg);
        newCardDiv.append(newCard);
        
        }        
        
        innerCarousel.append(newCarouselItem);
    }       
    
}

var carousel = $('#coverCarousel');
carousel.on("click", ".card", function(event){
    console.log("I'm clicked");
    var clickedImgSrc = ($(event.target)).attr('src');
    console.log(clickedImgSrc)
    //replace all non-numeric character in string with empty string to extract cover ID
    var clickedImgCover =  clickedImgSrc.replace(/\D/g, "");
    
    // TO DO: fetch book synopsis from cover id
})
