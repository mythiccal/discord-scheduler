const { Client, GatewayIntentBits, Partials } = require('discord.js');
const cron = require('node-cron');

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const token = 'BOT TOKEN HERE';
const channelId = 'DISCORD CHANNEL ID HERE';

//0 = sunday
const messagesByDay = {
  0: 'Sunday Message',
  1: 'Monday Message',
  2: 'Tuesday Message',
  3: 'WEdnesday Message',
  4: 'ThursDay Message',
  5: 'Friday Message',
  6: 'Saturday Message',
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);

const sendScheduledMessage = () => {
  const dayOfWeek = new Date().getDay();
  const message = messagesByDay[dayOfWeek];

  if (!message) {
    console.error('Invalid day of the week.');
    return;
  }

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send(message);
    console.log('Message sent:', message);
  } else {
    console.error('Invalid channel.');
  }
};

// Schedule to send messages every day at 12:00 PM (change the cron expression to your desired time)
cron.schedule('0 19 * * *', sendScheduledMessage);
