class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :original_price, :discount, :size, 
  :contact_info, :url, :scraped_at, :images


  belongs_to :category

  def images
  object.images.map { |img| Rails.application.routes.url_helpers.url_for(img) } if object.images.attached?
  end
end
