app.factory("GameBoard", function() {
  var board = {}

  board.width = 0;
  board.height = 0;
  board.tiles = new Array();
  board.selectedTiles = 0;
  board.score = 0;

  board.initialize = function(x, y) {
    board.score = 0;
    board.width = x;
    board.height = y;

    var array2D = new Array(x);
    for(var i = 0; i < array2D.length; i++)
    {
        array2D[i] = new Array(y);
    }
    for(var i = 0; i < x; i++)
    {
      for(var j = 0; j < y; j++)
      {
        array2D[i][j] = {
          color_index:  Math.floor((Math.random() * 5) + 1),
          selected: 0
        };
      }
    }

    this.tiles = array2D;

    return true;
  }

  var updateScore = function(numOfTiles){
    board.score += numOfTiles * numOfTiles * 50
  };

  board.selectPattern = function(col, row) {
    var tile = board.tiles[col][row];
    var color = tile.color_index;
    if ( tile.color_index == 0 ) { return; }

    if ( tile.selected == 1 ) {
      var numOfTiles = countSelectedTiles();
      updateScore(numOfTiles);
      removeSelectedTiles();
      clearSelectedTiles();
      dropHangingTiles();
      shiftEmptyColumns();
      shiftEmptyColumns();
    } else {
      clearSelectedTiles();
      selectTile(col, row, color);

      var count = countSelectedTiles();
      if (count == 1) {
        clearSelectedTiles();
      }
    }
  };

  var removeSelectedTiles = function(){
    for(var i = 0; i < board.width; i++)
    {
      for(var j = 0; j < board.height; j++)
      {
        if ( board.tiles[i][j].selected == 1 ) {
          board.tiles[i][j].color_index = 0;
        }
      }
    }
  };

  var dropHangingTiles = function(){
    for(var i = 0; i < board.width; i++)
    {
      for(var j = 1; j < board.height; j++)
      {
        if ( board.tiles[i][j].color_index == 0 && board.tiles[i][j - 1].color_index != 0 ) {
          board.tiles[i][j].color_index = board.tiles[i][j - 1].color_index;
          board.tiles[i][j - 1].color_index = 0;
          dropHangingTiles();
        }
      }
    }
  };

  var shiftEmptyColumns = function(){
    for(var i = board.width - 1; i > 0; i--)
    {
      var count = 0;
      for(var j = 0; j < board.height; j++)
      {
        if ( board.tiles[i][j].color_index == 0 ) {
          count += 1;
        }
      }
      if (count == board.height) {
        for(var j = 0; j < board.height; j++)
        {
          if ( board.tiles[i-1][j].color_index != 0) {
            board.tiles[i][j].color_index = board.tiles[i-1][j].color_index;
            board.tiles[i-1][j].color_index = 0;
          }
        }
      }
    }
  };

  var selectTile = function(col, row, color) {
    var tile = board.tiles[col][row];

    if ( tile.selected == 1) { return; }
    if ( tile.color_index != color ){ return; }

    board.tiles[col][row].selected = 1;

    if ( col > 0 ) { selectTile(col - 1, row, color); };
    if ( col < board.width - 1 )  { selectTile(col + 1, row, color); };
    if ( row > 0 ) { selectTile(col, row - 1, color); };
    if ( row < board.height - 1 ) { selectTile(col, row + 1, color); };
  };

  var countSelectedTiles = function () {
    var count = 0;
    for(var i = 0; i < board.width; i++)
    {
      for(var j = 0; j < board.height; j++)
      {
        if ( board.tiles[i][j].selected == 1 ) {
          count += 1;
        }
      }
    }
    return count;
  };

  var clearSelectedTiles = function() {
    for(var i = 0; i < board.width; i++)
    {
      for(var j = 0; j < board.height; j++)
      {
        board.tiles[i][j].selected = 0;
      }
    }
  };


  return board;
});
