// Entry point CSS import
import "./styles.css";
import {Player} from './gameClasses'

const gameContainer=document.querySelector('.game-container');
const boardContainer=document.querySelector('.board-container');
const board=document.querySelector('.board');
const single=document.getElementById('1-player');
const double=document.getElementById('2-players');
const inputs=document.querySelector('.player-inputs');
const fightDiv = document.querySelector('.fight'); 
let army={'Carrier':5,'Battleship':4,'Destroyer':3,'Submarine':3,'Patrolboat':2}; //Carrier5,Battleship4,destroyer3,submarine3,patrolboat2
let inputDiv,ship,shipName,multi,startBtn,player1,player2,name,axisBtn,boardCopy;
let isGameOver = false;

function gameEnd(player,boardContainerSelector){
  inputs.remove();
  document.querySelector('.title').remove();
  const endGame = document.createElement('div');
  endGame.className='endGame';
  const winner=document.createElement('div');
  winner.className='winner';
  winner.innerText=`${player.name} is the winner`;
  const stats=document.createElement('div');
  stats.className = 'stats';

  stats.innerHTML = `
    <div class="stat-number">Attacks Evaded: ${player.Gameboard.missedAttacks}</div>
    <div class="stat-number">Ships Lost: ${player.Gameboard.lostShips}</div>
  `;
  endGame.appendChild(winner);
  endGame.appendChild(stats);
  gameContainer.appendChild(endGame);

  const boardContainer = document.querySelector(boardContainerSelector);
  boardContainer.remove();
  if(player===player1){
    document.querySelectorAll('.p1').forEach(btn=>btn.style.cursor='default');
  } else{
    document.querySelectorAll('.p2').forEach(btn=>btn.style.cursor='default');

  }
}

function checkGameEnd() {
  if (isGameOver) return;

  if (player1.Gameboard.lostShips === 5) {
    isGameOver = true;
    gameEnd(player2, '.board-container:first-child');
  } else if (player2.Gameboard.lostShips === 5) {
    isGameOver = true;
    gameEnd(player1, '.board-container:last-child');
  }
}

function game() {
  if (isGameOver) return;

  if (player1.turn) {
    inputs.innerHTML=`${player1.name}'s turn`;
    const enemyButtons = document.querySelectorAll('.p2');
    enemyButtons.forEach(btn => {
      btn.disabled = btn.classList.contains('hit') || btn.classList.contains('miss');
      btn.style.cursor=btn.disabled?btn.style.cursor:'pointer';
      btn.classList.add('not-my-turn');
    });
    if(multi){
      const myButtons = document.querySelectorAll('.p1');
      myButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor='not-allowed';
        btn.classList.remove('not-my-turn');
      });
    }
    
  } 
  else {
    if(!multi){
      inputs.innerHTML=`${player2.name}'s turn`;
      const myButtons = document.querySelectorAll('.p1');
      myButtons.forEach(btn => btn.disabled = true);

      setTimeout(() => {
        if (isGameOver) return;

        pcAttack();
        checkGameEnd(); 
        if (!isGameOver) {
          switchTurn();
        };
        game();
      }, 500); 
    } 
    else {
      inputs.innerHTML=`${player2.name}'s turn`;
      const enemyButtons = document.querySelectorAll('.p1');
      enemyButtons.forEach(btn => {
        btn.disabled = btn.classList.contains('hit') || btn.classList.contains('miss');
        btn.style.cursor=btn.disabled?'not-allowed':'pointer';
        btn.classList.add('not-my-turn');
      });
      const myButtons = document.querySelectorAll('.p2');
      myButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor='not-allowed';
        btn.classList.remove('not-my-turn');
      });
    }
  }
}

function switchTurn(){
  player2.switchTurn();
  player1.switchTurn();
}

function pcAttack() {
  let attacked = false;

  while (!attacked) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    const btn = document.querySelector(`.board .p1[data-x="${x}"][data-y="${y}"]`);

    if (!btn.classList.contains("hit") && !btn.classList.contains("miss")) {
      if (player1.Gameboard.receiveAttack(x, y)) {
        btn.classList.add("hit");
      } else {
        btn.classList.add("miss");
      }
      btn.disabled = true;
      attacked = true;
    }
  }

}

function placeEnemyShips() {
  for (let ship of [{name:'Carrier'   ,length:5},
                    {name:'BattleShip',length:4},
                    {name:'Destroyer' ,length:3},
                    {name:'Submarine' ,length:3},
                    {name:'Patrolboat',length:2}]) {

    let placed = false;

    while (!placed) {
      const axis = Math.random() < 0.5 ? "X" : "Y";
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (player2.Gameboard.placeShip(x,y,ship.length,axis)) {
        placed = true;
      }
    }
  }
  game();
}

