'use server'

import { T } from "../lib/tokens"

const website_url = process.env.WORDPRESS_URL_ENDPOINT

export type HeroSection = {
    hero_headline: string
    hero_subheadline: string
    hero_background_color: string
    hero_lifestyle_image: string
}

export type TrustBar = {
    icon: string
    title: string
    description: string
}

export type Mission = {
    mission_title: string
    mission_tagline: string
    mission_description: string
    happy_customers: string
    in_store: string
    seasonal_drops: string
}

export type Faq = {
    question: string
    answer: string
}

export type OtherTitles = {
    trending_now_title: string
    trending_now_description: string
    styled_by_community_title: string
    styled_by_community_description: string
    style_by_community_hashtag: string
    featured_collection_title: string
    featured_collection_description: string
    featured_collection_tagline: string
    shop_the_look_title: string
    shop_the_look_description: string
    call_to_action_title: string
    call_to_action_description: string
    call_to_action_button_title: string
    social_proof_title: string
    community_post_hashtag: string
    representing_the_kingdom_title: string
    representing_the_kingdom_tagline: string
    stay_connected_title: string
    stay_in_the_loop_title: string
    stay_in_the_loop_description: string
    get_launched_title: string
    get_launched_description: string
}

export type OurDifferences = {
    our_difference_title: string
    contents: OurDifference[]
}

export type OurDifference = {
    title: string
    description: string
}

export type PageHome = {
    heroSection: HeroSection[]
    trustBar: TrustBar[]
    ourMission: Mission
    faqs: Faq[]
    otherTitles: OtherTitles
    ourDifferences: OurDifferences
}

