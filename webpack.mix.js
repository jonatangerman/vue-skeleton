const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
let mix = require('laravel-mix');
const CONFIG_PATH = path.resolve(__dirname, `config/${process.env.NODE_ENV}.env.js`);
const CONFIG = require(CONFIG_PATH);
const HOT_PUBLIC_PATH = `${CONFIG.SITE_URL}:${CONFIG.PORT}/`;
const HASH = +Date.now();

/*
|--------------------------------------------------------------------------
| Javascript Modules
|--------------------------------------------------------------------------
*/
mix.js('js/main.js', 'public/bundle/')
    .sourceMaps();
/*
    // (Bundle your project javascript entry point and extract 
        the static modules that won't be updating constantly) //

    .extract(
        ['names', 'of', 'modules', 'as', 'exported',
        'in', 'node'], 'public/bundle/vendor.bundle.js')
*/

/*
|--------------------------------------------------------------------------
| SASS Modules
|--------------------------------------------------------------------------
*/

/*
mix.sass('out/put/file.scss', 'public/bundle/bundle.css');
*/

/*
|--------------------------------------------------------------------------
| Legacy/Stand Alone Libs (Minify, concat)
|--------------------------------------------------------------------------
*/

// mix.styles(['legacy','css', 'files'], 'out/put/path.css');
// mix.scripts(['legacy','js', 'files'], 'out/put/path.css');

/*
|--------------------------------------------------------------------------
| Custom Override Options
|--------------------------------------------------------------------------
*/

mix.webpackConfig({
    // Webpack Webdevserver
    devServer: {
        inline: true, // Needed for HMR
        host: '0.0.0.0', // Making external the express server access so it can be available from a VM environment
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true, // Needed for HMR
        contentBase: [path.join(__dirname, ''), path.join(__dirname, 'public')], // Pipeline to search for resources
        publicPath: HOT_PUBLIC_PATH,
        public: HOT_PUBLIC_PATH,
        quiet: false,
        noInfo: true,
        disableHostCheck: true, // NOTE: Unsafe setting, use only on development // Needed for HMR
        // clientLogLevel: "none", // Uncommnent to clear browser console from HMR processes outputs
        // NOTE: InquirerJS :: Set as a proxy parameter for development
        proxy: {
            '/v1': {
                target: CONFIG.API_PROXY,
                changeOrigin: true,
            },
        },
    },
    output: {
        publicPath: Mix.isUsing('hmr') ? HOT_PUBLIC_PATH : '', // Needed for HMR
    },
    plugins: [
        // Add any other plugin or module that you would like it to be available in a global scope for the modules
        new webpack.ProvidePlugin({
            CONFIG: CONFIG_PATH,
            GLOBAL_CONFIG: path.resolve(__dirname, 'js/config'),
            // NOTE: InquirerJS :: Set as a Using Cookies
            Cookies: path.resolve(__dirname, 'js/config/cookies.js'),
        }),
        // Add any custom extra variable needed to be inserted directly in the html ouput here
        new HtmlWebpackPlugin({
            title: CONFIG.SITE_NAME,
            template: '!!underscore-template-loader!./public/index.html', // Mix is blocking the html-loader option
            filename: 'index.html',
            inject: true,
            hash: true,
        }),
    ],
});

/*
|--------------------------------------------------------------------------
| Other Recommended Avilable Options
|--------------------------------------------------------------------------
*/

// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
