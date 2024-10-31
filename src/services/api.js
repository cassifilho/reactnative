import axios from "axios";

export const getTweets = async () => {  
  try {
    const response = await axios.get('http://localhost:3333/tweet', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiY2Fzc2lhbm8yQGdtYWlsLmNvbSIsImlhdCI6MTczMDM5NjAwMCwiZXhwIjoxNzMxMDAwODAwfQ.N8xOXJ9kxIOqseeJWahmEtPlQEj8rDmaWcQUjlta8C4'
      }
    });
    return response.data;
  } catch (error) { 
    console.log("Erro ao buscar tweets:", error);
  }
};

export const postTweet = async (tweetContent) => {
  try {
    const response = await axios.post('http://localhost:3333/tweet', 
      { tweet: tweetContent }, 
      {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiY2Fzc2lhbm8yQGdtYWlsLmNvbSIsImlhdCI6MTczMDM5NjAwMCwiZXhwIjoxNzMxMDAwODAwfQ.N8xOXJ9kxIOqseeJWahmEtPlQEj8rDmaWcQUjlta8C4'
        }
      }
    );
    return response.data; 
  } catch (error) {
    console.log("Erro ao postar tweet:", error);
    return null;
  }
};

export const deleteTweet = async (id) => {
  try {
    await axios.delete(`http://localhost:3333/tweet/${id}`, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiY2Fzc2lhbm8yQGdtYWlsLmNvbSIsImlhdCI6MTczMDM5NjAwMCwiZXhwIjoxNzMxMDAwODAwfQ.N8xOXJ9kxIOqseeJWahmEtPlQEj8rDmaWcQUjlta8C4'
      }
    });
    return true;
  } catch (error) {
    console.log("Erro ao deletar tweet:", error);
    return false;
  }
};

export const updateTweet = async (id, content) => {
  try {
    const response = await axios.put(`http://localhost:3333/tweet/${id}`, 
      { tweet: content }, 
      {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiY2Fzc2lhbm8yQGdtYWlsLmNvbSIsImlhdCI6MTczMDM5NjAwMCwiZXhwIjoxNzMxMDAwODAwfQ.N8xOXJ9kxIOqseeJWahmEtPlQEj8rDmaWcQUjlta8C4'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Erro ao atualizar tweet:", error);
    return null;
  }
};