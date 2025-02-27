class Api::ProductsController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    products = Product.all
    products = products.where(category_id: params[:category_id]) if params[:category_id].present?
    products = products.where("title ILIKE ?", "%#{params[:search]}%") if params[:search].present?
    products = products.page(params[:page]).per(6)
  
    render json: {
      products: ActiveModelSerializers::SerializableResource.new(products, each_serializer: ProductSerializer),
      meta: { total_pages: products.total_pages, current_page: products.current_page }
    }, status: :ok
  end
  
  def create
    url = params[:url]
    ScrapeProductJob.perform_later(url) 
    render json: { message: "Scraping initiated" }, status: :accepted
  end
  def refetch
    product = Product.find(params[:id])
    if product.scraped_at < 1.week.ago
      ScrapeProductJob.perform_later(product.url)
      render json: { message: "Refetching product data..." }, status: :accepted
    else
      render json: { message: "Product data is already up-to-date." }, status: :ok
    end
  end
end
