class User < ActiveRecord::Base
  has_secure_password

  has_many :workout

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :password, presence: true
  validates :password_confirmation, presence: true
  validates :password, confirmation: { case_sensitive: true }
  validates :password, length: {minimum:4}
  
  def self.authenticate_with_credentials(email,password)
    user = User.find_by_username(username)
    if user && user.authenticate(password)
      user
    else 
      nil
    end
  end


end
