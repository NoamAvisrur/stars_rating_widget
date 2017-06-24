var myApp = angular.module('myApp', []);

myApp.filter('toFixed', function() {
    return function (num){
        if (num > 0){
            return num.toFixed(2);
        }
    }    
})

myApp.controller('Ctrl', function Ctrl() {
    this.rates = [];
    
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
            this.renderAverage();
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
})


