class UsersController < ApplicationController
  skip_before_action :authorized, only: [:login, :create]

  def index
    users = User.all
    render json: users, status: :ok
  end

  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: "Invalid email or password"}
    end
  end

  def login
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: "Invalid email or password"}
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      user.name = params[:name]
      user.email = params[:email]
      user.save
      render json: user, status: :ok
    else
      render json: {error: "id nao encontrada"}, status: 404
    end
  end

  def destroy
    user = User.find_by(id: params[:id])
    if user
      user.destroy
      render status: :ok
    else
      render json: {error: "id nao encontrada"}, status: 404
    end
  end

  private

  def user_params
    params.permit(:name, :password, :email)
  end

end