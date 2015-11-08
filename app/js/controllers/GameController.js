app.controller('GameController', ['$scope', 'GameBoard', function($scope, GameBoard) {
  $scope.range = function(n) {
    var return_val = [];
    for(var i=0;i<n;i++) {
      return_val.push(i);
    }

    return return_val;
  }

  $scope.max_width = 20;
  $scope.max_height = 10;
  GameBoard.initialize($scope.max_width, $scope.max_height);
  $scope.board = GameBoard;

  $scope.isSelected = function(col, row) {
    return ($scope.board.tiles[col][row].selected == 1);
  };

  $scope.clickTile = function(col, row) {
    GameBoard.selectPattern(col, row);
  };

  $scope.getScore = function(){
    return $scope.board.score;
  }

  $scope.isTileGreen   = function(col, row){ return $scope.board.tiles[col][row].color_index == 1; };
  $scope.isTileYellow  = function(col, row){ return $scope.board.tiles[col][row].color_index == 2; };
  $scope.isTileBlue    = function(col, row){ return $scope.board.tiles[col][row].color_index == 3; };
  $scope.isTilePurple  = function(col, row){ return $scope.board.tiles[col][row].color_index == 4; };
  $scope.isTileRed     = function(col, row){ return $scope.board.tiles[col][row].color_index == 5; };
  $scope.isTileRemoved = function(col, row){ return $scope.board.tiles[col][row].color_index == 0; };

  $scope.newGame = function() {
    GameBoard.initialize($scope.max_width, $scope.max_height);
    $scope.board = GameBoard;
  }

}]);
