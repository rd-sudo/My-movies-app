import api from "../api";

export const getTopRatedMovies = async (page = 1) => {
  const endpoint = `/movie/top_rated?language=en-US&page=${page}`;
  try {
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {}
};
