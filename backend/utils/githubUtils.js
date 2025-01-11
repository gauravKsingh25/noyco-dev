import axios from "axios";

export const getGithubAccessToken = async (code) => {
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json", 
        },
      }
    );

    const { access_token } = response.data;

    if (!access_token) {
      throw new Error("Failed to retrieve access token from GitHub.");
    }

    return access_token;
  } catch (error) {
    console.error("Error retrieving GitHub access token:", error.response?.data || error.message);
    throw new Error("Unable to authenticate with GitHub. Please try again.");
  }
};

export const verifyGithubToken = async (code) => {
    console.log(code)
    try {
      console.log(3)
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${code}`,
        },
      });

      const userEmailsResponse = await axios.get("https://api.github.com/user/emails", { headers: {
        Authorization: `Bearer ${code}`,
      } });
      const emails = userEmailsResponse.data;
      console.log(emails)
  
      return {data:response.data, email:emails};
    } catch (error) {
      console.error("Error verifying GitHub token:", error);
      throw new Error("Invalid or expired GitHub token.");
    }
  };
  