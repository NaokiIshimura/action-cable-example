## Forked from
[SophieDeBenedetto/action\-cable\-example](https://github.com/SophieDeBenedetto/action-cable-example)

## Change point
- Add user authentication when connecting to ActionCable.
- Add user authentication when subscribing to ActionCable.
- Add access restrictions to chatrooms.

## Qiita
- [【ActionCable】チャンネル接続／購読時に認証を行う \- Qiita](https://qiita.com/NaokiIshimura/items/a63cdcbec5b64c5366b6)
- [【ActionCable】購読中のチャンネルをjsで取得／購読解除する \- Qiita](https://qiita.com/NaokiIshimura/items/140d902ef01ea9602aec)

---

## Chatty: The Rails 5 + Action Cable Example App

This is a really simple chatting app to demonstrate one implementation of Action Cable in a Rails 5 app. Users can sign up/log in with a username and create a chatroom or choose from an existing one to start real-time messaging.

For a walk-through of this application, and to learn more about Action Cable (it's awesome, btw), you can check out [my article on the Heroku blog](https://blog.heroku.com/archives/2016/5/9/real_time_rails_implementing_websockets_in_rails_5_with_action_cable). You can view my deployment of this application [here](https://action-cable-example.herokuapp.com), or you can use the button below to deploy your own version (you'll need a Heroku account for that).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

To view an implementation of this project that uses multipe subscriptions to multiple chatrooms, check out this [repo](https://github.com/SophieDeBenedetto/rails-5-action-cable-meetup)

### Running Locally

You'll need:

* Ruby 2.3.0
* Postgres
* Redis

Then, once you clone down this repo:

* `bundle install`
* `rake db:create; rake db:migrate`

And you're all set.


