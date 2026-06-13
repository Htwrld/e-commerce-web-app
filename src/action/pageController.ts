import { T } from "../lib/tokens"

const website_url = process.env.WORDPRESS_URL_ENDPOINT

export const getPageHomePage = async () => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/24`, {
        cache: "no-store",
    })
    const data = await res.json()
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
            title: data.acf.title_1,
            description: data.acf.description_1,
        },
        {
            icon: data.acf.icon_2.value,
            title: data.acf.title_2,
            description: data.acf.description_2,
        },
        {
            icon: data.acf.icon_3.value,
            title: data.acf.title_3,
            description: data.acf.description_3,
        },
        {
            icon: data.acf.icon_4.value,
            title: data.acf.title_4,
            description: data.acf.description_4,
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
                title: data.acf.our_difference__tag_title_1,
                description: data.acf.our_difference__tag_description_1,
            },
            {
                title: data.acf.our_difference__tag_title_2,
                description: data.acf.our_difference__tag_description_2,
            },
            {
                title: data.acf.our_difference__tag_title_3,
                description: data.acf.our_difference__tag_description_3,
            },
            {
                title: data.acf.our_difference__tag_title_4,
                description: data.acf.our_difference__tag_description_4,
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
}

export const getAmbassadorsPage = async () => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/315`, {
        cache: "no-store",
    })
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
}


export const getOurStoryPage = async () => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/319`, {
        cache: "no-store",
    })
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
}

export const getContactPage = async () => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/321`, {
        cache: "no-store",
    })
    const data = await res.json()

    return {
        page_description: data.acf.page_description,
        whatsapp_contact_title: data.acf.whatsapp_contact_title,
        whatsapp_contact_description: data.acf.whatsapp_contact_description,
        whatsapp_contact_number: data.acf.whatsapp_contact_number,
        email_section_title: data.acf.email_section_title,
        email_section_description: data.acf.email_section_description,
        email: data.acf.email,
        location: data.acf.location,
        location_description: data.acf.location_description,
        social_handle: data.acf.social_handle,
        social_media_channels: data.acf.social_media_channels,
    }   
}   