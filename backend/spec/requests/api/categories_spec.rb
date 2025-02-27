require 'rails_helper'

RSpec.describe "Api::Categories", type: :request do
  describe "GET /api/categories" do
    it "returns all categories" do
      Category.create!(name: "Electronics")
      Category.create!(name: "Fashion")

      get "/api/categories"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response.length).to eq(2)
    end
  end
end
