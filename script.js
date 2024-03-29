var listQuotes = [
  { quote: "Words are but the signs of ideas", author: "Samuel Johnson" },
  { quote: "I think, therefore I am", author: "Rene Descartes" },
  { quote: "The world of reality has its limits; the world of imagination is boundless", author: "Jean-Jacques Rousseau" },
  { quote: "Carpe diem, quam minimum credula postero", author: "Horace" },
  { quote: "You can never plan the future by the past", author: "Edmund Burke" },
  { quote: "Each one builds his own faith", author: "" },
  { quote: "Start with the man in the mirror. If you are not wheeling to start then who?", author: "" },
  { quote: "Curiosity will conquer fear even more than bravery will", author: "James Stephens" },
  { quote: "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing", author: "George Bernard Shaw" },
  { quote: "The man who is swimming against the stream knows the strength of it", author: "Woodrow Wilson" },
  { quote: "Those who do not remember the past are condemned to repeat it", author: "George Santayana" },
  { quote: "You always admire what you really don't understand", author: "Blaise Pascal" },
  { quote: "War doesn't determine who is right, only who is left", author: "Winston Churchill" },
  { quote: "The quality, not the longevity, of one's life is what is important", author: "Martin Luther King, Jr." },
  { quote: "Never take life too seriously. No one gets out alive anyway", author: "Sydney J. Harris" },
  { quote: "Madness as you know is a lot like gravity, all it takes is a little push", author: "" },
  { quote: "Violent delights have violent ends", author: "William Shakespeare" },
  { quote: "Pleasure does not win over guilt", author: "Friedrich Nietzsche" },
  { quote: "Hope is such a bait, it covers any hook", author: "Oliver Goldsmithr" },
  { quote: "Hope is the cruelest torture that prevents you from giving up on life entirely", author: "" },
  { quote: "Let us be grateful to the mirror for revealing to us our appearance only", author: "Samuel Butler" },
  { quote: "If you can't handle me at my worst, then you sure as hell don't deserve me at my best", author: "Marilyn Monroe" },
  { quote: "Do not envy my progress without knowing my sacrifice", author: "" },
  { quote: "The one who envies also admires", author: "" },
  { quote: "Tell me what you brag about and I'll tell you what you lack", author: "" },
  { quote: "The actions of men are the best interpreters of their thoughts", author: "James Joyce" },
  { quote: "Sometimes the absence of alternatives clears the mind marvelously", author: "Henry Kissinger" },
  { quote: "Don't think about how to spend less, think about how to earn more", author: "" },
  { quote: "Fortune favors the bold", author: "Turnus" },
  { quote: "Veni, vidi, vici", author: "Julius Caesar" },
  { quote: "You can't score if you don't shoot", author: "Glenn Warner" },
  { quote: "You miss 100 percent of the shots you don't take", author: "Burton W. Kanter" },
  { quote: "Life is short, life is sweet; life ain't easy, but it's free", author: "Dreamers" },
  { quote: "An echo in eternity", author: "" },
  { quote: "Lights are on but nobody's home", author: "" },
  { quote: "A smile is a curve that sets everything straight", author: "Phyllis Diller" },
  { quote: "The first wealth is health", author: "Ralph Waldo Emerson" },
  { quote: "It is the set of the sails, not the direction of the wind that determines which way we will go", author: "Jim Rohn" }
  //{ quote: "", author: "" },
];

var currentQuote = 0;
var progress = setInterval(timerProgress, 10);
var progressWidth = 0;

//var timeDisplayed = 10000;
//var timer = setInterval(changeQuote, timeDisplayed);

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
  //$("blockquote").fadeToggle( "slow", "linear" );
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
