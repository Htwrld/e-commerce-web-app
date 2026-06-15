const website_url = process.env.WORDPRESS_URL_ENDPOINT

export type Ambassador = {
    id: number
    photo: string
    name: string
    description: string
    quote: string
    quote_author: string
}

export const getAmbassadors = async () => {
    try {
        const res = await fetch(`${website_url}wp-json/wp/v2/ambasador?acf_format=standard`)
        const data = await res.json()

        const ambassadors: Ambassador[] = data.map((a: any) => {
            return {
                id: a.id,
                photo: a.acf.profile_photo,
                name: a.acf.ambassadors_full_name,
                social_handle: a.acf.social_media_handle,
                city: a.acf.city,
                quote: a.acf.personal_quote,
            }
        })

        return ambassadors
    } catch (e) {
        console.log(e)
        return []
    }
}
