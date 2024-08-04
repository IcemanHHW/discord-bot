import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    /* Emoji's */
    const emojiPatern = /:([a-zA-Z0-9_]+):/g;
    const matches = message.content.matchAll(emojiPatern);
    const serverEmojis = message.guild.emojis.cache.map(emoji => emoji.name);

    for (const match of matches) {
        const emojiName = match[1];
        if (!serverEmojis.includes(emojiName)) {
            const response = `:${emojiName}:`;
            await message.channel.send(response);
        }
    }

    /* "I love you" reply */
    const botMention = `<@${client.user.id}>`;
    if (message.content.includes(botMention) && /do you love me/i.test(message.content)) {
        if (message.author.username === 'insanez301') {
            await message.channel.send(`I love you ${message.author} but I will destroy you`);
        } else {
            await message.channel.send(`I love you ${message.author}`);
        }
    }

});

client.login(process.env.DISCORD_TOKEN);