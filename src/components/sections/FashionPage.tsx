import Link from "next/link"
import type { FashionPageContent } from "@/src/action/pageController"
import type { Article } from "@/src/action/articleController"
import type { Video } from "@/src/action/videoController"
import {
    EditorialImage,
    Journal,
    MagazineFeature,
    SectionHeading,
} from "@/src/components/editorial/Editorial"
import "@/src/components/editorial/editorial.css"

const editions = [
    { quarter: "Q3 2026", issue: "Issue 02", title: "The Confidence Edit", date: "September 2026" },
    { quarter: "Q4 2026", issue: "Issue 03", title: "The Purpose Issue", date: "December 2026" },
    { quarter: "Q1 2027", issue: "Issue 04", title: "The Celebration Issue", date: "March 2027" },
]
export function FashionPage({
    pageContent,
    articles = [],
    videos = [],
}: {
    pageContent?: FashionPageContent
    articles?: Article[]
    videos?: Video[]
}) {
    return (
        <div className="ed-page">
            <section className="ed-publishing-hero">
                <div className="ed-publishing-copy">
                    <p className="ed-label">HTW PUBLISHING</p>
                    <h1>
                        Fashion. Faith.
                        <br />
                        Stories.{" "}
                        <span>
                            A Place
                            <br />
                            to Belong.
                        </span>
                    </h1>
                    <p>
                        Discover the editorial side of Hope’s Trendy World — a growing collection of
                        magazines, articles, videos and community conversations exploring fashion,
                        faith, culture and everyday life.
                    </p>
                    <a className="ed-button ed-button-gold" href="#magazine">
                        Explore the Latest →
                    </a>
                    <div className="ed-jump-links">
                        <a href="#magazine">MAGAZINE</a>
                        <a href="#articles">ARTICLES</a>
                        <a href="#videos">VIDEOS</a>
                        <a href="#community">COMMUNITY</a>
                    </div>
                </div>
                <EditorialImage
                    src={pageContent?.author_profile_image || "/images/tee_she.jpg"}
                    alt="Fashion, faith and culture at HTW"
                />
                <p className="ed-handwriting">
                    Style
                    <br />
                    Faith
                    <br />
                    Culture
                    <br />
                    Community
                </p>
            </section>
            <div className="ed-container">
                <MagazineFeature content={pageContent} />
                <Journal articles={articles} />
                <section className="ed-section" id="videos">
                    <SectionHeading
                        label="WATCH"
                        title="See Fashion. Hear Stories. Experience HTW."
                        href="/videos"
                        link="Watch All Videos →"
                    />
                    <p className="ed-intro">
                        From styling inspiration and fashion features to conversations,
                        behind-the-scenes moments and community stories.
                    </p>
                    <div className="ed-video-grid">
                        {videos.slice(0, 3).map((v) => (
                            <Link href={`/videos/${v.slug}`} key={v.id} className="ed-video">
                                <div className="ed-video-media">
                                    <EditorialImage src={v.thumbnail} alt={v.title} />
                                    <span className="ed-play" aria-label="Play video">
                                        ▶
                                    </span>
                                    {v.isLive && <span className="ed-live">● LIVE</span>}
                                </div>
                                <h3>{v.title}</h3>
                                <p className="ed-meta">
                                    {new Date(v.date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}{" "}
                                    · {v.views} views
                                </p>
                            </Link>
                        ))}
                    </div>
                    {!videos.length && (
                        <p className="ed-intro">More HTW films and conversations are on the way.</p>
                    )}
                </section>
            </div>
            <section className="ed-community" id="community">
                <div>
                    <p className="ed-label">THE HTW COMMUNITY</p>
                    <h2>Your Voice Belongs Here.</h2>
                    <p>
                        Have something to say about fashion, faith, culture or life? Share your
                        thoughts, start a conversation and connect with people who see things from
                        your perspective.
                    </p>
                    <Link className="ed-button" href="/contact">
                        Join the Conversation →
                    </Link>
                </div>
                <EditorialImage
                    src={pageContent?.author_profile_image || "/images/tee_she.jpg"}
                    alt="Join the HTW community conversation"
                />
            </section>
            <section className="ed-container ed-section">
                <div className="ed-coming-heading">
                    <div>
                        <p className="ed-label">COMING NEXT</p>
                        <h2>More Stories Are On the Way.</h2>
                    </div>
                    <p>
                        Every quarter, HTW Fashion brings you a new edition filled with fresh
                        perspectives, fashion stories, style inspiration and conversations worth
                        reading.
                    </p>
                </div>
                <div className="ed-editions">
                    {editions.map((e) => (
                        <div className="ed-edition" key={e.quarter}>
                            <span className="ed-spark">✦</span>
                            <div>
                                <h3>{e.quarter}</h3>
                                <p>{e.issue}</p>
                                <h4>{e.title}</h4>
                                <p className="ed-edition-date">{e.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
