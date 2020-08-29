// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("data/data.json").then((incomingData) => {

  function filterOkMovieRatings(movie) {
    return movie.imdbRating < 9;
  }

  function filterGreatMovieRatings(movie) {
    return movie.imdbRating > 9;
  }

  var okMovies = incomingData.filter(filterOkMovieRatings);
  var greatMovies = incomingData.filter(filterGreatMovieRatings);

  console.log(okMovies);
  console.log(greatMovies);

  function makeTrace(filteredMovies, color) {
    // Use the map method with the arrow function to return all the filtered movie titles.
    var titles = filteredMovies.map(movies =>  movies.title);

    // Use the map method with the arrow function to return all the filtered movie metascores.
    var ratings = filteredMovies.map(movies => movies.metascore);

    // Check your filtered metascores.
    console.log(ratings);

    // Create your trace.
    var trace = {
      x: titles,
      y: ratings,
      type: "bar",
      marker: {
        color: color
      }
    };

    return trace;
  }
  
  var okTrace = makeTrace(okMovies, "#CC0000");
  var greatTrace = makeTrace(greatMovies, "#00CC00");

  // Create the data array for our plot
  var data = [okTrace, greatTrace];

  // Define the plot layout
  var layout = {
    title: "The highest critically acclaimed movies.",
    xaxis: { title: "Title" },
    yaxis: { title: "Metascore (Critic) Rating"}
  };

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", data, layout);
});
