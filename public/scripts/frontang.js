const app = angular.module('myApp',['ngRoute']);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/home',{
            templateUrl: '../views/main.html',
            controller:'myCntr'
        })
        .when('/details/:id',{
            templateUrl: '../views/moreinfo.html',
            controller: 'detailCntr'
        })
        .otherwise({
           redirectTo:'/home'
        })
    }]);

app.controller('myCntr',['$scope','$http','$location', '$anchorScroll','$window','$log',function($scope,$http,$location,$anchorScroll,$window,$log){
    $scope.getmovie = function(title){
        $http.get('https://api.themoviedb.org/3/search/movie?api_key=1248d09d0d407f99a897a41fb634e6b3&query='+title+'&language=en-US&include_adult=true').then(function(list){
            $scope.all = list.data.results;
        })
    }
    $scope.goto = function(title){
        $http.get('https://api.themoviedb.org/3/search/movie?api_key=1248d09d0d407f99a897a41fb634e6b3&query='+title).then(function(title){
            $window.location.href = '#!/details/'+title.data.results[0].id;
        })
    }
        $scope.movies_info = [];
            $http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=1248d09d0d407f99a897a41fb634e6b3&language=en-US&page=1').then(function(data){
                let res = data.data.results;
                let chunk = 4;
                let local = [];
                for(let i=0 ; i<res.length ; i+=chunk){
                    for(let j=i ; j<i+chunk ; j++){
                        let movie = {
                            _id:res[j].id,
                            title:res[j].title,
                            desc:res[j].overview,
                            rel_date:res[j].release_date,
                            lang:res[j].original_language,
                            poster:res[j].poster_path                            
                        }
                        local.push(movie);
                    }
                    $scope.movies_info.push(local);
                    local = [];
                }
            });
            $scope.scroll = function(){
                $anchorScroll();
            }
            
}]);
app.controller('upCntr',['$scope','$http','$location', '$anchorScroll','$window','$log',function($scope,$http,$location,$anchorScroll,$window,$log){
    $scope.movies_info = [];
        $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=1248d09d0d407f99a897a41fb634e6b3&language=en-US&page=1').then(function(data){
            let res = data.data.results;
            let chunk = 4;
            let local = [];
            for(let i=0 ; i<res.length ; i+=chunk){
                for(let j=i ; j<i+chunk ; j++){
                    let movie = {
                        _id:res[j].id,
                        title:res[j].title,
                        desc:res[j].overview,
                        rel_date:res[j].release_date,
                        lang:res[j].original_language,
                        poster:res[j].poster_path                            
                    }
                    local.push(movie);
                }
                $scope.movies_info.push(local);
                local = [];
            }
               
        });
        $scope.scroll = function(){
            $anchorScroll();
        }
        
}]);

app.controller('detailCntr',['$rootScope','$scope','$http','$routeParams',function($rootScope,$scope,$http,$routeParams){
    $http.get('https://api.themoviedb.org/3/movie/'+$routeParams.id+'?api_key=1248d09d0d407f99a897a41fb634e6b3&language=en-US&adult=true').then(function(res){
        $scope.details = res.data;
        $http.get('http://www.omdbapi.com/?apikey=b14679c7&i='+$scope.details.imdb_id).then(function(res){
        $scope.moreInfo = res.data;
    });
    });
   
}])

app.controller('galleryCntr',['$rootScope','$scope','$http','$routeParams',function($rootScope,$scope,$http,$routeParams){
    $http.get('https://api.themoviedb.org/3/movie/'+$routeParams.id+'/videos?api_key=1248d09d0d407f99a897a41fb634e6b3&language=en-US').then(function(videos){
        $scope.video = videos.data.results;
        $scope.url= $scope.video[0].key;
    })
    $http.get('https://api.themoviedb.org/3/movie/'+$routeParams.id+'/images?api_key=1248d09d0d407f99a897a41fb634e6b3').then(function(images){
        $scope.img = images.data.backdrops;
    })
}])

app.controller('detCntr',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    $http.get('https://api.themoviedb.org/3/movie/'+$routeParams.id+'/reviews?api_key=1248d09d0d407f99a897a41fb634e6b3').then(function(ans){
        $scope.review = ans.data.results;
            $scope.arr = [];
            for(let i=0 ; i<$scope.review.length ; i++){
                let rev = {
                    author:$scope.review[i].author,
                    content:$scope.review[i].content
                }
                $scope.arr.push(rev);
            }
    })
}])

app.controller('similarCntr',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    $scope.similarMovies_info = [];
    $http.get('https://api.themoviedb.org/3/movie/'+$routeParams.id+'/similar?api_key=1248d09d0d407f99a897a41fb634e6b3&language=en-US&page=1').then(function(mov){
        let movie = mov.data.results;
        console.log(movie);
        let chunk = 4;
        let local = [];
        for(let i=0 ; i<movie.length ; i+=chunk){
            for(let j=i ; j<i+chunk ; j++){
                let sim = {
                    _id:movie[j].id,
                    title:movie[j].title,
                    poster:movie[j].poster_path                            
                }
                local.push(sim);
            }
            $scope.similarMovies_info.push(local);
            local = [];
        }
        console.log($scope.similarMovies_info);
    })
}])