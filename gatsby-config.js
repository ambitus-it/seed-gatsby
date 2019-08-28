module.exports = {
    siteMetadata: {
        siteUrl: `https://ambitus.io`,
        author: `@ambitus`,
    },
    plugins: [
        `gatsby-plugin-sitemap`,
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-sass',
        'gatsby-transformer-remark',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://ambitus.io',
                sitemap: 'https://ambitus.io/sitemap.xml',
                env: {
                    production: {
                        policy: [
                            {
                                userAgent: '*',
                                allow: '/'
                            },
                            {
                                userAgent: '*',
                                allow: '/pt-br'
                            },
                            {
                                userAgent: '*',
                                allow: '/en'
                            },
                            {
                                userAgent: '*',
                                disallow: '/pt-br/404/'
                            },
                            {
                                userAgent: '*',
                                disallow: '/en/404/'
                            },
                            {
                                userAgent: '*',
                                disallow: '/pt-br/404.html'
                            },
                            {
                                userAgent: '*',
                                disallow: '/pt-br/404.html'
                            }
                        ]
                    }
                }
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-145529766-1",
            },
        },
        {
            resolve: 'gatsby-plugin-intl',
            options: {
                path: `${__dirname}/src/i18n`,
                languages: ['pt-br', 'en'],
                defaultLanguage: 'pt-br'
            },
        },
    ],
}