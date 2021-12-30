# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

lucas = User.create({name: 'Lucas', email: 'lucas@teste.com', password: '123456'})

puts lucas.id

e = Evento.create(
  title: 'Teste',
  date: '10/08/2021',
  status: 'to-do',
  description: 'testetesteteste',
  contratante: 'Lucas',
  user: lucas
)

puts e.id