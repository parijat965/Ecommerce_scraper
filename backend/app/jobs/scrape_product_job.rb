require "open-uri"
class ScrapeProductJob < ApplicationJob
  queue_as :default

  def perform(url)
    data = ProductScraper.scrape(url).transform_keys(&:to_s)
    return if data.nil? || data.empty?
    category = Category.find_or_create_by(name: data["category_name"])
    product = Product.find_or_initialize_by(url: url)
    product.update(
      title: data["title"],
      description: data["description"],
      price: data["price"],
      original_price: data["original_price"],
      discount: data["discount"],
      category: category,
      size: data["size"],
      contact_info: data["contact_info"],
      scraped_at: data["scraped_at"]
    )
    if data["images"].present?
      product.images.purge
      data["images"].each do |image_url|
        begin
          image_file = URI.open(image_url)
          product.images.attach(io: image_file, filename: File.basename(image_url), content_type: "image/jpeg")
        rescue => e
          Rails.logger.error "Failed to attach image #{image_url}: #{e.message}"
        end
      end
    end
  end
end
