
// Khai báo
var login = require("facebook-chat-api");
login(
    {
        email: "username",
        password: "pass"
    },
    function callback(err, api) {
        if (err) return console.error(err);

        api.setOptions({ forceLogin: true, selfListen: false, logLevel: "silent" });

        var checkIfAfterADay = true;
        var usersChatOneDay = []

        setInterval(() => {
            usersChatOneDay = []
        }, 60 * 60 * 8 * 1000)

        api.listen(function callback(err, message) {

            if(message !== undefined){
                if (message.body.toLowerCase().includes("getid") || message.body.toLowerCase().includes("get id")) {
                    console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                    api.sendMessage('id của bạn: ' + message.senderID, message.threadID);
                    // api.markAsRead(message.threadID);
                    console.log("Sender ID: " + message.senderID);
                    return
                }
                else if(message.body == 'các trường hợp người kia nhắn mà mày muốn bot trả lời'){
                    api.sendMessage('hiểu chưa', message.threadID);
                }
                
                else {
                    if (checkIfAfterADay && !usersChatOneDay.includes(message.threadID)) {
                        api.getUserInfo(message.senderID, function (err, ret) {
                            if (err) return console.error(err);
                            for (var prop in ret) {
                                if (ret.hasOwnProperty(prop) && ret[prop].name) {
                                    var gen = (ret[prop].gender.toString() == '1')? ("chị "):(ret[prop].gender.toString() == '2'? "anh ":"bạn ")
                                    api.sendMessage("Xin chào " + gen + ret[prop].name + ' 😍 \nEm là trợ lý của anh Huynh, anh ý đang bận làm cái gì á em cũng hông pit nữa 🙄🤔. \nTý xong việc em sẽ bảo anh Huynh rep lại ngay ạ ahihi ;) \niu thưn nà <3 ', prop, function () {
                                    });
                                    usersChatOneDay.push(message.threadID)
                                }
                            }
                        }); return;
                    }
                }
                
            }
            
        });
    })