module.exports = {
    NODE_ENV: 'development',
    SITE_NAME: 'Skeleton Demo',    
    SITE_URL: 'http://skeleton.dev',    
    API_URL: (module.hot) ? '' : '',
    // NOTE: InquirerJS :: Set as a Proxy parameter
    API_PROXY: '',
    // NOTE: InquirerJS :: Set as a Cookies parameter
    COOKIES_DOMAIN: 'skeleton.dev',
    PORT: 8080, // Used for HMR
    /** All Server side script needed for project config could go here **/
};
