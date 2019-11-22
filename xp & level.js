//This is just simple version of my main bot code very messy but works 
//mysql XP|LEVELS| Bot
// koko#0012






const { RichEmbed } = require("discord.js")
const config = require ("../../json/main-db.json");
const mysql = require('mysql');
const connection = mysql.createConnection(config)

let levelup = 1500; //how much xp need for level up
let purple = `RANDOM`;

function generateXp() { //Generating XP
return Math.floor(Math.random() * (10 - 5 + 1))+ 5; //between 10 and 5 is the amount xp you gain
}






//Add command handler ->

connection.query(`SELECT * FROM account WHERE id = '${message.author.id}'`, function (err, rows) { //selecting user id
    if (err) throw err;

    if(rows.length < 1) { //if the user has no info in table | no id it inserts ID - XP - LEVEL 
        sql = `INSERT INTO account (id, xp, level) VALUES ('${message.author.id}', '${generateXp()}', ${lvl})`
    } else {
            let xp = rows[0].xp; //xp = the amount xp in database

            sql = `UPDATE account SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`; //update xp

            let nxtLvl = rows[0].level * levelup;  //how many +1 level per xp points

            if(nxtLvl <= rows[0].xp){ //If level supass that amount it 
            connection.query(`UPDATE account SET level = ${rows[0].level + 1} WHERE id = '${message.author.id}'`) //updates level
            }

            //levelup message 
            if(nxtLvl <= rows[0].xp){
            const lvlup = new RichEmbed()
            .setDescription(`Hello, ${message.author.username} you leveled up to ${rows[0].level + 1}`)
            .setColor(purple)
            message.channel.send(lvlup)
            }
    }

connection.query(sql)
})
