import Cookie from 'js-cookie';

Cookie.defaults = {
    domain: CONFIG.COOKIES_DOMAIN,
};

module.exports = Cookie;
