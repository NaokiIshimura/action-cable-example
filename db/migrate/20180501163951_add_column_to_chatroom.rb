class AddColumnToChatroom < ActiveRecord::Migration[5.2]
  def change
    add_column :chatrooms, :user_id, :integer
  end
end
