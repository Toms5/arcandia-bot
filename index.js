const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const bdd = require('./bdd.json');
const fs = require("fs");

bot.on("ready", async () =>{
    console.log("Démarrage effectué avec succès")
    bot.user.setStatus("dnd")
    bot.user.setActivity("Développé par Tom's | !help", {type: 'STREAMING', url: "https://twitch.tv/tom_s__"})
})

bot.on("message", message => {
    if(message.content.startsWith("!warn")){
        message.delete()
        if(message.member.hasPermission('BAN_MEMBERS')){

            if(!message.mentions.users.first())return message.channel.send(`Merci d'indiquer un joueur à avertir.`);
            utilisateur = message.mentions.users.first().id
            user = message.mentions.users.first()

            if(bdd["warn"][utilisateur] == 2){
                message.channel.send(`${user} a été banni. Il avait atteint 3 avertissements.`)
                message.guild.members.ban(utilisateur)
            }
            else{
                if(!bdd["warn"][utilisateur]){
                    bdd["warn"][utilisateur] = 1
                    Savebdd();
                    message.channel.send(`${user} a à présent ${bdd["warn"][utilisateur]} avertissement(s).`)
                }
                else{
                    bdd["warn"][utilisateur]++
                    Savebdd();
                    message.channel.send(`${user} a à présent ${bdd["warn"][utilisateur]} avertissement(s).`)
                }
            }
        }
    }
    if(message.content.startsWith("!ban")){
        message.delete()
        if(message.member.hasPermission("BAN_MEMBERS")){
            if(!message.mentions.users.first())return ("Veuillez indiquer le joueur à bannir.")
            utilisateur = message.mentions.users.first().id
            user = message.mentions.users.first()

            message.channel.send(`${user} a été banni.`)
            message.guild.members.ban(utilisateur)
        }
    }
})

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    })
}



bot.login(process.env.TOKEN);