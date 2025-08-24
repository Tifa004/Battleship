export class Ship {
  constructor(length){
    this.length=length;
    this.numberOfHits=0;
  }

  hit(){
    this.numberOfHits++;
    return this.isSunk();
  }

  isSunk(){
    if(this.numberOfHits===this.length){
      return true;
    } else{
      return false;
    }
  }
}

export class Gameboard{
  constructor(){
    this.missedAttacks=0;
    this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ hit: false, ship: null })));
    this.lostShips=0;
  }
  
  
  placeShip(x, y, length, axis) {
    const ship = new Ship(length);
    const coords = [];

    for (let i = 0; i < length; i++) {
      let checkX = axis === 'X' ? x : x + i;
      let checkY = axis === 'X' ? y + i : y;

      if (checkX > 9 || checkY > 9) return false;

      if (this.board[checkX][checkY].ship !== null) return false;

      coords.push([checkX, checkY]);
    }

    coords.forEach(([cx, cy]) => {
      this.board[cx][cy].ship = ship;
    });

    return true;
  }

  receiveAttack(x,y){
    this.board[x][y].hit=true;
    if(this.board[x][y].ship!=null){
      if(this.board[x][y].ship.hit()){
        this.lostShips++;
      }
      return true;
    } else {
      this.missedAttacks++;
      return false;
    }
  }
}

export class Player {
  constructor(name,turn){
    this.name=name;
    this.Gameboard=new Gameboard()
    this.turn=turn;
  }

  switchTurn(){
    this.turn=!this.turn;
  }

}

