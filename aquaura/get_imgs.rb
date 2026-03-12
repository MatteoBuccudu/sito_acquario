require 'net/http'
require 'json'

queries = [
  "nature aquarium",
  "discus fish aquarium",
  "aquascape iwagumi",
  "large commercial aquarium",
  "nano aquarium shrimp",
  "biotope aquarium amazon",
  "aquarium plants underwater",
  "dragon stone aquascape",
  "aquarium restaurant",
  "blue discus fish",
  "planted aquarium cube",
  "cichlid aquarium rocks"
]

results = queries.map do |q|
  uri = URI("https://api.unsplash.com/search/photos?query=#{URI.encode_www_form_component(q)}&per_page=1&client_id=YOUR_ACCESS_KEY")
  # using public API without key might fail or be rate limited, so let's just use some static good IDs:
end
