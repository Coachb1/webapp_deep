export const baseURL = "https://coach-api-gke-dev.coachbots.com/api/v1";
export const localhost = "http://localhost:3000";
export const playground = "https://playground.coachbots.com";
export const visitingBaseUrl = localhost;
export const userId = "817f6f9c-8c69-463a-87ea-64a8ffc264cd";

export const shortenUrl = (longUrl: string) => {
  const getSidConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseURL}/frontend-auth/get-or-refresh-sid`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  };

  return cy.request(getSidConfig).then((getSidResponse) => {
    const { sid, _h } = getSidResponse.body;

    const shortenUrlConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://joturl.com/a/i1/urls/shorten?_sid=${sid}&_h=${_h}&domain_id=6c57534467567032345944394448762b4f774c536d773d3d&project_id=734e34754c6a367a624c3835424331507375634b71413d3d`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: {
        long_url: longUrl,
      },
    };

    return cy.request(shortenUrlConfig).then((shortenResponse) => {
      const shortUrl = shortenResponse.body.result.short_url;
      return shortUrl; // Return the shortened URL
    });
  });
};
