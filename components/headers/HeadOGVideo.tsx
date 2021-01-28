import Head from "next/head";

interface Props {
    title: string;
    description: string;
    videoUrl: string;
    videoSecureUrl: string;
}

export default ({ title, description, videoUrl, videoSecureUrl }: Props) => (
    <Head>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="video" />
        <meta property="og:video" content={videoUrl} />
        <meta property="og:video:secure_url" content={videoSecureUrl} />
        <meta property="og:video:type" content="application/x-shockwave-flash" />
        <meta property="og:video:width" content="400" />
        <meta property="og:video:height" content="300" />
    </Head>
)

