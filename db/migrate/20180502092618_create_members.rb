class CreateMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :members do |t|
      t.integer :chatroom_id
      t.integer :user_id

      t.timestamps
    end
  end
end
