export const WP_TAGS = {
    homepage: "wp-homepage",
    ambassadorsPage: "wp-ambassadors-page",
    ourStoryPage: "wp-our-story-page",
    contactPage: "wp-contact-page",
    navbarFooter: "wp-navbar-footer",
    products: "wp-products",
    locations: "wp-locations",
    ambassadors: "wp-ambassadors",
    hashtags: "wp-hashtags",
    styles: "wp-styles",
    testimonials: "wp-testimonials",
    articles: "wp-articles",
    videos: "wp-videos",
} as const

export type WpTag = (typeof WP_TAGS)[keyof typeof WP_TAGS]

export const WP_TAG_BY_POST_TYPE: Record<string, WpTag> = {
    product: WP_TAGS.products,
    locations: WP_TAGS.locations,
    ambasador: WP_TAGS.ambassadors,
    hashtag: WP_TAGS.hashtags,
    style: WP_TAGS.styles,
    testimonial: WP_TAGS.testimonials,
    post: WP_TAGS.articles,
    video: WP_TAGS.videos,
}

export const WP_TAG_BY_PAGE_ID: Record<number, WpTag> = {
    24: WP_TAGS.homepage,
    315: WP_TAGS.ambassadorsPage,
    319: WP_TAGS.ourStoryPage,
    321: WP_TAGS.contactPage,
    482: WP_TAGS.navbarFooter,
}
