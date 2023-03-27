const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getGenres = async () => {
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresTotal = genresApi.data.results?.map((e) => e.name);
    genresTotal.forEach((e) => {
      Genre.findOrCreate({
        where: { name: e },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getGenres;


 