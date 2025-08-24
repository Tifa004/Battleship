# 🚢 Battleship Game  

A modern, interactive implementation of the classic **Battleship** strategy game built with **vanilla JavaScript, HTML, and CSS**.  
Play against the computer in **1-Player mode** or challenge a friend in **2-Player mode**!  

---

## ✨ Features  

### 🎮 Game Modes  
- **1-Player Mode**:  
  - Play against an AI opponent.  
  - AI places its ships randomly and makes attacks automatically.  

- **2-Player Mode**:  
  - Both players set up their fleets.  
  - Turn-based gameplay with hidden enemy boards.  
  - Pass-and-play system with “Next” button for fairness.  

---

### 🛠️ Ship Placement  
- Drag and drop ships onto your grid.  
- Toggle orientation with the **Axis Button** (`Axis X` / `Axis Y`).  
- Ships highlight possible placements:  
  - **Blue glow** → valid placement.  
  - **Red glow** → invalid placement.  
- Ships cannot overlap or extend outside the grid.  

---

### ⚔️ Gameplay Mechanics  
- Click on enemy tiles to launch attacks.  
- Attacks show visually:  
  - **Red tile** → Hit.  
  - **Blue tile** → Miss.  
- Ships track damage internally and sink when all coordinates are hit.  
- The game ends when one player loses **all 5 ships**.  

---

### 🖥️ User Interface  
- Sleek **space-themed design** with glowing highlights.  
- Dynamic **hover states** for better UX.  
- Each player’s board is labeled with their name.  
- End-game screen showing:  
  - 🛡️ **Attacks Evaded** (missed enemy shots).  
  - 🚢 **Ships Lost**.  
  - 👑 **Winner announcement**.  

---

## 📂 Project Structure  

```plaintext
├── index.html       # HTML entry point  
├── styles.css       # CSS styles (layout, board, animations)  
├── main.js          # Game logic (players, attacks, turns)  
├── gameClasses.js   # Player & Gameboard class definitions  
└── space.jpg        # Background image
```

---

## 🎮 How to Play  

1. **Place Your Ships**  
   - Drag and drop ships onto your grid.  
   - Use the **Axis button** to rotate ships (horizontal/vertical).  

2. **Start the Game**  
   - Once all ships are placed, the battle begins.  

3. **Take Turns**  
   - Click on enemy grid cells to fire.  
   - A **hit** will mark part of a ship, a **miss** will be shown clearly.  

4. **Sink Ships**  
   - When all parts of a ship are hit, it is sunk.  

5. **Win Condition**  
   - The first player to sink all opponent ships wins the game.  

---

## 🧩 Technologies Used  
- **HTML5** – Structure & layout.  
- **CSS3** – Responsive styling, hover effects, neon highlights.  
- **JavaScript (ES6+)** – Game logic, drag-and-drop mechanics, AI behavior.  

---

## 🏆 Future Improvements  
- Smarter AI (target adjacent cells after a hit).  
- Animations for sinking ships.  
- Mobile-friendly controls.  
- Sound effects and background music.  
