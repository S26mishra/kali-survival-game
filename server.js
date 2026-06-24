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
        playerData.combatPower += 5;
        playerData.gold += Math.floor(Math.random() * 50) + 10;
        
        const randomItem = itemDrops[Math.floor(Math.random() * itemDrops.length)];
        playerData.equipment.push(randomItem);
        playerData.logMessage = `Success! Advanced to Level ${playerData.level}. Dropped: ${randomItem}`;
    } else if (action === 'reset') {
        playerData.level = 1;
        playerData.combatPower = 10;
        playerData.gold = 0;
        playerData.equipment = [];
        playerData.logMessage = "System reset initialized. Values returned to starting standard.";
    }

    res.json(playerData);
});

app.listen(PORT, () => {
    console.log(`Server executing successfully on port http://localhost:${PORT}`);
});
