class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :meal
end
