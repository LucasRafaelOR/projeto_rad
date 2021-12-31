require 'rails_helper'

RSpec.describe "Users", type: :request do
  context "user service" do
    it "register user" do
      post "/register", :params => {:name => "teste", :email => "teste@teste.com", :password => "123123"}

      expect(response).to have_http_status(:created)
    end

    it "login" do
      User.create({name: "teste", email: "teste@teste.com", password: "T3ST3"});
      post "/login", :params => {:email => "teste@teste.com", :password => "T3ST3"}

      expect(response).to have_http_status(:ok)
    end

    it "register invalid user" do
      post "/register"

      expect(response).to have_http_status(400)
    end

    it "unauthorized services" do
      get "/users"
      expect(response).to have_http_status(:unauthorized)

      put "/users/1"
      expect(response).to have_http_status(:unauthorized)

      delete "/users/1"
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
