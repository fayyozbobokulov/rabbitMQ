const amqp = require('amqplib');
const msg = {number: 19};
connect();  
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");

    channel.consume("jobs", msg => {
      const input = JSON.parse(msg.content.toString());
      console.log(`Received message: ${input.number}`);
      if(input.number == 19) {
        channel.ack(msg);
      }
    })
    console.log("Waiting for messages...");
  } catch (error) {
    console.log(error);    
  }
}