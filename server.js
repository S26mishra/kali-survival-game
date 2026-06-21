const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-Memory Player Database Save Room
let playerData = {
    level: 1,
    combatPower: 10,
    gold: 0,
    equipment: [],
    logMessage: "System standby. Ready to receive commands..."
};

// Item drops pools for battle rewards
const itemDrops = ["Iron Sword", "Steel Shield", "Survival Boots", "Ruby Ring", "Shadow Cloak"];

// Route to get current player numbers
app.get('/api/game', (req, res) => {
    res.json(playerData);
});

// Route to process dashboard click events
app.post('/api/game', (req, res) => {
    const { action } = req.body;

    if (action === 'complete') {
        playerData.level += 1;
        playerData.combatPower += 7;
        playerData.gold += 25; // Gives 25 Gold per level completion!
        playerData.logMessage = `✨ Level Complete! Advanced successfully to level ${playerData.level}. (+25g)`;
    } 
    else if (action === 'battle') {
        // Drop a random piece of gear from our array pool
        const randomItem = itemDrops[Math.floor(Math.random() * itemDrops.length)];
        
        if (!playerData.equipment.includes(randomItem)) {
            playerData.equipment.push(randomItem);
        }
        
        playerData.gold += 50; // Gives 50 Gold for winning a battle
        playerData.combatPower += 15;
        playerData.logMessage = `⚔️ Battle Won! Found [${randomItem}] and looted 50 gold coins!`;
    }

    res.json(playerData);
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Backend server running live!`);
});