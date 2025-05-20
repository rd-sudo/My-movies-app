import api from "../api";

export const getNowPlayingMovies = async (page = 1) => {
  const endpoint = `/movie/now_playing?language=en-US&page=${page}`;
  try {
    const { data } = await api.get(endpoint);
    return data;
  } catch (error: any) {
    // Puedes personalizar el mensaje según el error recibido
    throw new Error(
      error?.response?.data?.status_message ||
        "Error fetching now playing movies"
    );
  }
};
