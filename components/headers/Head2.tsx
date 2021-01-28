import Head from "next/head";

interface Props {
    title: string;
    description: string;
    imageURL: string;
}

export default ({ title, description, imageURL}: Props) => (
    <Head>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={'description'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://discord.gg/ZGkw5P8" />
        <meta property="og:image" content={'imageURL'} />
        <meta property="og:image:width" content="950" />
        <meta property="og:image:height" content="480" />
    </Head>
)
