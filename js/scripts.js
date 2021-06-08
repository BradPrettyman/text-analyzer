// Utility Logic

  function noInputtedWord(word, text) {
  if ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }

  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {

    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

function mostCommonWords(text) {
  const wordArray = text.split(' ');
  wordArray.sort();
  let temp = wordArray[0];
  let counter = 0;
  let newArray=[];

  wordArray.forEach(function(element) {
    if (temp === element)
    {
      counter++;
    }
    else {
      newArray.push(counter + " " + temp);
      temp = element;
      counter = 1; 
    }
  });
  newArray.push(counter + " " + temp);
  return newArray.sort().reverse();
}

function omitsOffensive (text) {
  let array = text.split(' ');
  let result = [];

  array.forEach(function(element){
    if(element !== "zoinks" && element !== "muppeteer" && element !== "biffaroni" && element !== "loopdaloop")
    {
      result.push(element);
    }
    else{
      result.push("****");
    }
  });

  return result.join(" ");
}

// UI Logic
//   element = "Tappletini"  word = "apple"
function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (element.indexOf(word) >= 0) {
      let number = element.indexOf(word)
      htmlString = htmlString.concat(element.substring(0, number) + "<b>" + element.substring(number, number + word.length) + "</b>" + element.substring(number + word.length));
    }
    else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const arrayResults = mostCommonWords(passage);
    const omitsResult = omitsOffensive(passage);

    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);

    $("#bolded-passage").html(boldPassage(word, passage));

    $("ul").append("<li>" + arrayResults[0].substring(2) + ": " + arrayResults[0].substring(0,1) + "</li>");
    $("ul").append("<li>" + arrayResults[1].substring(2) + ": " + arrayResults[1].substring(0,1) + "</li>");
    $("ul").append("<li>" + arrayResults[2].substring(2) + ": " + arrayResults[2].substring(0,1) +  "</li>");
    $("#offensive").html(omitsResult);

  });
});