export const getPageHomePage: () => Promise<PageHome> = async () => {
    try {
        const res = await fetch(`${website_url}/wp-json/wp/v2/pages/24`, {
            cache: "no-store",
        })
        const data = await res.json()
        // console.log(data)
        const heroSection = [
            {
                hero_headline: data.acf.hero_headline_1,
                hero_subheadline: data.acf.hero_subheadline_1,
                hero_background_color: data.acf.hero_background_color_1,
                hero_lifestyle_image: data.acf.hero_lifestyle_image_1,
            },
            {
                hero_headline: data.acf.hero_headline_2,
                hero_subheadline: data.acf.hero_subheadline_2,
                hero_background_color: data.acf.hero_background_color_2,
                hero_lifestyle_image: data.acf.hero_lifestyle_image_2,
            },
            {
                hero_headline: data.acf.hero_headline_3,
                hero_subheadline: data.acf.hero_subheadline_3,
                hero_background_color: data.acf.hero_background_color_3,
                hero_lifestyle_image: data.acf.hero_lifestyle_image_3,
            },
        ]

        const ourMission = {
            mission_title: data.acf.mission_title,
            mission_tagline: data.acf.mission_tagline,
            mission_description: data.acf.mission_description,
            happy_customers: data.acf.happy_customers,
            in_store: data.acf.in_store,
            seasonal_drops: data.acf.seasonal_drops,
        }

        const trustBar = [
            {
                icon: data.acf.icon_1.value,
                title: data.acf.icon_1_title,
                description: data.acf.icon_1_description,
            },
            {
                icon: data.acf.icon_2.value,
                title: data.acf.icon_2_title,
                description: data.acf.icon_2_description,
            },
            {
                icon: data.acf.icon_3.value,
                title: data.acf.icon_3_title,
                description: data.acf.icon_3_description,
            },
            {
                icon: data.acf.icon_4.value,
                title: data.acf.icon_4_title,
                description: data.acf.icon_4_description,
            },
        ]

        const faqs = [
            {
                question: data.acf.question_1_title,
                answer: data.acf.question_1_answer,
            },
            {
                question: data.acf.question_2_title,
                answer: data.acf.question_2_answer,
            },
            {
                question: data.acf.question_3_title,
                answer: data.acf.question_3_answer,
            },
            {
                question: data.acf.question_4_title,
                answer: data.acf.question_4_answer,
            },
            {
                question: data.acf.question_5_title,
                answer: data.acf.question_5_answer,
            },
            {
                question: data.acf.question_6_title,
                answer: data.acf.question_6_answer,
            },
            {
                question: data.acf.question_7_title,
                answer: data.acf.question_7_answer,
            },
        ]

        const otherTitles = {
            trending_now_title: data.acf.trending_now_title,
            trending_now_description: data.acf.trending_now_description,
            styled_by_community_title: data.acf.styled_by_community_title,
            styled_by_community_description: data.acf.styled_by_community_description,
            style_by_community_hashtag: data.acf.style_by_community_hashtag,
            featured_collection_title: data.acf.featured_collection_title,
            featured_collection_description: data.acf.featured_collection_description,
            featured_collection_tagline: data.acf.featured_collection_tagline,
            shop_the_look_title: data.acf.shop_the_look_title,
            shop_the_look_description: data.acf.shop_the_look_description,
            call_to_action_title: data.acf.call_to_action_title,
            call_to_action_description: data.acf.call_to_action_description,
            call_to_action_button_title: data.acf.call_to_action_button_title,
            social_proof_title: data.acf.social_proof_title,
            community_post_hashtag: data.acf.community_post_hashtag,
            representing_the_kingdom_title: data.acf.representing_the_kingdom_title,
            representing_the_kingdom_tagline: data.acf.representing_the_kingdom_tagline,
            stay_connected_title: data.acf.stay_connected_title,
            stay_in_the_loop_title: data.acf.stay_in_the_loop_title,
            stay_in_the_loop_description: data.acf.stay_in_the_loop_description,
            get_launched_title: data.acf.get_launched_title,
            get_launched_description: data.acf.get_launched_description,
        }

        const ourDifferences = {
            our_difference_title: data.acf.our_difference_title,
            contents: [
                {
                    title: data.acf.our_difference_tag_title_1,
                    description: data.acf.our_difference_tag_description_1,
                },
                {
                    title: data.acf.our_difference_tag_title_2,
                    description: data.acf.our_difference_tag_description_2,
                },
                {
                    title: data.acf.our_difference_tag_title_3,
                    description: data.acf.our_difference_tag_description_3,
                },
                {
                    title: data.acf.our_difference_tag_title_4,
                    description: data.acf.our_difference_tag_description_4,
                },
            ],
        }

        return {
            heroSection,
            trustBar,
            ourMission,
            faqs,
            otherTitles,
            ourDifferences,
        }
    } catch (e) {
        console.log(e)
        return {} as PageHome
    }
}

export type AmbassadorStrip = {
    icon: string
    ambassador_benefit_title: string
    ambassador_benefit_description: string
    color: string
}

export type AmbassadorsPage = {
    title: string
    bible_verse: string
    page_description: string
    ambassador_benefits_title: string
    ambassadorsStrip: AmbassadorStrip[]
}

