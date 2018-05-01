class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_#{params['room']}_channel"
  end
end
