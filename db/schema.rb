# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_01_02_151309) do
  create_table "media", force: :cascade do |t|
    t.string "imdb_id"
    t.bigint "tmdb_id"
    t.boolean "adult"
    t.string "backdrop_path"
    t.integer "budget"
    t.string "origin_country"
    t.string "original_language"
    t.string "original_title"
    t.text "overview"
    t.string "poster_path"
    t.date "release_date"
    t.integer "revenue"
    t.integer "runtime"
    t.string "status"
    t.string "tagline"
    t.string "title"
    t.float "tmdb_vote_average"
    t.integer "tmdb_vote_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.string "created_by"
    t.date "first_air_date"
    t.string "homepage"
    t.boolean "in_production"
    t.date "last_air_date"
    t.integer "number_of_seasons"
    t.integer "number_of_episodes"
    t.float "backdrop_aspect_ratio"
    t.index ["tmdb_id"], name: "index_media_on_tmdb_id", unique: true
    t.index ["type"], name: "index_media_on_type"
  end

  create_table "personal_watchlist_media_items", force: :cascade do |t|
    t.integer "personal_watchlist_id", null: false
    t.integer "media_id", null: false
    t.boolean "watched", default: false, null: false
    t.index ["media_id"], name: "index_personal_watchlist_media_items_on_media_id"
    t.index ["personal_watchlist_id"], name: "index_personal_watchlist_media_items_on_personal_watchlist_id"
  end

  create_table "personal_watchlists", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "shared_watchlist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shared_watchlist_id"], name: "index_personal_watchlists_on_shared_watchlist_id"
    t.index ["user_id"], name: "index_personal_watchlists_on_user_id", unique: true
  end

  create_table "shared_watchlists", force: :cascade do |t|
    t.string "uuid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uuid"], name: "index_shared_watchlists_on_uuid", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "join_code", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "personal_watchlist_media_items", "media", column: "media_id"
  add_foreign_key "personal_watchlist_media_items", "personal_watchlists"
  add_foreign_key "personal_watchlists", "shared_watchlists"
  add_foreign_key "personal_watchlists", "users"
end
