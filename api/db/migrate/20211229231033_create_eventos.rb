class CreateEventos < ActiveRecord::Migration[6.1]
  def change
    create_table :eventos do |t|
      t.string :title
      t.string :date
      t.string :status
      t.string :description
      t.string :contratante

      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
