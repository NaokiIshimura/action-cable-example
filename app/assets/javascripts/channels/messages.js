// ページ切り替え時（初回ページも対象になる）に実行する
$(document).on('turbolinks:load', function () {

    console.log('__________load__________');

    var channel = "MessagesChannel";
    var room = $('input#message_chatroom_id').val();

    // 指定したDOMが存在する場合、
    if (room) {
        // 他のチャンネルを購読解除する
        //removeUnspecifiedChannel(channel, room);

        // チャンネルが存在しない場合、
        if (countSpecifieChannel(channel, room) == 0) {
            // チャンネルを購読する
            createChannel(channel, room);
        }


    }
    // 指定したDOMが存在しない場合、
    else {
        // すべてのチャンネルを購読解除する
        //removeAllChannel();
    }

    // デバッグ用
    logOutputChannel();

})

// チャンネルを購読する
function createChannel(channel, room) {
    console.log('createChannel channel:' + channel + ',room:' + room)

    App.cable.subscriptions.create({channel: channel, room: room}, {
        // サブスクリプションがサーバー側で利用可能になると呼び出される
        connected: function () {
            console.log('< connected >');
            return $('#messages').append("<p><b>debug:</b> ActionCable connected</p>");
        },
        // WebSocket接続が閉じると呼び出される
        disconnected: function () {
            console.log('< disconnected >');
            return $('#messages').append("<p><b>debug:</b> ActionCable disconnected</p>");
        },
        // サブスクリプションがサーバーに拒否されると呼び出される
        rejected: function () {
            console.log('< rejected >');
            return $('#messages').append("<p><b>debug:</b> ActionCable rejected</p>");
            return
        },
        received: function (data) {
            $("#messages").removeClass('hidden');
            return $('#messages').append(this.renderMessage(data));
        },
        room: function (data) {
            return data.room
        },
        renderMessage: function (data) {
            // 現在のroomとメッセージで指定されてるroomと一致してる場合、
            var current_page_room = $('input#message_chatroom_id').val();
            if (current_page_room == data.room) {
                // メッセージを追加する
                return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
            } else {
                return
            }
        },
    });
}

/**
 * すべてのチャンネルの購読を解除する
 */
function removeAllChannel() {
    console.log('removeAllChannel');

    var subscriptions = App.cable.subscriptions['subscriptions'];

    subscriptions.forEach(function (subscription) {
        App.cable.subscriptions.remove(subscription);
    });

}

/**
 * 指定したチャンネルの購読を解除する
 * @param {string} channel チャンネル名
 * @param {string} room    チャットルームID
 */
function removeSpecifiedChannel(channel, room) {
    console.log('removeSpecifiedChannel channel:' + channel + ',room:' + room);

    var subscriptions = App.cable.subscriptions['subscriptions'];

    subscriptions.forEach(function (subscription) {
        var identifier = subscription.identifier;

        obj = JSON.parse(identifier);

        if (channel == obj.channel && room == obj.room) {
            App.cable.subscriptions.remove(subscription);
        }

    });
}

/**
 * 指定したチャンネル以外の購読を解除する
 * @param {string} channel チャンネル名
 * @param {string} room    チャットルームID
 */
function removeUnspecifiedChannel(channel, room) {
    console.log('removeUnspecifiedChannel channel:' + channel + ',room:' + room);

    var subscriptions = App.cable.subscriptions['subscriptions'];
    subscriptions.forEach(function (subscription) {
        var identifier = subscription.identifier;

        obj = JSON.parse(identifier);

        if (channel != obj.channel || room != obj.room) {
            App.cable.subscriptions.remove(subscription);
        }

    });
}


/**
 * 指定したチャンネルの購読数を取得する
 * @param channel    チャンネル名
 * @param room       チャットルームID
 * @returns {number} 購読数
 */
function countSpecifieChannel(channel, room) {
    console.log('countSpecifieChannel channel:' + channel + ',room:' + room);

    var i = 0;

    var subscriptions = App.cable.subscriptions['subscriptions'];
    subscriptions.forEach(function (subscription) {
        var identifier = subscription.identifier;

        obj = JSON.parse(identifier);

        if (channel == obj.channel && room == obj.room) {
            i += 1;
        }

    });

    console.log('> count:' + i)
    return i;

}

/**
 * すべてのチャンネルの購読数を取得する
 * @returns {number} 購読数
 */
function countAllChannel() {
    console.log('countAllChannel');

    var count = App.cable.subscriptions['subscriptions'].length;
    console.log('> count:' + count);

    return count;

}

/**
 * 【デバッグ用】購読中のチャンネル情報をログ出力する
 */
function logOutputChannel() {
    console.log('++++++++++debug++++++++++');
    console.log('Subscribed channel');

    // 購読中のチャンネル数
    var count = App.cable.subscriptions['subscriptions'].length;
    console.log('> count:' + count);

    // 購読中のチャンネル情報
    var subscriptions = App.cable.subscriptions['subscriptions'];
    subscriptions.forEach(function (subscription) {
        var identifier = subscription.identifier;

        obj = JSON.parse(identifier);
        //=> {channel: "MessagesChannel", room: "1"}

        console.log('> channnel:' + obj.channel + ',room:' + obj.room);

    });
    console.log('+++++++++++++++++++++++++');
}
