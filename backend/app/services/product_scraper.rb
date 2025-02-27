require "nokogiri"
require "httparty"
require "open-uri"

class ProductScraper
  def self.scrape(url)
    response = HTTParty.get(url, headers: { "User-Agent" => "Mozilla/5.0" })
    doc = Nokogiri::HTML(response.body)

    title = doc.at('meta[property="og:title"]')&.[]("content") || doc.title
    description = doc.at('meta[name="Description"]')&.[]("content") ||
                  doc.at('meta[property="og:description"]')&.[]("content")

    price_element = doc.at('div[class*="Nx9bqj"]') || doc.at('div[class*="CxhGGd"]')
    price = price_element&.text&.strip

    original_price_element = doc.at('div[class*="yRaY8j"]')
    original_price = original_price_element&.text&.strip

    discount_element = doc.at('div[class*="UkUFwK"] span')
    discount = discount_element&.text&.strip

    breadcrumb_links = doc.css("div.r2CdBx a.R0cyWM")
    category_name = breadcrumb_links[1]&.text&.strip || "Uncategorized"

    size_element = doc.at('li[class*="aJWdJI"] a.CDDksN') || doc.at('div[class*="V3Zflw"]')
    size = size_element&.text&.strip || "Not specified"

    seller_element = doc.at("div#sellerName span")
    contact_info = seller_element&.text&.strip || "Unknown"

    image_elements = doc.css("img._0DkuPH, img._53J4C-").map { |img| img["src"] }.uniq
    images = image_elements.reject { |src| src.nil? || src.empty? }
  
    {
      title: title,
      description: description,
      price: price || "N/A",
      original_price: original_price || "N/A",
      discount: discount || "N/A",
      category_name: category_name,
      images: images,
      url: url,
      size: size,
      contact_info: contact_info,
      scraped_at: Time.current
    }
  end
end
