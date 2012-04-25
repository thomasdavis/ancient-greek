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

      $(this.el).html(_.template(englishNameTemplate));

      $('.js-english-name-answer').focus();
      this.nextQuestion();
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
        this.nextQuestion();
      } else {
        
           console.log(this.greekAlphabet[this.currentAlphabetIndex].english_name);
        $('.js-wrong').fadeIn(300).fadeOut(300);
      };
      $('.js-english-name-answer').val('');
      return false;
    },
    nextQuestion: function () {
            console.log($('.question-type'));
      var questions = _.filter($('.question-type'), function(question_type) {
        if($(question_type).attr('checked')){
          return $(question_type).attr('value');
        }
      });
      console.log(questions);
      questions = _.map(questions, function(question) {
          return $(question).attr('value');
      });
      console.log(questions);
      var question = questions[Math.floor(Math.random()*questions.length)];
      $('.js-question').text(this.greekAlphabet[this.currentAlphabetIndex][question]);
    }
  });
  return GuestbookList;
});
