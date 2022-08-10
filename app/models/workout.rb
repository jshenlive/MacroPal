class Workout < ApplicationRecord
  belongs_to :user
  has_many :line_exercises

end
