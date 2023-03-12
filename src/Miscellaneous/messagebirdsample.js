const messagebird=require('messagebird')('Q0DLsA8sAEfP2xiB01YjaLto7')

messagebird.messages.create({
    originator : '+9779817403494',
    recipients : [ '+9779817403494'],
    body : 'Hello World, I am text meassage!'
 },function (err, response) {
    if (err) {
       console.log("ERROR:");
       console.log(err);
   } else {
       console.log("SUCCESS:");
       console.log(response);
   }
})
 
 