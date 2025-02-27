require 'rails_helper'

RSpec.describe Product, type: :model do
  let(:category) { Category.create!(name: "Electronics") }

  subject do
    described_class.new(
      title: "Smartphone",
      description: "Latest model with high-end specs.",
      price: "999",
      category: category
    )
  end

  it "is valid with all attributes" do
    expect(subject).to be_valid
  end

  it "is invalid without a title" do
    subject.title = nil
    expect(subject).not_to be_valid
  end

  it "is invalid without a category" do
    subject.category = nil
    expect(subject).not_to be_valid
  end
end
