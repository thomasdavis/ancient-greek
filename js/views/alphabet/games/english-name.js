define([
  'jquery',
  'underscore',
  'backbone',
  'objects/ancient-greek-alphabet',
  'text!templates/alphabet/games/english-name.html'
], function($, _, Backbone, AncientGreekAlphabet, englishNameTemplate){
  var GuestbookList = Backbone.View.extend({
    el: '.alphabet-game-english-name',
    render: function () {
      var questions = ['lowercase', 'uppercase', 'greek_name'];
      var question = questions[Math.floor(Math.random()*3)];
      $(this.el).html(_.template(englishNameTemplate));
      $('.js-question').text(this.greekAlphabet[this.currentAlphabetIndex][question]);
      $('.js-english-name-answer').focus();
    },
    initialize: function () {
      this.currentAlphabetIndex = 0;
      this.greekAlphabet = _.shuffle(AncientGreekAlphabet);
    },
    events: {
      'submit .js-english-name': 'checkAnswer'
    },
    checkAnswer: function () {
      if($('.js-english-name-answer').val() === this.greekAlphabet[this.currentAlphabetIndex].english_name){
        this.currentAlphabetIndex++;
        this.render();
      } else {
        console.log(this.greekAlphabet[this.currentAlphabetIndex].english_name);
      }
      return false;
    }
  });
  return GuestbookList;
});
