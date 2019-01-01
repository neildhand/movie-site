var form = document.getElementById("movie-form");
form.onsubmit = function(event) {
    event.preventDefault();
    console.log(form.movieTitle.value);

    var title = form.movieTitle.value;

    var url = `http://www.omdbapi.com/?s=${title}&apikey=7c05aa35`;
    console.log(url);

    $.ajax({
        url: url,
        method: "GET",
        }).done(function(result) {
            console.log(`success: ${result.Response}`);
            console.log(result);

            for(var i = 0; i < result.Search.length; i++) {
                var movieId = result.Search[i].imdbID;
                var divEl = document.createElement('div');
                var descDiv = document.createElement('div');

                $.ajax({
                    url: `http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=7c05aa35`,
                    method: "GET",
                }).done(function(res) {

                    var imgEl = document.createElement('img');
                    imgEl.src = res.Poster;
    
                    descDiv.appendChild(imgEl);
    
                    var titleH2 = document.createElement('h2');
                    var title = res.Title;
                    var year = res.Year;
                    var titleText = document.createTextNode(`${title} (${year})`);
                    titleH2.appendChild(titleText);
                    descDiv.appendChild(titleH2);

                    var actors;

                    console.log('Res: ', res);
                    var plotP = document.createElement('p');
                    var plot = res.Plot;
                    var plotText = document.createTextNode(plot);
                    plotP.appendChild(plotText);

                    descDiv.appendChild(plotP);

                });
                
                divEl.appendChild(descDiv);
                
    
                resultDiv = document.getElementById('result');
                resultDiv.appendChild(divEl);
            }

        });

};
