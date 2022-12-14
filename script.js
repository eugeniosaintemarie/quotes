var listQuotes = [
  //{ quote: "", author: "" },
  { quote: "Happiness is like a butterfly which, when pursued, is always beyond our grasp, but, if you will sit down quietly, may alight upon you", author: "Nathaniel Hawthorne" },
  { quote: "Carpe diem, quam minimum credula postero", author: "Horace" },
  { quote: "Each one builds his own faith", author: "" },
  { quote: "Start with the man in the mirror. If you are not wheeling to start then who?", author: "" },
  { quote: "Life is short, life is sweet; life ain't easy, but it's free", author: "Dreamers" },
  { quote: "Fortune favors the bold", author: "Turnus" },
  { quote: "Hope is the cruelest torture that prevents you from giving up on life entirely", author: "" },
  { quote: "I don’t think not living your dream means you have failed at life, and I don’t think living your dream means you have succeeded either", author: "" },
  { quote: "Pleasure does not win over guilt", author: "Friedrich Nietzsche" },
  { quote: "Violent delights have violent ends", author: "William Shakespeare" },
  { quote: "Never take life too seriously. No one gets out alive anyway", author: "Sydney J. Harris" },
  { quote: "Before sex you help each other get naked, after sex you only dress yourself. Moral of the story: in life no one helps you once you're fucked", author: "" },
  { quote: "Madness as you know is a lot like gravity all it takes is a little push", author: "" },
  { quote: "War doesn't determine who is right, only who is left", author: "Winston Churchill" },
  { quote: "The one who envies also admires", author: "" },
  { quote: "Tell me what you brag about and I'll tell you what you lack", author: "" },
  { quote: "Do not envy my progress without knowing my sacrifice", author: "" },
  { quote: "An echo in eternity", author: "" },
];

var currentQuote = 0;
var progress = setInterval(timerProgress, 10);
var progressWidth = 0;

// var timeDisplayed = 10000;
// var timer = setInterval(changeQuote, timeDisplayed);

function timerProgress() {
  $(".quote-progress").width(progressWidth + "%");
  if (progressWidth < 100) {
    progressWidth += 0.1;
  } else {
    changeQuote();
    progressWidth = 0;
  }
}

function setQuote() {
  $(".quote").html('' + listQuotes[currentQuote].quote + '');
  $(".author-name").html(listQuotes[currentQuote].author);
  tweetQuote();
}

function getRandomQuote() {
  currentQuote = Math.round(Math.random() * (listQuotes.length));
  setQuote();
}

function changeQuote() {
  // $("blockquote").fadeToggle( "slow", "linear" );
  if (currentQuote < listQuotes.length - 1) {
    currentQuote++;
  } else {
    currentQuote = 0;
  }
  setQuote();
}

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

setQuote();