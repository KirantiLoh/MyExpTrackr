import Document, {Html, Head, Main, NextScript} from "next/document";

class MainDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head/>
                <body>
                    <Main/>
                    <NextScript/>
                    <div className="modal-root"></div>
                </body>
            </Html>
        )
    }
}

export default MainDocument
