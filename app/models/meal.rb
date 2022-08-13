class Meal < ApplicationRecord
  belongs_to :user
  has_many :line_foods
end
