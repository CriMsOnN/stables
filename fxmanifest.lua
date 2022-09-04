game "rdr3"
fx_version "cerulean"
rdr3_warning "I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships."
lua54 "yes"

author "Cr1MsOn"

client_scripts {
    "@PolyZone/client.lua",
    "@PolyZone/BoxZone.lua",
    "@PolyZone/CircleZone.lua",
    "@PolyZone/ComboZone.lua",
    "@PolyZone/EntityZone.lua",
    "utils.lua",
    "dist/client/*.client.js"
}

server_script 'dist/server/*.server.js'

ui_page "ui/build/index.html"

files {
    "ui/build/index.html",
    "ui/build/**/*",
    "config.json",
    "horseClothes.json"
}

dependencies {
    "PolyZone",
}
