const website_url = process.env.WORDPRESS_URL_ENDPOINT

export const getPageBySlug = async (slug: string) => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/${slug}`)
    const data = await res.json()
    return data
}

export const getPageById = async (id: number) => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/${id}`)
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
        }
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
        ]
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
