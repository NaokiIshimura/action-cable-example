$(document).on('turbolinks:load', function() {
    chatroomId = $('input#message_chatroom_id').val();
    if (App.messages) App.cable.subscriptions.remove(App.messages);
    App.messages = App.cable.subscriptions.create({channel: 'MessagesChannel', chatroom_id: chatroomId}, {
        received: function(data) {
            $("#messages").removeClass('hidden');
            return $('#messages').append(this.renderMessage(data));
        },
        chatroom_id: function(data) {
            return data.chatroom_id
        },
        renderMessage: function(data) {
            return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
        }
    });
})
