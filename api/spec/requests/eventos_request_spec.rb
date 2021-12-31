require 'rails_helper'

RSpec.describe "Eventos", type: :request do
  context "eventos service" do
    usr = User.create({name: "teste", email: "teste@teste.com", password: "T3ST3"});
    token = JWT.encode({user_id: usr.id}, 'PR0J3T0_R4D')

    it "list eventos" do
      get "/eventos", :headers => {"Authorization" => "Bearer #{token}"}

      expect(response).to have_http_status(:ok)
    end

    it "create evento" do
      post "/eventos", 
        :headers => {"Authorization" => "Bearer #{token}"},
        :params => {:title => "teste", :date => "10/08/2021", :status => "teste", :description => "teste", :contratante => "teste"}

      expect(response).to have_http_status(:ok)
    end

    it "unauthorized services" do
      get "/eventos"
      expect(response).to have_http_status(:unauthorized)

      post "/eventos"
      expect(response).to have_http_status(:unauthorized)

      get "/eventos/1"
      expect(response).to have_http_status(:unauthorized)

      put "/eventos/1"
      expect(response).to have_http_status(:unauthorized)

      delete "/eventos/1"
      expect(response).to have_http_status(:unauthorized)
    end
    
  end
end
