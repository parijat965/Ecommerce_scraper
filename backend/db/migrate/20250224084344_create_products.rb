class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :title
      t.text :description
      t.string :price
      t.string :original_price
      t.string :discount
      t.string :size
      t.string :url
      t.string :contact_info
      t.datetime :scraped_at
      t.references :category, null: true, foreign_key: true

      t.timestamps
    end
  end
end
