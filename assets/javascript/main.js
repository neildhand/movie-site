var form = document.getElementById("movie-form");

form.onsubmit = function(event) {
    event.preventDefault();

    if(document.getElementById('result').hasChildNodes()) {
        document.getElementById('result').innerHTML = "";
    }

    if(document.getElementById('pageBtn').hasChildNodes()) {
        document.getElementById('pageBtn').innerHTML = "";
    }

    console.log(form.movieTitle.value);

    var title = form.movieTitle.value;

    var pageNumber = 1;
    console.log(pageNumber);

    var url = `http://www.omdbapi.com/?s=${title}&page=${pageNumber}&apikey=7c05aa35`;
    console.log(url);

    movieSearch(url);

    createPageBtn(pageNumber, title);

};

function movieSearch(url) {
    $.ajax({
        url: url,
        method: "GET",
        }).done(function(result) {
            console.log(`success: ${result.Response}`);
            console.log(result);

            if (result.totalResults > 10) {
                console.log(Math.floor((result.totalResults/10) + 1));
            }
                //var rowDiv = document.createElement('div');
                //var descDiv = document.createElement('div');

                if(!result.Search){
                    document.getElementById('pageBtn').innerHTML = '';
                } else {

                    for(var i = 0; i < result.Search.length; i++) {
                        var movieId = result.Search[i].imdbID;
        
                        $.ajax({
                            url: `http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=7c05aa35`,
                            method: "GET",
                        }).done(function(res) {

                            var rowDiv = document.createElement('div');
                            var descDiv = document.createElement('div');
                            var imgDiv = document.createElement('div');

                            var imgEl = document.createElement('img');

                            console.log(res.Poster);

                            if(res.Poster === "N/A") {
                                imgEl.src = './assets/images/no-image-found-360x260.png';
                            } else {
                                imgEl.src = res.Poster;
                            }

                            imgDiv.appendChild(imgEl);
                            rowDiv.appendChild(imgDiv);
            
                            var titleH2 = document.createElement('h2');
                            var title = res.Title;
                            var year = res.Year;
                            var titleText = document.createTextNode(`${title} (${year})`);
                            titleH2.appendChild(titleText);
                            descDiv.appendChild(titleH2);
        
                            var directorH5 = document.createElement('h5');
                            directorText = document.createTextNode(`Directed by: ${res.Director}`);
                            directorH5.style.fontWeight = 'bold';
                            directorH5.appendChild(directorText);
                            descDiv.appendChild(directorH5);
        
                            var actors = res.Actors;
                            var actorsH5 = document.createElement('h5');
                            var actorsText = document.createTextNode(`Actors: ${actors}`);
                            actorsH5.style.fontWeight = 'bold';
                            actorsH5.appendChild(actorsText);
                            descDiv.appendChild(actorsH5);
        
                            var moreInfoH6 = document.createElement('h6');
                            moreInfoText = document.createTextNode(`Genre: ${res.Genre}. Rated: ${res.Rated}. Runtime: ${res.Runtime}`);
                            moreInfoH6.appendChild(moreInfoText);
                            descDiv.appendChild(moreInfoH6);
        
                            var ratingsDiv = document.createElement('div');
                            for(var i = 0; i < res.Ratings.length; i++) {
                                console.log(`Ratings: ${res.Ratings[i].Source}: ${res.Ratings[i].Value}`);
                                var ratingsH6 = document.createElement('h6');
                                var ratingsText = document.createTextNode(`${res.Ratings[i].Source}: ${res.Ratings[i].Value}`);
                                ratingsH6.appendChild(ratingsText);
                                ratingsDiv.appendChild(ratingsH6);
                            }
                            descDiv.appendChild(ratingsDiv);
        
                            var ratingsH6 = document.createElement('h6');
                            //var ratingsText = document.createTextNode()
        
                            console.log('Res: ', res);
                            var plotP = document.createElement('p');
                            var plot = res.Plot;
                            var plotText = document.createTextNode(plot);
                            plotP.appendChild(plotText);
        
                            descDiv.appendChild(plotP);

                            rowDiv.appendChild(descDiv);

                            var resultDiv = document.getElementById('result');
                            resultDiv.appendChild(rowDiv);

                            rowDiv.className = 'row';
                            descDiv.className = 'col-md-6';
                            imgDiv.className = 'col-md-6';
                            imgEl.className = 'img-responsive';
        
                        });
                        
                        // rowDiv.appendChild(descDiv);
                        
            
                        // resultDiv = document.getElementById('result');
                        // resultDiv.appendChild(rowDiv);
                    }
                }
        });
}

function createPageBtn(pageNum, title) {
    var pageBtnDiv = document.getElementById('pageBtn');
    var pageButton = document.createElement('button');
    var pageBtnText = document.createTextNode('More');
    pageButton.appendChild(pageBtnText);
    pageBtnDiv.className = 'form-group';
    pageBtnDiv.appendChild(pageButton);

    pageButton.onclick = () => {
        pageNum++;
        console.log(pageNum);
        newUrl = `http://www.omdbapi.com/?s=${title}&page=${pageNum}&apikey=7c05aa35`
        movieSearch(newUrl);
    }
}

