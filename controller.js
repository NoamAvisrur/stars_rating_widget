var myApp = angular.module('myApp', []);

myApp.filter('toFixed', function() {
    return function (num){
        if (num > 0){
            return num.toFixed(2);
        }
    }    
})

myApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

myApp.controller('Ctrl', function Ctrl() {
    this.rates = [];

    this.comments = [];
    
    this.ratesVals = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    
    this.push = function(){
        selectedStars = document.querySelectorAll('.selected');  
        if (selectedStars.length > 0){
            this.rates.unshift(selectedStars.length);
            localStorage.setItem('rating', JSON.stringify(this.rates));
            this.clearStars();
            this.renderView();
	    this.pushComments(selectedStars.length);
        }    
    }
    
    this.clearStars = function(){
        for (let i = 0; i < stars.length; i++) {
            stars[i].innerHTML = "&#9734;";
            stars[i].classList.remove("selected");
        }
    }
    
    this.renderView = function(){
        Object.keys(this.ratesVals).forEach(rate => {
            this.ratesVals[rate] = this.rates.filter(n => rate == n).length;
        });
        this.renderStats(this.ratesVals, this.rates);
	this.renderAverage();
        this.renderStarsAverage();
    }
    
    this.renderAverage = function(){
        var sum = this.rates.reduce(function (acc, currentItem){
            return acc + currentItem;
        }, 0);
        this.average = sum / this.rates.length;
    } 
    
    this.renderStats = function(ob, arr){  
        Object.keys(this.ratesVals).forEach(function (rate) {
	    var value = ob[rate];
            document.querySelector(`.reviews_stats_row:nth-child(${rate}) .reviews_stats_pass`).style.setProperty('--star-persentage', (value / arr.length * 100) + '%');
	})
    }
    
    this.renderStarsAverage = function(){
        roundedAverage = Math.round(this.average);
        Averagestars = document.querySelectorAll('.average_star');
	for (let i = 0; i < Averagestars.length; i++) {
                Averagestars[i].innerHTML = "&#9734;";
        }
	for (let i = 0; i < roundedAverage; i++) {
                Averagestars[i].innerHTML = "&#9733;";
        }
    }
    
    this.pushComments = function(rateVal){
        var newComment = document.querySelector('input[type="text"]').value;
        this.comments.unshift(
            {
	        comment: newComment,
                rates: rateVal
	    }
	);
        this.StarsObject = {};
        for(let i = 0; i < rateVal; i++){
            this.StarsObject[i] = "&#9733";
        }
	document.querySelector('input[type="text"]').value = ""; 
    }
})


