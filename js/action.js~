//variable that holds the word database
var db;
//Audio sprite using Howler.js library
var sound_file;
//create a Button pseudoclass
var Button = function(phoneme){
  this.text= phoneme;
};

//Create Button HTML element
Button.prototype.createHTMLElement = function(sound,item){
  var btnHTML = $('<button class="phoneme">');
  btnHTML.text(this.text);
  btnHTML.click(function(){
    sound_file.play(sound);
    $('.text').toggleClass("highlight",false);
    $(".p_"+item).toggleClass("highlight");
  });
  $('.js-phonemes').append(btnHTML);
}
//when the document is ready
$(document).ready(function(){
  //read the json file which contains the database of words
  $.getJSON("db/db_1.json", function(temp_db){
     db=temp_db;
    //add options for the input
    addOptions();});
  //parse the audio sprite
  $.getJSON("db/sprite.json", function(sprite){sound_file= new Howl({
    src: ['media/phonics.mp3','media/phonics.wav'],sprite})});
  //when the form is submitted
  $('.form').on('submit', function(e){
    //prevent the default submit function
    e.preventDefault();
    //read the input value
    var inputValue = $('#word').val().trim();
    //send the input value to be chunked
    chunk(inputValue);
  });
});

function chunk(word){
  //Clean the buttons from the previous word
  clean();
  //convert the word to lowercase
  word = word.toLowerCase();
  //if the word is not empty
  if(word){
    //if the word is in our database
    if(typeof db[word]!="undefined"){
      //for each chunk in the word
      for (var item in db[word].chunks){
        //create a button element
        var b = new Button(db[word].chunks[item]);
        //create button HTML element
        b.createHTMLElement(db[word].phones[item],item);
        //append the phones in the text form at the top
        $(".js-word").append("<span class='text p_"+item+"'>"+db[word].chunks[item]+"</span>");
      }
    }
    else {
        alert ("We do not have this word in our database at the moment");
    }

  }
  //if the word is empty
  else{
    alert("Hey, you did not enter any word!");
  }
}

function clean(){
  //empty the buttons of letters of previous word
  $('.js-phonemes').empty();
 //empty the text over the button
  $(".js-word").empty();
}
//function to add options by appending to the dataList in HTML
function addOptions() {
  for (var key in db) {
    var option = $('<option value="'+key+'">');
    $('#options').append(option);
  }

}