function pcBoard(){
  // --- Friendly Board Container (already exists) ---
  const friendlyContainer = document.querySelector('.board-container');

  // Create Friendly title
  const friendlyTitle = document.createElement('div');
  friendlyTitle.className='title';
  friendlyTitle.textContent = `${player1.name}'s Map`;
  friendlyContainer.prepend(friendlyTitle);

  // --- Enemy Board Container ---
  const enemyContainer = document.createElement('div');
  enemyContainer.className = 'board-container'; 

  // Create Enemy title
  const enemyTitle = document.createElement('div');
  enemyTitle.className='title';
  enemyTitle.textContent = `${player2.name}'s Map`;
  enemyContainer.appendChild(enemyTitle);

  // Create Enemy board
  const board2 = document.createElement('div');
  board2.className = 'board';
  enemyContainer.appendChild(board2);

  // Append enemy container to fightDiv
  fightDiv.appendChild(enemyContainer);

  for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const button = document.createElement('button');
        button.className='p2';
        button.setAttribute('data-x', x);
        button.setAttribute('data-y', y);
        button.addEventListener('click', () => {
          const x = Number(button.dataset.x);
          const y = Number(button.dataset.y);

          if (player2.Gameboard.receiveAttack(x, y)) {
            button.classList.add("hit");
          } else {
            button.classList.add("miss");
          }

          document.querySelectorAll('.p2').forEach(btn => {  
            btn.disabled = true;
            btn.style.cursor='not-allowed';
          });

          checkGameEnd();
          if (!isGameOver) {
            switchTurn();
            game();
          }
        });
        board2.appendChild(button);
      }
  }
  placeEnemyShips();
}

function toggleBtns(axis, x, y, length) {
  let buttons = [];

  if (axis === "Axis X") {
    if (y + length - 1 > 9) return null;

    for (let i = 0; i < length; i++) {
      const btn = document.querySelector(
        `button[data-x="${x}"][data-y="${y+i}"]`
      );
      if (!btn || btn.classList.contains("placed-ship")) {
        return null; 
      }
      buttons.push(btn);
    }
  } else {
    if (x + length - 1 > 9) return null;

    for (let i = 0; i < length; i++) {
      const btn = document.querySelector(
        `button[data-x="${x+i}"][data-y="${y}"]`
      );
      if (!btn || btn.classList.contains("placed-ship")) {
        return null; 
      }
      buttons.push(btn);
    }
  }

  buttons.forEach(btn => btn.classList.toggle("button-hover"));
  return true;
}

