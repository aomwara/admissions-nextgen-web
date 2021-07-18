export const environment = process.env.NEXT_PUBLIC_UI_ENV
  ? process.env.NEXT_PUBLIC_UI_ENV.toLocaleLowerCase()
  : "development";

export const apiEndpoints = {
  section: {
    auth: {
      login: "/api/login",
      check: "/api/auth/check",
    },
    user: {
      profile: "/api/user/profile",
    },
  },
};

const AR_API = () => {
  switch (environment) {
    case "development":
      return "http://localhost:8888";
    case "production":
      return "https://aradmission.kmutt.ac.th";
    default:
      return "https://aradmission.kmutt.ac.th";
  }
};

export const apiHost = {
  default: AR_API(),
};
