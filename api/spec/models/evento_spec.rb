require 'rails_helper'

RSpec.describe Evento, type: :model do
  context "criar evento" do
    it "criar evento invalido" do
      evnt = Evento.new
      expect(evnt.valid?).to eq(false)
    end

    it "criar evento sem user" do
      evnt = Evento.new({
        title: 'teste', date: '10/08/2021', status: 'teste', description: 'teste', contratante: 'teste'
      })
      expect(evnt.valid?).to eq(false)
    end

    it "criar evento valido" do
      usr = User.new({name: 'Lucas', password: '123123', email: 'lucas@teste.com'})
      evnt = Evento.new({
        title: 'teste', 
        date: '10/08/2021', 
        status: 'teste', 
        description: 'teste',
        contratante: 'teste',
        user: usr
      })

      expect(evnt.valid?).to eq(true)
    end
  end
end