function createPlayerBoard(player){
  for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const button = document.createElement('button');
        button.className=player===player1?'p1':'p2';
        button.setAttribute('data-x', x);
        button.setAttribute('data-y', y);

        const handleMouse=(e)=>{
          const x = Number(e.currentTarget.dataset.x);
          const y = Number(e.currentTarget.dataset.y);
          if(!toggleBtns(axisBtn.textContent,x,y,ship)){
            if(e.type==='dragleave' )
              e.currentTarget.classList.remove('invalid-hover');
            else
              e.currentTarget.classList.add('invalid-hover');
        }};
        
        button.addEventListener('dragenter',handleMouse);
        button.addEventListener('dragover',e=>e.preventDefault());
        button.addEventListener('dragleave',handleMouse);
        button.addEventListener('drop',(e)=>{
          if(!button.classList.contains('invalid-hover')){
            e.preventDefault();
            document.querySelector(`.items.${shipName}`)?.remove();
            const x=Number(button.dataset.x);
            const y=Number(button.dataset.y);
            const valid = toggleBtns(axisBtn.textContent, x, y, ship);

            if (!valid) {
              return; 
            }

            const shipPlaced=(btn)=>{
              btn.disabled=true;
              btn.classList.remove('button-hover');
              btn.classList.add('placed-ship');
            };

            if(axisBtn.textContent==='Axis X'){
              for(let i=0;i<ship;i++){
                const btn = document.querySelector(`button[data-x="${x}"][data-y="${y+i}"]`);
                shipPlaced(btn);
              }
            } else {
              for(let i=0;i<ship;i++){
                const btn = document.querySelector(`button[data-x="${x+i}"][data-y="${y}"]`);
                shipPlaced(btn);
            }}
            
            player.Gameboard.placeShip(x,y,ship,axisBtn.textContent[axisBtn.textContent.length-1])
            
            if(document.querySelectorAll('.items').length===0){
              inputs.innerHTML=`Moving into Positions General ${name.value}`;
              const allButtons = board.querySelectorAll("button");
              if(player===player2){allButtons.forEach(btn => {
                const clone=btn.cloneNode(true);
                if(multi){
                  clone.addEventListener('click',()=>{
                    const x = Number(btn.dataset.x);
                    const y = Number(btn.dataset.y);
                    if (player.Gameboard.receiveAttack(x, y)) {
                      clone.classList.add("hit");       
                    } else {
                      clone.classList.add("miss");     
                    }
                    clone.disabled = true; 
                    checkGameEnd();
                    if(!isGameOver){
                      setTimeout(()=>{
                        switchTurn();
                        game();
                      },2000)}
                  });
                } else{
                  clone.style.cursor='not-allowed'
                }
                btn.replaceWith(clone);
              });}
              if(!multi){
                pcBoard(); 
              } 
              else{
                const nxtBtn=document.createElement('button');
                nxtBtn.id='nxt'
                nxtBtn.textContent='Next';
                document.querySelectorAll('.p1').forEach(btn=>btn.disabled=true);
                if(player===player1){
                  nxtBtn.addEventListener('click',()=>{
                    document.querySelectorAll('.p1').forEach(btn=>btn.disabled=false);
                    nxtBtn.remove();
                    const friendlyTitle = document.createElement('div');
                    friendlyTitle.className='title';
                    friendlyTitle.textContent = `${player1.name}'s Map`;
                    boardContainer.prepend(friendlyTitle);
                    boardCopy=boardContainer.cloneNode(true);
                    board.innerHTML='';
                    friendlyTitle.remove();
                    startPage(true);
                  });
                  boardContainer.appendChild(nxtBtn);
                } 
                else{
                  document.querySelectorAll('.p2').forEach(btn=>btn.disabled=true);
                  setTimeout(() => {
                    document.querySelectorAll('.p2').forEach(btn=>btn.disabled=false);
                    const friendlyTitle = document.createElement('div');
                    friendlyTitle.className='title';
                    friendlyTitle.textContent = `${player2.name}'s Map`;
                    boardContainer.prepend(friendlyTitle);
                    fightDiv.prepend(boardCopy);
                    document.querySelectorAll('.p1').forEach(btn => {
                      btn.addEventListener('click',()=>{
                        const x = Number(btn.dataset.x);
                        const y = Number(btn.dataset.y);
                        if (player1.Gameboard.receiveAttack(x, y)) {
                          btn.classList.add("hit");       
                        } else {
                          btn.classList.add("miss");     
                        }
                        btn.disabled = true; 
                        checkGameEnd();
                        if(!isGameOver){
                          setTimeout(()=>{
                            switchTurn();
                            game();
                          },2000)}
                      })});
                    game();
                  }, 1000);
                }
              }
            } 
        }
        button.classList.remove('invalid-hover');
        ship = null;
        shipName=null;})
        board.appendChild(button);

      }
    }
    
}

function startPage(nxt){

  inputs.innerHTML=`<div><input type="text" id="player" placeholder="Player Name" /></div>
                         <button id="startBtn">Place Ships</button>`;
  startBtn=document.querySelector('#startBtn');
  inputDiv=document.querySelector('.player-inputs div');
  name=document.querySelector('#player');
  name.addEventListener('input', () => {
    name.setCustomValidity('');
  });
  startBtn.addEventListener('click',()=>{
    if(name.value===''){
      name.setCustomValidity('Enter a Valid Name');
      name.reportValidity();
    } 
    else{
      const dragNdrop=document.createElement('div');
      dragNdrop.innerHTML=`
        <div class="items Carrier" draggable=true>Carrier</div>
        <div class="items Battleship" draggable=true>Battleship</div>
        <div class="items Destroyer" draggable=true>Destroyer</div>
        <div class="items Submarine" draggable=true>Submarine</div>
        <div class="items Patrolboat" draggable=true>Patrolboat</div>`

      dragNdrop.classList.add('selectables');
      inputs.replaceChild(dragNdrop,inputs.firstChild);
      document.querySelectorAll('.items').forEach(item=>{
        item.addEventListener('dragstart',()=>{
          shipName=item.classList[1];
          ship=army[shipName];
        })
      })
      axisBtn=startBtn.cloneNode(true);
      startBtn.replaceWith(axisBtn);
      axisBtn.id='';
      axisBtn.textContent='Axis X';
      axisBtn.addEventListener('click',()=>{
        axisBtn.textContent=axisBtn.textContent==='Axis X'?'Axis Y':'Axis X';
      })
      if(!nxt){
        player1 = new Player(name.value,true);
        window.p1=player1;
        createPlayerBoard(player1);
      } else{
        player2 = new Player(name.value,false);
        window.p2=player2;
        createPlayerBoard(player2);
      }
    }
})
};


single.addEventListener('click',()=>{
  multi=0;
  player2=new Player('Enemy',false);

window.p2=player2;
  startPage(false);

})

double.addEventListener('click',()=>{
  multi=1;
  startPage(false);
})





