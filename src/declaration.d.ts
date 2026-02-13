declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";
declare module "*.woff";
declare module "*.woff2";

declare global {
  interface Window {
    jhdata: {
      admin_acess: boolean;
      base_url: string;
      options_form: boolean;
      prefix: string;
      user: string;
      xsrf_token: string;
    };
    getFrontendCollection();
    getFrontendConfig();
  }
}

export {};
