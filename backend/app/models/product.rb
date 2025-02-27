class Product < ApplicationRecord
  has_many_attached :images
  belongs_to :category

  validates :title, presence: true

end
