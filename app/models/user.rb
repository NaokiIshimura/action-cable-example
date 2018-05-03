class User < ApplicationRecord
  has_many :messages
  has_many :chatrooms, through: :messagesd
  has_many :member
  
  validates :username, presence: true, uniqueness: true
  
  ##
  # Confirm that the user is the owner of the chat room.
  # @params [Model]   chatroom
  # @return [Boolean]
  def is_owner?(room)
    if room.user_id == self.id
      true
    else
      false
    end
  end
  
  ##
  # Confirm that the user is the member of the chat room.
  # @params [Model]   chatroom
  # @return [Boolean]
  def is_member?(room)
    if Member.find_by(chatroom_id: room.id, user_id: self.id)
      true
    else
      false
    end
  end
  
  ##
  # Confirm that the user can access the chat room.
  # @params [Model]   chatroom
  # @return [Boolean]
  def can_access?(room)
    if self.is_member? (room)
      true
    elsif self.is_owner?(room)
      true
    else
      false
    end
  end
end
