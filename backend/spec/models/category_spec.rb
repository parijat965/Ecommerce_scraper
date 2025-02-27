require 'rails_helper'

RSpec.describe Category, type: :model do
  subject { described_class.new(name: "Electronics") }

  it "is valid with a name" do
    expect(subject).to be_valid
  end

  it "is invalid without a name" do
    subject.name = nil
    expect(subject).not_to be_valid
  end

  it "is invalid with a duplicate name" do
    described_class.create!(name: "Electronics")
    expect(subject).not_to be_valid
  end
end
