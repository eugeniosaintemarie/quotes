let listQuotes = [];
let currentQuote = 0;
let progressWidth = 0;
let progress;

function loadQuotesFromGitHub(rawURL) {
  return fetch(rawURL)
    .then(response => response.text())
    .then(text => {
      return text.split('\n').map(line => {
        const [quote, author] = line.split(' - ');
        return { quote: quote.trim(), author: author.trim() };
      });
    });
}

function setQuote() {
  if (listQuotes.length > 0) {
    $(".quote").html(listQuotes[currentQuote].quote);
    $(".author-name").html(listQuotes[currentQuote].author);
    tweetQuote();
  } else {
    console.error('No quotes available to display.');
  }
}

function changeQuote() {
  if (listQuotes.length > 0) {
    currentQuote = (currentQuote + 1) % listQuotes.length;
    setQuote();
  }
}

function timerProgress() {
  $(".quote-progress").width(progressWidth + "%");
  if (progressWidth < 100) {
    progressWidth += 0.1;
  } else {
    changeQuote();
    progressWidth = 0;
  }
}

function startProgress() {
  if (progress) clearInterval(progress);
  progress = setInterval(timerProgress, 10);
}

$(document).ready(function() {
  $.get('./quotes.txt', function(data) {
    var quotes = data.split('\n').map(function(line) {
      var parts = line.split(' - ');
      return {
        quote: parts[0].trim(),
        author: parts[1] ? parts[1].trim() : 'Unknown'
      };
    });

    if (quotes.length > 0) {
      var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      $('.quote').text(randomQuote.quote);
      $('.author-name').text(randomQuote.author);
    } else {
      console.error('No valid quotes found.');
    }
  }).fail(function() {
    console.error('Error loading quotes.');
  });
});

$(".previous").click(function () {
  if (listQuotes.length > 0) {
    currentQuote = (currentQuote - 1 + listQuotes.length) % listQuotes.length;
    setQuote();
    progressWidth = 0;
  }
});

$(".next").click(function () {
  changeQuote();
  progressWidth = 0;
});

$(".random").click(function () {
  if (listQuotes.length > 0) {
    currentQuote = Math.floor(Math.random() * listQuotes.length);
    setQuote();
    progressWidth = 0;
  }
});

window.twttr = (function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

function tweetQuote() {
  if (listQuotes.length > 0) {
    $('#quote-tweet').attr('href', 'https://twitter.com/intent/tweet?&text=' + encodeURIComponent('"' + listQuotes[currentQuote].quote + '" ' + listQuotes[currentQuote].author));
  }
}
