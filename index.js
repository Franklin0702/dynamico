const Discord = require('discord.js');
const client = new Discord.Client(); 


client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`);
    let games = []; 
    
    for(let channel of client.channels.cache.array()) {
        if (channel.type === 2) {
            let channelGuild = client.guilds.resolve(channel.id);
            for(let presence of channelGuild.presences.cache.array()) {
                games.push([...presence.activities.filter(act => act.type === 'PLAYING')])
            }
        }
    }

    console.log('Games: \n', games); 
})

client.on('presenceUpdate', (oldMember, newMember) => {
    let games = newMember.activities.filter(act => act.type === 'PLAYING'); 
    console.log(games.length);
    if (games.length > 0) {
        console.log(oldMember); 
        oldMember.member.voice.channel.setName(`Jugando ${games[0].name}`).then(channel => {
            
            console.log('new name: ', channel.name);
        });
    }
    
});

// client.on('message', msg => {
//     if (msg.content.startsWith('!changename ')) {
//       let parameters = []; 
//       parameters.push(msg.content.substr('!ccn '.length).split(' ')); 
//       console.log(parameters[0]);
      
//       let channelName = parameters[0];
//       let newName = parameters[1]; 
      
//       msg.channel.setName(parameters[0])
//       .then((value) => {
//           msg.channel.send(`Channel was renamed as ${parameters[0]}`); 
//       })
//       .catch((error) => {
//           msg.channel.send(`Can't not change name of the channel`); 
//           console.error(error); 
//       });
//     }
//   });

  client.login('NzMxNjAzMzc5ODg4ODQ5MDY3.XwodkA.kB4gM0KbPdW9pKr1sgzZ4TELkPE'); 



