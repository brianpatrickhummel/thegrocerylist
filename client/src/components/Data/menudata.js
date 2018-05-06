const create = require("../../images/CreateList.svg"),
  Prefs = require("../../images/Prefs.svg"),
  Database = require("../../images/Database.svg"),
  Favorites = require("../../images/Favorites.svg"),
  List = require("../../images/List.svg"),
  Search = require("../../images/Search.svg"),
  Logout = require("../../images/Logout.svg");

export default [
  {
    link: "/preferences/1",
    image: Prefs,
    text: "PREFERENCES"
  },
  {
    link: "/search",
    image: Search,
    text: "RECIPE SEARCH"
  },
  {
    link: "/saved",
    image: Database,
    text: "MY RECIPES"
  },
  {
    link: "/favorites",
    image: Favorites,
    text: "FAVORITES"
  },
  {
    link: "/create",
    image: create,
    text: "CREATE LIST"
  },
  {
    link: "/lists",
    image: List,
    text: "MY LISTS"
  },
  {
    link: "/api/logout",
    image: Logout,
    text: "LOGOUT"
  }
];
