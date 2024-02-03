
var q = "danielle steel"
var authorKey =""
var coversArray =[]

queryUrl = "https://openlibrary.org/search/authors.json?q=" + q;

worksQueryUrl=  "" 

fetch(queryUrl)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
    console.log(data.docs[0].key)
    authorKey = data.docs[0].key;
    worksQueryUrl ="https://openlibrary.org/authors/" + authorKey + "/works.json"
    fetch(worksQueryUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data.entries);
        for(var i = 0; i< (data.entries).length; i++){
            if('covers' in data.entries[i]){
                coversArray.push(data.entries[i].covers[0]);
            }
        }
        console.log(coversArray);
        displayBookCarousel(coversArray);
    })

})

function displayBookCarousel(array){

    //create an array of sub-arrays of a length
    var arrayOfArrays = [];
    var size = 5;
    for(var i = 0; i<array.length; i++){
        arrayOfArrays.push(array.slice(i, i+=size))
    }
    console.log(arrayOfArrays)

    //set first carousel item of carousel 
    var firstArray = arrayOfArrays[0];
    console.log(firstArray);
    var firstCardWrapper = $('#firstCardWrapper');
    for(var i = 0; i < firstArray.length; i++){
 
        var coverUrl = "https://covers.openlibrary.org/b/id/" + firstArray[i] + "-M.jpg"
        var newCard = $('<div>')
        newCard.addClass("card mx-5")
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
        newCard.addClass("card mx-4")
        var coverImg = $('<img>')
        coverImg.attr('src', coverUrl );
        newCard.append(coverImg);
        newCardDiv.append(newCard);
        
        }
        
        
        innerCarousel.append(newCarouselItem);
    }       
    
}

var carousel = $('#coverCarousel');
carousel.on("click", function(event){
    console.log("I'm clicked");
    var clickedImgSrc = ($(event.target)).attr('src');
    console.log(clickedImgSrc)
    var clickedImgCover = clickedImgSrc.substr(36,6);
    console.log(clickedImgCover);
})