export const getAmbassadorsPage = async () => {
    try {
        const res = await fetch(`${website_url}/wp-json/wp/v2/pages/315`)
        const data = await res.json()

        const ambassadorsStrip = [
            {
                icon: "💰",
                ambassador_benefit_title: data.acf.ambassador_benefit_1_title,
                ambassador_benefit_description: data.acf.ambassador_benefit_1_description,
                color: T.gold,
            },
            {
                icon: "👗",
                ambassador_benefit_title: data.acf.ambassador_benefit_2_title,
                ambassador_benefit_description: data.acf.ambassador_benefit_2_description,
                color: T.rust,
            },
            {
                icon: "🎯",
                ambassador_benefit_title: data.acf.ambassador_benefit_3_title,
                ambassador_benefit_description: data.acf.ambassador_benefit_3_description,
                color: T.cobalt,
            },
            {
                icon: "📣",
                ambassador_benefit_title: data.acf.ambassador_benefit_4_title,
                ambassador_benefit_description: data.acf.ambassador_benefit_4_description,
                color: T.sage,
            },
            {
                icon: "🙏",
                ambassador_benefit_title: data.acf.ambassador_benefit_5_title,
                ambassador_benefit_description: data.acf.ambassador_benefit_5_description,
                color: T.gold,
            },
            {
                icon: "📊",
                ambassador_benefit_title: data.acf.ambassador_benefit_6_title,
                ambassador_benefit_description: data.acf.ambassador_benefit_6_description,
                color: T.cobalt,
            },
        ]

        return {
            title: data.acf.page_title,
            bible_verse: data.acf.bible_verse,
            page_description: data.acf.page_description,
            ambassador_benefits_title: data.acf.ambassador_benefits_title,
            ambassadorsStrip,
        }
    } catch (e) {
        return {} as AmbassadorsPage
    }
}

export type OurStoryPage = {
    title: string
    bible_verse: string
    in_our_words: string
    why_we_exist: string
    our_product_range: string
    faith_at_the_center: string
    our_community: string
    our_vision: string
    call_to_action_title: string
    call_to_action_description: string
    call_to_action_tagline: string
}

export const getOurStoryPage = async () => {
    try {
        const res = await fetch(`${website_url}/wp-json/wp/v2/pages/319`)
        const data = await res.json()

        return {
            title: data.acf.our_story_title,
            bible_verse: data.acf.our_story_bible_verse,
            in_our_words: data.acf.in_our_words,
            why_we_exist: data.acf.why_we_exist,
            our_product_range: data.acf.our_product_range,
            faith_at_the_center: data.acf.faith_at_the_center,
            our_community: data.acf.our_community,
            our_vision: data.acf.our_vision,
            call_to_action_title: data.acf.call_to_action_title,
            call_to_action_description: data.acf.call_to_action_description,
            call_to_action_tagline: data.acf.call_to_action_tagline,
        }
    } catch (e) {
        return {} as OurStoryPage
    }
}

export type ContactPage = {
    page_description: string
    whatsapp_contact_title: string
    whatsapp_contact_description: string
    whatsapp_contact_number: string
    whatsapp_contact_message: string
    email_section_description: string
    email: string
    location: string
    location_description: string
    social_handle: string
    social_media_channels: string
}

export const getContactPage = async () => {
    try {
        const res = await fetch(`${website_url}/wp-json/wp/v2/pages/321`)
        const data = await res.json()

        return {
            page_description: data.acf.page_description,
            whatsapp_contact_title: data.acf.whatsapp_contact_title,
            whatsapp_contact_description: data.acf.whatsapp_contact_description,
            whatsapp_contact_number: data.acf.whatsapp_contact_number,
            whatsapp_contact_message: data.acf.whatsapp_contact_message,
            email_section_description: data.acf.email_section_description,
            email: data.acf.email,
            location: data.acf.location,
            location_description: data.acf.location_description,
            social_handle: data.acf.social_handle,
            social_media_channels: data.acf.social_media_channels,
        }
    } catch (e) {
        return {} as ContactPage
    }
}

export type NavbarandFooter = {
    site_title: string
    site_description: string
    navbar_scrollbar: string
    footer_tagline: string
    footer_quotes: string
    footer_final_quote: string
}

export const getNavbarandFooter = async () => {
    try {
        const res = await fetch(`${website_url}/wp-json/wp/v2/pages/482`)
        const data = await res.json()

        return {
            site_title: data.acf.site_title,
            site_description: data.acf.site_description,
            navbar_scrollbar: data.acf.navbar_scrollbar,
            footer_tagline: data.acf.footer_tagline,
            footer_quotes: data.acf.footer_quotes,
            footer_final_quote: data.acf.footer_final_quote,
        }
    } catch (e) {
        return {} as NavbarandFooter
    }
}
