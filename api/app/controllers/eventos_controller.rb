class EventosController < ApplicationController
  def index
    eventos = Evento.all
    render json: eventos, status: :ok
  end

  def show
    evento = Evento.find_by(id: params[:id])
    if evento
      render json: evento, status: :ok 
    else
      render json: {error: "id nao encontrada"}, status: 404
    end
  end

  def create
    new_evento = Evento.new(evento_params)
    new_evento.user = @user
    if new_evento.save
      render json: new_evento, status: :ok
    else
      render json: {error: "evento invalido"}, status: 400
    end
  end

  def update
    evento = Evento.find_by(id: params[:id])
    if evento
      evento.update(evento_params)
      render json: evento, status: :ok 
    else
      render json: {error: "id nao encontrada"}, status: 404
    end
  end

  def destroy
    evento = Evento.find_by(id: params[:id])
    if evento
      evento.destroy()
      render status: :ok 
    else
      render json: {error: "id nao encontrada"}, status: 404
    end
  end

  private

  def evento_params
    params.permit(:title, :date, :status, :description, :contratante) 
  end
end
