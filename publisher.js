const amqp = require('amqplib');
const msg = {number: 5};
connect();  
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log("Message sent successfully");
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);    
  }
}