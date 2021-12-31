require 'rails_helper'

RSpec.describe User, type: :model do
  context "criar usuario" do
    it "criar usuario invalido" do
      usr = User.new
      expect(usr.valid?).to eq(false)
    end

    it "criar usuario valido" do
      usr = User.new({name: 'Lucas', password: '123123', email: 'lucas@teste.com'})
      expect(usr.valid?).to eq(true)
    end
  end
end
