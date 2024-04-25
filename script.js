let listQuotes = [];
let currentQuote = 0;
let progress = setInterval(timerProgress, 10);
let progressWidth = 0;

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
  $(".quote").html(listQuotes[currentQuote].quote);
  $(".author-name").html(listQuotes[currentQuote].author);
  tweetQuote();
}

function changeQuote() {
  if (currentQuote < listQuotes.length - 1) {
    currentQuote++;
  } else {
    currentQuote = 0;
  }
  setQuote();
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

loadQuotesFromGitHub('https://raw.githubusercontent.com/eugeniosaintemarie/quotes/gh-pages/quotes.txt')
  .then(quotes => {
    listQuotes = quotes;
    setQuote();
  })
  .catch(error => console.error('Error loading quotes:', error));

$(".previous").click(function () {
  if (currentQuote > 0) {
    currentQuote--;
  } else {
    currentQuote = listQuotes.length - 1;
  }
  setQuote();
  progressWidth = 0;
});

$(".next").click(function () {
  changeQuote();
  progressWidth = 0;
});

$(".random").click(function () {
  getRandomQuote();
  progressWidth = 0;
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
  $('#quote-tweet').attr('href', 'https://twitter.com/intent/tweet?&text=' + encodeURIComponent('"' + listQuotes[currentQuote].quote + '" ' + listQuotes[currentQuote].author));
}
